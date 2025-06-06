const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  Content: { type: String, required: true },
  Rate: { type: Number, min: 1, max: 5, required: true },
  Appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  SubType: { type: String, required: true },
  Sub_id: { type: mongoose.Schema.Types.ObjectId, required: true },
}, { timestamps: true });

// Indexes
reviewSchema.index({ 'Appointment_id': 1 });
reviewSchema.index({ 'User_id': 1 });
reviewSchema.index({ 'SubType': 1 });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
