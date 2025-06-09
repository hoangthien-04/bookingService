import model from '../models/index.js';

const createLocationService = async (locationData) => {
  const { services = [], businessId } = locationData;

  const businessExists = await model.businewss.exists({ _id: businessId });
  if (!businessExists) {
    throw createError(400, `Business với id ${businessId} không tồn tại`);
  }

  // 2. Validate serviceId trong services[]
  const serviceIds = services.map(s => s.serviceId);
  const existingServices = await model.service.find({
    _id: { $in: serviceIds }
  }).select('_id').lean();

  if (existingServices.length !== serviceIds.length) {
    const foundSet = new Set(existingServices.map(s => s._id.toString()));
    const missing = serviceIds.filter(id => !foundSet.has(id));
    throw createError(400, 'Một số dịch vụ không tồn tại', { missingServiceIds: missing });
  }

  // 3. Tạo mới và lưu
  const loc = new model.location(locationData);
  await loc.save();

  return loc.toObject();
};

export const getAllLocationsService = async () => {
  return model.location.find().lean();
};

export const getLocationByIdService = async (id) => {
  const loc = await model.location.findById(id).lean();
  if (!loc) throw createError(404, 'Location không tìm thấy');
  return loc;
};

export const updateLocationService = async (id, updateData) => {
  // (bạn có thể tái sử dụng validate như create nếu update services/businessId)
  const loc = await model.location.findByIdAndUpdate(id, updateData, { new: true }).lean();
  if (!loc) throw createError(404, 'Location không tìm thấy');
  return loc;
};

export const deleteLocationService = async (id) => {
  const loc = await model.location.findByIdAndDelete(id).lean();
  if (!loc) throw createError(404, 'Location không tìm thấy');
  return;
};

const getRcmLocationsService = async (city, userId) => {
  if (!city) return [];

  // 1. Tìm maxFavoriteCount của các location trong city
  const [{ maxFavoriteCount } = { maxFavoriteCount: 1 }] =
    await model.location.aggregate([
      { $match: { "address.city": city } },
      { $group: { _id: null, maxFavoriteCount: { $max: "$favoriteCount" } } }
    ]);

  // 2. Tìm maxBookingCount: số appointment lớn nhất trên mỗi location
  const [{ maxBookingCount } = { maxBookingCount: 1 }] =
    await model.location.aggregate([
      { $match: { "address.city": city } },
      {
        $lookup: {
          from: "appointments",
          localField: "_id",
          foreignField: "serviceLocationId",
          as: "appointments"
        }
      },
      { $addFields: { bookingCount: { $size: "$appointments" } } },
      { $group: { _id: null, maxBookingCount: { $max: "$bookingCount" } } }
    ]);

  // 3. Build pipeline
  const pipeline = [
    { $match: { "address.city": city } },

    // lookup reviews cho subType = 'location'
    {
      $lookup: {
        from: "reviews",
        let: { locId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$subType", "location"] },
                  { $eq: ["$subId", "$$locId"] }
                ]
              }
            }
          }
        ],
        as: "reviews"
      }
    },

    // lookup appointments trên serviceLocationId
    {
      $lookup: {
        from: "appointments",
        localField: "_id",
        foreignField: "serviceLocationId",
        as: "appointments"
      }
    },

    // tính averageRating
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $gt: [{ $size: "$reviews" }, 0] },
            { $divide: [{ $sum: "$reviews.rate" }, { $size: "$reviews" }] },
            0
          ]
        }
      }
    },

    // tính bookingCount
    { $addFields: { bookingCount: { $size: "$appointments" } } },

    // tính favoriteScore 0–5
    {
      $addFields: {
        favoriteScore: {
          $cond: [
            { $gt: [maxFavoriteCount, 0] },
            { $multiply: [{ $divide: ["$favoriteCount", maxFavoriteCount] }, 5] },
            0
          ]
        }
      }
    },

    // tính bookingScore 0–5
    {
      $addFields: {
        bookingScore: {
          $cond: [
            { $gt: [maxBookingCount, 0] },
            { $multiply: [{ $divide: ["$bookingCount", maxBookingCount] }, 5] },
            0
          ]
        }
      }
    },

    // optional: xóa mảng lookup không cần thiết
    { $project: { userFavorites: 0, reviews: 0, appointments: 0 } },

    // tổng hợp điểm
    {
      $addFields: {
        totalScore: { $add: ["$favoriteScore", "$averageRating", "$bookingScore"] }
      }
    }
  ];

  // 4. Thêm isFavorite / default false
  if (userId) {
    pipeline.push(
      {
        $lookup: {
          from: "favorites",
          let: { locId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", mongoose.Types.ObjectId(userId)] },
                    { $eq: ["$subType", "location"] },
                    { $eq: ["$subId", "$$locId"] }
                  ]
                }
              }
            }
          ],
          as: "userFavorites"
        }
      },
      {
        $addFields: {
          isFavorite: { $gt: [{ $size: "$userFavorites" }, 0] }
        }
      },
      {
        $project: {
          userFavorites: 0,
          reviews: 0,
          appointments: 0
        }
      }
    );
  } else {
    pipeline.push({
      $addFields: { isFavorite: false }
    });
  }

  // 5. Sort & Limit
  pipeline.push(
    { $sort: { totalScore: -1 } },
    { $limit: 16 }
  );

  // 6. Chạy aggregate và trả
  const locations = await model.location.aggregate(pipeline);
  return locations;
};

const locationService = {
    createLocationService,
    getRcmLocationsService
};

export default locationService