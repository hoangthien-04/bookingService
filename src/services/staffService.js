// services/staffService.js
import models from "../models/index.js";

// Service để lấy danh sách 16 staff với tiêu chí tính điểm
const getRcmStaffsService = async (city) => {
  try {
    // 1. Tính các giá trị tối đa của favoriteCount và bookingCount trong city
    const [maxCounts] = await models.staff.aggregate([
      { $match: { "address.city": city } },
      { $group: { 
          _id: null, 
          maxFavoriteCount: { $max: "$favoriteCount" }
        }
      }
    ]);

    const maxFavoriteCount = maxCounts.maxFavoriteCount;

    // 2. Tính điểm cho từng staff dựa trên các tiêu chí
    const staffs = await models.staff.aggregate([
      { $match: { "address.city": city } }, // Chỉ lấy staff ở city này
      {
        $lookup: {
          from: "reviews",  // Liên kết với bảng Review để lấy rating trung bình
          localField: "_id",
          foreignField: "staffId",
          as: "reviews"
        }
      },
      {
        $lookup: {
          from: "appointments",  // Liên kết với bảng Appointment để lấy booking count
          localField: "_id",
          foreignField: "staffId",
          as: "appointments"
        }
      },
      {
        $addFields: {
          // Tính rating trung bình
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$reviews" }, 0] }, 
              then: { 
                $divide: [
                  { $sum: "$reviews.rating" }, 
                  { $size: "$reviews" }
                ]
              },
              else: 0
            }
          },
          // Tính bookingCount từ Appointment
          bookingCount: { $size: "$appointments" },
          // Tính điểm từ favoriteCount
          favoriteScore: { 
            $multiply: [
              { $divide: ["$favoriteCount", maxFavoriteCount] }, 
              5
            ]
          },
          // Tính điểm từ bookingCount
          bookingScore: {
            $multiply: [
              { $divide: ["$bookingCount", 5] },  // Không cần lấy max bookingCount nữa
              5
            ]
          },
          // Tính điểm tổng
          totalScore: {
            $add: [
              { $multiply: [{ $divide: ["$favoriteCount", maxFavoriteCount] }, 5] },
              { $divide: [{ $sum: "$reviews.rating" }, { $size: "$reviews" }] },
              { $multiply: [{ $divide: ["$bookingCount", 5] }, 5] }
            ]
          }
        }
      },
      { $sort: { totalScore: -1 } }, // Sắp xếp theo totalScore từ cao đến thấp
      { $limit: 16 }  // Lấy 16 staff đầu tiên
    ]);

    return res.json(staffs); // Trả về danh sách staff
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const staffService = {
    getRcmStaffsService,
}

export default staffService;
