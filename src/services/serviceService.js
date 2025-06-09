import model from "../models/index.js";

const createServiceService = async (serviceData) => {
  const { name, serviceCategoryId } = serviceData;

  // 1. Kiểm tra trùng tên
  const existing = await model.service.findOne({ name });
  if (existing) {
    throw new Error("Service đã tồn tại.");
  }

  // 2. Tạo mới và lưu
  const newService = new model.service(serviceData);
  await newService.save();

  if (serviceCategoryId) {
    const serviceCategory = await model.serviceCategory.findById(
      serviceCategoryId
    );
    if (serviceCategory) {
      // model.serviceCategory.services được định nghĩa là [{ serviceId: ObjectId }]
      serviceCategory.services.push({ serviceId: newService._id });
      await serviceCategory.save();
    }
  }

  // 3. Chuyển sang object thuần và (nếu có) bỏ các field nhạy cảm
  const obj = newService.toObject();

  return obj;
};

const getPopularService = async (
  cityCode = "Ho Chi Minh",
  pageNo = 1,
  pageSize = 20
) => {
  const skip = (pageNo - 1) * pageSize;
  console.log("Fetching popular services for city:", cityCode);

  const popularServices = await model.location.aggregate([
    { $match: { "address.city": cityCode } },
    { $unwind: "$services" },
    {
      $lookup: {
        from: "services",
        localField: "services.serviceId",
        foreignField: "_id",
        as: "serviceDetails",
      },
    },
    {
      $lookup: {
        from: "appointments",
        localField: "services._id",
        foreignField: "serviceLocationId",
        as: "serviceAppointmentDetails",
      },
    },
    {
      $addFields: {
        serviceAppointmentCount: { $size: "$serviceAppointmentDetails" },
      },
    },
    {
      $match: {
        serviceAppointmentCount: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: "$services.serviceId",
        totalAppointmentCount: { $sum: "$serviceAppointmentCount" },
        serviceDetails: { $first: "$serviceDetails" },
      },
    },
    { $sort: { totalAppointmentCount: -1 } },
    { $limit: 10 },
    {
      $project: {
        _id: 0,
        name: { $arrayElemAt: ["$serviceDetails.name", 0] },
        image: { $arrayElemAt: ["$serviceDetails.image", 0] },
        totalAppointmentCount: 1,
      },
    },
  ]);
  console.log("Popular Services:", popularServices);
  return popularServices;
};

export default { createServiceService, getPopularService };
