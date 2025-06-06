const mongoose = require('mongoose');
const dotenv  = require('dotenv');

dotenv.config();
const connectDB = require('../config/db');

// Import tất cả Model
const User        = require('../models/userModel');
const Staff       = require('../models/staffModel');
const Service     = require('../models/serviceModel');
const Review      = require('../models/reviewModel');
const Location    = require('../models/locationModel');
const Favorite    = require('../models/favoriteModel');
const Business    = require('../models/businessModel');
const Appointment = require('../models/appointmentModel');

const initModel = async (Model, modelName) => {
  try {
    // Lấy đối tượng db native từ mongoose
    const db = mongoose.connection.db;
    // Tên collection chính xác Mongoose sử dụng
    const collName = Model.collection.name;

    // Kiểm tra collection đã tồn tại chưa
    const existing = await db
      .listCollections({ name: collName })
      .toArray();

    if (existing.length > 0) {
      
    } else {
      // Nếu chưa tồn tại, tạo collection rỗng
      const coll = await Model.createCollection();
      console.log(`Collection "${collName}" đã được tạo: ${coll.collection.namespace}`);
    }

    // Đồng bộ index (nếu schema định nghĩa index)
    await Model.syncIndexes();
    console.log(`Index của "${collName}" đã được đồng bộ.`);
  } catch (err) {
    console.error(`Lỗi khi xử lý model "${modelName}" (collection "${Model.collection.name}"):`, err);
  }
};

const initAll = async () => {
  // 1. Kết nối MongoDB
  await connectDB(); 

  // 2. Danh sách các model và tên dùng để log
  const models = [
    { name: 'User',        model: User },
    { name: 'Staff',       model: Staff },
    { name: 'Service',     model: Service },
    { name: 'Review',      model: Review },
    { name: 'Location',    model: Location },
    { name: 'Favorite',    model: Favorite },
    { name: 'Business',    model: Business },
    { name: 'Appointment', model: Appointment },
  ];

  // 3. Duyệt qua từng model, gọi initModel()
  for (const { name, model } of models) {
    await initModel(model, name);
  }

  // 4. Đóng kết nối sau khi xong
  await mongoose.connection.close();
  console.log('MongoDB connection closed. InitDB hoàn tất.');
  process.exit(0);
};

// Chạy initAll và bắt lỗi (nếu có)
initAll().catch((err) => {
  console.error('Lỗi khi khởi tạo DB:', err);
  process.exit(1);
});