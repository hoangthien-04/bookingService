import serviceService from "../services/serviceService.js";

const createService = async (req, res) => {
  try {
    const service = await serviceService.createServiceService(req.body);
    return res.status(201).json({ service });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating service",
      error: error.message,
    });
  }
};

const getPopularService = async (req, res) => {
  try {
    const cityCode = req.query.cityName;
    const polularServices = await serviceService.getPopularService(cityCode);

    if (
      !polularServices ||
      (Array.isArray(polularServices) && polularServices.length === 0)
    ) {
      return res.status(404).json({
        status: 404,
        message: "No popular services found for the specified city",
        data: [],
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Popular services fetched successfully",
      data: polularServices,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error fetching popular services",
      error: error.message,
    });
  }
};

export default { createService, getPopularService };
