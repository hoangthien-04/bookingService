import model from '../models/index.js';
import mongoose from 'mongoose'; 

const createStaffService = async (staffData) => {
  const { firstName, services = [] } = staffData;

  // 1. Kiểm tra trùng tên
  const existing = await model.staff.findOne({ firstName });
  if (existing) {
    throw new Error('staff đã tồn tại.');
  }

  const serviceIds = services.map(s => s.serviceId);
  const existingSerive = await model.service.find({
    _id: { $in: serviceIds }
  }).select('_id');

  if (existingSerive.length !== serviceIds.length) {
    const found = new Set(existingSerive.map(s => s._id.toString()));
    const missing = serviceIds.filter(id => !found.has(id));
    throw new Error(400, 'Một số dịch vụ không tồn tại', { missingServiceIds: missing });
  }

  // 2. Tạo mới và lưu
  const newStaff = new model.staff(staffData);
  await newStaff.save();

  // 3. Chuyển sang object thuần và (nếu có) bỏ các field nhạy cảm
  const obj = newStaff.toObject();

  return obj;
};

// Service để lấy danh sách 16 staff với tiêu chí tính điểm
const getRcmStaffsService = async (city, userId) => {
  try {
    if (!city) return [];

    // 1. Tính maxFavoriteCount
  const [{ maxFavoriteCount } = { maxFavoriteCount: 1 }] =
    await model.staff.aggregate([
      { $match: { "address.city": city } },
      { $group: { _id: null, maxFavoriteCount: { $max: "$favoriteCount" } } }
    ]);

  // 2. Tính maxBookingCount
  const [{ maxBookingCount } = { maxBookingCount: 1 }] =
    await model.staff.aggregate([
      { $match: { "address.city": city } },
      { 
        $lookup: {
          from: "appointments",
          localField: "_id",
          foreignField: "staffId",
          as: "appointments"
        }
      },
      { $addFields: { bookingCount: { $size: "$appointments" } } },
      { $group: { _id: null, maxBookingCount: { $max: "$bookingCount" } } }
    ]);

  // 3. Các stage của pipeline
  const pipeline = [
    { $match: { "address.city": city } },

    // nối reviews
    {
      $lookup: {
        from: "reviews",
        let: { staffId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$subType", "staff"] },      // chỉ lấy review cho staff
                  { $eq: ["$subId", "$$staffId"] }     // và subId phải khớp _id của staff
                ]
              }
            }
          }
        ],
        as: "reviews"
      }
    },

    // nối appointments
    {
      $lookup: {
        from: "appointments",
        localField: "_id",
        foreignField: "staffId",
        as: "appointments"
      }
    },

    // tính averageRating
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $gt: [{ $size: "$reviews" }, 0] },
            {
              $divide: [
                { $sum: "$reviews.rate" },
                { $size: "$reviews" }
              ]
            },
            0
          ]
        }
      }
    },

    // tính bookingCount
    {
      $addFields: {
        bookingCount: { $size: "$appointments" }
      }
    },

    // tính favoriteScore trên thang 0–5
    {
      $addFields: {
        favoriteScore: {
          $cond: [
            { $gt: [maxFavoriteCount, 0] },
            {
              $multiply: [
                { $divide: ["$favoriteCount", maxFavoriteCount] },
                5
              ]
            },
            0
          ]
        }
      }
    },

    // tính bookingScore trên thang 0–5
    {
      $addFields: {
        bookingScore: {
          $cond: [
            { $gt: [maxBookingCount, 0] },
            {
              $multiply: [
                { $divide: ["$bookingCount", maxBookingCount] },
                5
              ]
            },
            0
          ]
        }
      }
    },

    // tổng hợp điểm
    {
      $addFields: {
        totalScore: {
          $add: ["$favoriteScore", "$averageRating", "$bookingScore"]
        }
      }
    },
    
    // optional: xóa mảng lookup không cần thiết
    { $project: { userFavorites: 0, reviews: 0, appointments: 0 } },

    // sắp xếp và giới hạn
    { $sort: { totalScore: -1 } },
    { $limit: 16 }
  ];

  if (userId) {
    pipeline.push(
      {
        $lookup: {
          from: "favorites",
          let: { staffId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
                    { $eq: ["$subType", "staff"] },
                    { $eq: ["$subId", "$$staffId"] }
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
        $project: { userFavorites: 0 }
      }
    );
  } else {
    // Nếu không có userId (chưa login), gán luôn false
    pipeline.push({
      $addFields: { isFavorite: false }
    });
  }

  // 3. Cuối cùng sort & limit
  pipeline.push(
    { $sort: { totalScore: -1 } },
    { $limit: 16 }
  );

  // 4. Chạy aggregation và trả kết quả
  const staffs = await model.staff.aggregate(pipeline);
  return staffs;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const staffService = {
    getRcmStaffsService,
    createStaffService
}

export default staffService;
