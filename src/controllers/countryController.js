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

const reverseGeocode = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
        return res.status(400).json({ message: 'lat và lon là bắt buộc' });
        }
        const data = await countryService.reverseGeocode(lat, lon);
        return res.json(data);
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({
            status: status,
            error: error.message || "Lỗi không xác định",
        });
    }
}

const searchAll = async (req, res, next) => {
  try {
    const { cityCode = '', q = '' } = req.query;

    // Chạy song song 3 service
    const [locations, staffs, services] = await Promise.all([
      countryService.searchLocations(cityCode, q),
      countryService.searchStaffs(cityCode, q),
      countryService.searchServices(cityCode, q)
    ]);

    return res.json({ locations, staffs, services });
  } catch (err) {
    next(err);
  }
};

const countryController = {
    getAllCities,
    getCityInfo,
    reverseGeocode,
    searchAll
};

export default countryController
