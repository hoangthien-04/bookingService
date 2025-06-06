const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
  Name: { type: String, required: true },
  Logo: String,
  Description: String,
  Phone: String,
  Email: String,
  Location: [

  ],
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes
businessSchema.index({ Name: 1 });
businessSchema.index({ Email: 1 });

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
