const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  Image: String,
  Address: {
    Country: String,
    City: String,
    District: String,
    Specifict: String,
  },
  Services: [
    {
      Service_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
      Price: { type: Number, required: true }
    }
  ],
  Favorite_Count: { type: Number, default: 0 },
  Business_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
}, { timestamps: true });

// Indexes
locationSchema.index({ 'Services.Service_Id': 1 });
locationSchema.index({ 'Business_id': 1 });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
