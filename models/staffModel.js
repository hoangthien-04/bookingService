const mongoose = require('mongoose');
const { Schema } = mongoose;

const staffSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Sex: { type: String, enum: ['male', 'female', 'other'] },
  Image: String,
  Address: String,
  Phone: { type: String, required: true },
  Services: [
    {
        Service_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
      Experience: { type: Number }
    }
  ],
  Location: [
    {
      Location_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
      Date_of_week: [{ type: String }],
    }
  ],
  Favorite_Count: { type: Number, default: 0 },
}, { timestamps: true });

// Indexes
staffSchema.index({ 'Services.Service_Id': 1 });
staffSchema.index({ 'Location.Location_Id': 1 });

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
