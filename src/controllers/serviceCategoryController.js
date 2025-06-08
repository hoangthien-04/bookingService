import serviceCategoryService from '../services/serviceCategoryService.js'

const createServiceCategory = async (req, res) => {
  try {
    const serviceCategory = await serviceCategoryService.createServiceCategoryService(req.body);
    return res.status(201).json({ serviceCategory: serviceCategory });
  }
  catch (error) {
    return res.status(500).json({ message: 'Error create serviceCategory', error: error.message });
  }
};

const serviceCategoryController = {
    createServiceCategory,
}

export default serviceCategoryController;