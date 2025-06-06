const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  User_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  SubType: { type: String, required: true },
  Sub_id: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

// Indexes
favoriteSchema.index({ User_Id: 1 });
favoriteSchema.index({ Sub_id: 1 });

const Business = mongoose.model('Favorite', favoriteSchema);

module.exports = Business;
