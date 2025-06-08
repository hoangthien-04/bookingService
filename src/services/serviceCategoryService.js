import model from '../models/index.js';

const createServiceCategoryService = async (ServiceCategoryData) => {
  try {
    const { name } = ServiceCategoryData;
    const existingServiceCategory = await model.serviceCategory.findOne({name});
    if (existingServiceCategory) {
        const error = new Error('ServiceCategory đã tồn tại.');
        throw error;
    }

    const newServiceCategory = new model.serviceCategory(ServiceCategoryData);
    await newServiceCategory.save();

    // 3. Chuyển sang object thuần và loại bỏ field Password trước khi trả về
    const userObj = newServiceCategory.toObject();

    return userObj;
  } catch (error) {
      throw new Error(error.message);
  }
}

const serviceCategory = {
  createServiceCategoryService,
};

export default serviceCategory;


