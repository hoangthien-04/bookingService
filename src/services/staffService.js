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

const getStaffIdsByCityCode = async (cityCode) => {
  // 1. Từ staffLocation → lookup Location → match city → group lấy distinct staffId
  const docs = await model.staffLocation.aggregate([
    {
      $lookup: {
        from: 'locations',
        localField: 'locationId',
        foreignField: '_id',
        as: 'location'
      }
    },
    { $unwind: '$location' },
    { $match: { 'location.address.cityCode': cityCode } },
    { $group: { _id: '$staffId' } }
  ]);

  // 2. Trả về mảng ObjectId
  return docs.map(d => d._id);
};

// Service để lấy danh sách 16 staff với tiêu chí tính điểm
const getRcmStaffsService = async (cityCode, userId) => {
  try {
    if (!cityCode) return [];
    const staffIds = await getStaffIdsByCityCode(cityCode);

    const [{ maxFavoriteCount } = { maxFavoriteCount: 1 }] =
      await model.staff.aggregate([
        { $match: { _id: { $in: staffIds } } },
        { $group: { _id: null, maxFavoriteCount: { $max: '$favoriteCount' } } }
      ]);
    
    const [{ maxBookingCount } = { maxBookingCount: 1 }] =
      await model.staff.aggregate([
        { $match: { _id: { $in: staffIds } } },
        {
          $lookup: {
            from: 'appointments',
            localField: '_id',
            foreignField: 'staffId',
            as: 'appointments'
          }
        },
        { $addFields: { bookingCount: { $size: '$appointments' } } },
        { $group: { _id: null, maxBookingCount: { $max: '$bookingCount' } } }
      ]);
    
    const pipeline = [
      // 1. Lọc staffId
      { $match: { _id: { $in: staffIds } } },

      // 2. Nối reviews để tính averageRating
      {
        $lookup: {
          from: 'reviews',
          let: { staffId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$subType', 'staff'] },
                    { $eq: ['$subId', '$$staffId'] }
                  ]
                }
              }
            }
          ],
          as: 'reviews'
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $gt: [{ $size: '$reviews' }, 0] },
              { $divide: [{ $sum: '$reviews.rate' }, { $size: '$reviews' }] },
              0
            ]
          }
        }
      },

      // 3. Nối appointments để tính bookingCount & bookingScore
      {
        $lookup: {
          from: 'appointments',
          localField: '_id',
          foreignField: 'staffId',
          as: 'appointments'
        }
      },
      { $addFields: { bookingCount: { $size: '$appointments' } } },
      {
        $addFields: {
          bookingScore: {
            $cond: [
              { $gt: [maxBookingCount, 0] },
              { $multiply: [{ $divide: ['$bookingCount', maxBookingCount] }, 5] },
              0
            ]
          }
        }
      },

      // 4. Tính favoriteScore
      {
        $addFields: {
          favoriteScore: {
            $cond: [
              { $gt: [maxFavoriteCount, 0] },
              { $multiply: [{ $divide: ['$favoriteCount', maxFavoriteCount] }, 5] },
              0
            ]
          }
        }
      },

      // 5. Tổng hợp totalScore
      {
        $addFields: {
          totalScore: {
            $add: ['$favoriteScore', '$averageRating', '$bookingScore']
          }
        }
      }
    ];

    // 6. (Tùy chọn) đánh dấu isFavorite nếu user đã login
    if (userId) {
      pipeline.push(
        {
          $lookup: {
            from: 'favorites',
            let: { staffId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$userId', new mongoose.Types.ObjectId(userId)] },
                      { $eq: ['$subType', 'staff'] },
                      { $eq: ['$subId', '$$staffId'] }
                    ]
                  }
                }
              }
            ],
            as: 'userFavorites'
          }
        },
        {
          $addFields: {
            isFavorite: { $gt: [{ $size: '$userFavorites' }, 0] }
          }
        },
        { $project: { userFavorites: 0 } }
      );
    } else {
      pipeline.push({ $addFields: { isFavorite: false } });
    }

    // 7. Sort & Limit
    pipeline.push(
      { $sort: { totalScore: -1 } },
      { $limit: 16 }
    );

    // 8. Chạy aggregation và trả về
    const staffs = await model.staff.aggregate(pipeline);
    const result = {
      _id: staffs._id,

    }
    return staffs;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getStaffByIdService = async (staffId) => {
  try{
    const staff = await model.staff.findById(staffId);
    if(!staff) throw new Error('staff không tồn tại');
    
    return staff;
  } catch (error) {
    console.error(error);
    return error;
  }
}

const staffService = {
    getRcmStaffsService,
    createStaffService,
    getStaffByIdService
}

export default staffService;
