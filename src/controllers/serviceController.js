import serviceService from '../services/serviceService.js';

const createService = async (req, res) => {
  try {
    const service = await serviceService.createServiceService(req.body);
    return res.status(201).json({ service });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating service',
      error: error.message
    });
  }
};

export default { createService };
