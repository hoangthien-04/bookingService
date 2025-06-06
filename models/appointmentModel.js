const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  Status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  Staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Service_location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
}, { timestamps: true });

// Indexes
appointmentSchema.index({ 'Staff_id': 1 });
appointmentSchema.index({ 'User_id': 1 });
appointmentSchema.index({ 'Service_location_id': 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

