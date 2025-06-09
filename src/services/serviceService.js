import model from '../models/index.js';

const createServiceService = async (serviceData) => {
  const { name, serviceCategoryId } = serviceData;

  // 1. Kiểm tra trùng tên
  const existing = await model.service.findOne({ name });
  if (existing) {
    throw new Error('Service đã tồn tại.');
  }

  // 2. Tạo mới và lưu
  const newService = new model.service(serviceData);
  await newService.save();

  if (serviceCategoryId) {
    const serviceCategory = await model.serviceCategory.findById(serviceCategoryId);
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

export default { createServiceService };
