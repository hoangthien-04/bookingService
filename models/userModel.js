const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  FirstName: { type: String, required: true, maxlength: 100 },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true, maxlength: 100 },
  Phone: { type: String, required: true, maxlength: 20 },
  Dob: { type: Date },
  Address: {
    Country: String,
    City: String,
    District: String,
    Specifict: String,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
