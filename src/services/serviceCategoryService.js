import model from "../models/index.js";

const getAllServiceCategoriesService = async (pageNo, pageSize) => {
  try {
    const serviceCategories = await model.serviceCategory
      .find({})
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize);

    const serviceCategoriesObj = serviceCategories.map((serviceCategory) => {
      return serviceCategory.toObject();
    });

    const totalServiceCategories = await model.serviceCategory.countDocuments(
      {}
    );

    return {
      pageNo: pageNo,
      pageSize: pageSize,
      totalPage: Math.ceil(totalServiceCategories / pageSize),
      totalElement: totalServiceCategories,
      serviceCategories: serviceCategoriesObj,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const createServiceCategoryService = async (ServiceCategoryData) => {
  try {
    const { name } = ServiceCategoryData;
    const existingServiceCategory = await model.serviceCategory.findOne({
      name,
    });
    if (existingServiceCategory) {
      const error = new Error("ServiceCategory đã tồn tại.");
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
};
const updateServiceCategory = async (id, ServiceCategoryData) => {
  try {
    const serviceCategory = await model.serviceCategory.findByIdAndUpdate(
      id,
      ServiceCategoryData,
      { new: true }
    );
    if (!serviceCategory) {
      const error = new Error("ServiceCategory không tồn tại.");
      throw error;
    }
    return serviceCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteServiceCategory = async (id) => {
  try {
    const serviceCategory = await model.serviceCategory.findByIdAndDelete(id);
    if (!serviceCategory) {
      const error = new Error("ServiceCategory không tồn tại.");
      throw error;
    }
    return serviceCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};
const serviceCategory = {
  getAllServiceCategoriesService,
  createServiceCategoryService,
  updateServiceCategory,
  deleteServiceCategory,
};

export default serviceCategory;
