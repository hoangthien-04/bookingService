import model from '../models/index.js';

const createAppointment = async ({ userId, staffId, serviceLocationId, startTime, endTime }) => {
  // 1. (Tuỳ chọn) Có thể kiểm tra trùng hoặc kiểm tra staff/serviceLocation hợp lệ
  //    ví dụ: await model.staff.findById(staffId)…
  if (new Date(startTime) >= new Date(endTime)) {
    throw new Error('startTime phải nhỏ hơn endTime');
  }

  // 1. Tìm Location chứa subdoc services._id = serviceLocationId
  const location = await model.location.findOne({
    'services._id': serviceLocationId
  }).lean();
  if (!location) {
    throw new Error(`Không tìm thấy serviceLocationId ${serviceLocationId}`);
  }
  const locationId = location._id;
  
  // 2. Kiểm tra staff có làm việc ở location này không
  const work = await model.staffLocation.findOne({ staffId, locationId });
  if (!work) {
    throw new Error('Staff không làm việc tại location này');
  }

  // 3. Kiểm tra staff không trùng lịch
  const conflict = await model.appointment.findOne({
    staffId,
    serviceLocationId,
    status: { $in: ['pending','confirmed'] },
    startTime: { $lt: new Date(endTime) },
    endTime:   { $gt: new Date(startTime) }
  });
  if (conflict) {
    throw new Error('Thời gian này đã bị đặt trước', { conflictId: conflict._id });
  }
  
  // 4. Tạo mới
  const appt = await model.appointment.create({
    userId,
    staffId,
    serviceLocationId,
    startTime: new Date(startTime),
    endTime:   new Date(endTime),
    status: 'pending'
  });
  console.log(locationId)
  // 3. Trả về plain object
  return appt.toObject();
};

const appointmentService = {
    createAppointment
};

export default appointmentService
