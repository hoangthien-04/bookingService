import staffService from '../services/staffService.js'

const createStaff = async (req, res) => {
  try {
    const staff = await staffService.createStaffService(req.body);
    return res.status(201).json({ staff });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating staff',
      error: error.message
    });
  }
};


const getRecommendedtaffs = async (req, res) => {
  const { city } = req.params;
  const userId = req.user?.id || null;

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    const topStaffs = await staffService.getRcmStaffsService(city, userId);
    return res.json(topStaffs);  // Trả về kết quả
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const staffController = {
    getRecommendedtaffs,
    createStaff
}

export default staffController;