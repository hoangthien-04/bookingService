import appointmentService from '../services/appointmentService.js';

const registerAppointment = async (req, res) => {
  try {
    const userId = req.user.id;                          // từ middleware
    const { staffId, serviceLocationId, startTime, endTime } = req.body;

    // validate input
    if (!staffId || !serviceLocationId) {
      return res.status(400).json({ message: 'staffId và serviceLocationId là bắt buộc' });
    }

    const appointment = await appointmentService.createAppointment({
      userId,
      staffId,
      serviceLocationId,
      startTime,
      endTime
    });

    return res.status(201).json({
      message: 'Đăng ký appointment thành công',
      appointment
    });
  } catch (err) {
    console.error('appointmentController.registerAppointment error:', err);
    return res.status(500).json({ message: err.message });
  }
};

const appointmentController = {
    registerAppointment,
};

export default appointmentController
