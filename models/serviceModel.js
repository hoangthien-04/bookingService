const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  Name: { type: String, required: true },
  Image: String,
  Time: { type: Number, required: true },
}, { timestamps: true });

// Indexes
serviceSchema.index({ Name: 1 });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

