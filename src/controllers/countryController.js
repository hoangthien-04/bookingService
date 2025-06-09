import countryService from "../services/countryService.js";

const getAllCities = async (req, res) => {
  try {
    const allCities = await countryService.getAllCitiesService();

    return res.status(200).json(allCities);
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({
      status: status,
      error: error.message || "Lỗi không xác định",
    });
  }
};

const getCityInfo = async (req, res) => {
  try {
    const { cityCode } = req.params;
    const result = await countryService.getCityInfoService(cityCode);

    return res.status(200).json(result);
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({
      status: status,
      error: error.message || "Lỗi không xác định",
    });
  }
};

const countryController = {
    getAllCities,
    getCityInfo
};

export default countryController
