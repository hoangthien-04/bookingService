import model from '../models/index.js';

const userFavoriteService = async (userId, subType, subId) => {
  // 1. kiểm tra xem đã favorite chưa
  const exists = await model.favorite.findOne({ userId, subType, subId });
  if (exists) {
    throw new Error('Favorite already exists');
  }

  // 2. tạo mới
  const fav = await model.favorite.create({ userId, subType, subId });

  if (subType === 'staff') {
    await model.staff.findByIdAndUpdate(
      subId,
      { $inc: { favoriteCount: 1 } },
      { new: true }
    );
  } else if (subType === 'location') {
    await model.location.findByIdAndUpdate(
      subId,
      { $inc: { favoriteCount: 1 } },
      { new: true }
    );
  }

  return fav.toObject();
};

const favoriteService = {
    userFavoriteService
};

export default favoriteService
