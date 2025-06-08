import staffService from '../services/staffService.js'

const getRecommendedtaffs = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    const topStaffs = await staffService.getRcmStaffsService(city);
    return res.json(topStaffs);  // Trả về kết quả
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const staffController = {
    getRecommendedtaffs,
}

export default staffController;