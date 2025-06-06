import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

// Import tất cả Model
import User from '../models/userModel.js';
import Staff from '../models/staffModel.js';
import Service from '../models/serviceModel.js';
import Review from '../models/reviewModel.js';
import Location from '../models/locationModel.js';
import Favorite from '../models/favoriteModel.js';
import Business from '../models/businessModel.js';
import Appointment from '../models/appointmentModel.js';

dotenv.config();

const initModel = async (Model, modelName) => {
  try {
    const db = mongoose.connection.db;
    const collName = Model.collection.name;

    const existing = await db
      .listCollections({ name: collName })
      .toArray();

    if (existing.length > 0) {
      // Đã tồn tại collection
    } else {
      const coll = await Model.createCollection();
      console.log(`Collection "${collName}" đã được tạo: ${coll.collection.namespace}`);
    }

    await Model.syncIndexes();
    console.log(`Index của "${collName}" đã được đồng bộ.`);
  } catch (err) {
    console.error(`Lỗi khi xử lý model "${modelName}" (collection "${Model.collection.name}"):`, err);
  }
};

const initAll = async () => {
  await connectDB();

  const models = [
    { name: 'User', model: User },
    { name: 'Staff', model: Staff },
    { name: 'Service', model: Service },
    { name: 'Review', model: Review },
    { name: 'Location', model: Location },
    { name: 'Favorite', model: Favorite },
    { name: 'Business', model: Business },
    { name: 'Appointment', model: Appointment },
  ];

  for (const { name, model } of models) {
    await initModel(model, name);
  }

  await mongoose.connection.close();
  console.log('MongoDB connection closed. InitDB hoàn tất.');
  process.exit(0);
};

initAll().catch((err) => {
  console.error('Lỗi khi khởi tạo DB:', err);
  process.exit(1);
});
