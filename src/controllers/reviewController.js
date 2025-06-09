import createError from 'http-errors';
import reviewService from '../services/reviewService.js';

const createReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { appointmentId, subType, content, rate } = req.body;

    // validate input
    if (!appointmentId || !subType || !content || rate == null) {
      throw createError(400, 'appointmentId, subType, content và rate là bắt buộc');
    }

    const review = await reviewService.createReview({
      userId,
      appointmentId,
      subType,
      content,
      rate
    });

    return res.status(201).json(review);
  } catch (err) {
    return next(err);
  }
};

const reviewController = {
    createReview
}

export default reviewController;
