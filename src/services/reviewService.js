import model from '../models/index.js';

const createReview = async ({ userId, appointmentId, subType, content, rate }) => {
  // 1. subType phải là staff hoặc location
  if (!['staff', 'location'].includes(subType)) {
    throw createError(400, 'subType phải là "staff" hoặc "location"');
  }

  // 2. Tìm appointment
  const appt = await model.appointment.findById(appointmentId).lean();
  if (!appt) {
    throw new Error('Appointment không tồn tại');
  }

  // 3. Chỉ cho phép review trên appointment của chính user
  if (appt.userId.toString() !== userId) {
    throw new Error('Bạn chỉ có thể review appointment của chính mình');
  }

  // 4. subId phải khớp với staffId hoặc serviceLocationId trong appointment
  let subId;
  if (subType === 'staff') {
    subId = appt.staffId.toString();
  } else { // location
    const loc = await model.location.findOne(
      { 'services._id': appt.serviceLocationId },
      { _id: 1 }
    ).lean();
    if (!loc) {
      throw createError(400, `Không tìm thấy Location cho serviceLocationId ${appt.serviceLocationId}`);
    }
    subId = loc._id.toString();
  }

  // 5. (Tuỳ chọn) chỉ cho review 1 lần cho mỗi appointment
  const existed = await model.review.findOne({ appointmentId, userId, subType });
  if (existed) {
    throw new Error('Bạn đã review appointment này rồi');
  }

  // 6. Tạo review
  const review = await model.review.create({
    appointmentId,
    userId,
    subType,
    subId,
    content,
    rate
  });

  return review.toObject();
};

const serviceReview = {
    createReview
}

export default serviceReview;
