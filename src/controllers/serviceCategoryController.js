import serviceCategoryService from "../services/serviceCategoryService.js";

const getAllServiceCategories = async (req, res) => {
  try {
    const pageNo = parseInt(req.query.pageNo) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;

    const serviceCategories =
      await serviceCategoryService.getAllServiceCategoriesService(
        pageNo,
        pageSize
      );
    return res.status(200).json({
      status: 200,
      message: "Get all service categories successfully",
      data: serviceCategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching service categories",
      error: error.message,
    });
  }
};

const createServiceCategory = async (req, res) => {
  try {
    const image = req.file ? req.file.path : null;
    const serviceCategoryData = {
      ...req.body,
      image: image,
    };
    const serviceCategory =
      await serviceCategoryService.createServiceCategoryService(
        serviceCategoryData
      );
    return res.status(201).json({ serviceCategory: serviceCategory });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error create serviceCategory", error: error.message });
  }
};

const updateServiceCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const image = req.file ? req.file.path : null;
    const serviceCategoryData = {
      ...req.body,
      image: image,
    };
    const updatedServiceCategory =
      await serviceCategoryService.updateServiceCategory(
        id,
        serviceCategoryData
      );
    return res.status(200).json({
      status: 200,
      message: "Update service category successfully",
      data: updatedServiceCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error updating service category",
      error: error.message,
    });
  }
};

const deleteServiceCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteServiceCategory =
      await serviceCategoryService.deleteServiceCategory(id);
    return res.status(200).json({
      status: 200,
      message: "Delete service category successfully",
      data: deleteServiceCategory,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Error deleting service category",
      error: e.message,
    });
  }
};

const serviceCategoryController = {
  getAllServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
};

export default serviceCategoryController;
