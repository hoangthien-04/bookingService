import model from "../models/index.js";

const userFavoriteService = async (userId, subType, subId, action) => {
  if (!["like", "unlike"].includes(action)) {
    throw new Error('Invalid action. Chỉ chấp nhận "like" hoặc "unlike".');
  }

  const exists = await model.favorite.findOne({ userId, subType, subId });
  if (action === "like") {
    // đã like rồi thì báo lỗi
    if (exists) {
      throw new Error("Bạn đã like rồi");
    }
    // tạo mới favorite
    await model.favorite.create({ userId, subType, subId });
    // tăng counter lên 1
    await _updateFavCount(subType, subId, +1);
    return { message: 'Liked thành công', status: 200 };
  } else {
    // unlike
    if (!exists) {
      throw new Error("Không tìm thấy favorite để unlike");
    }
    // xóa favorite
    await model.favorite.deleteOne({ userId, subType, subId });
    // giảm counter đi 1 (không âm)
    await _updateFavCount(subType, subId, -1);
    return { message: 'Unliked thành công', status: 200 };
  }
};

const _updateFavCount = async (subType, subId, delta) => {
  const TargetModel = subType === "staff" ? model.staff : model.location;
  await TargetModel.findByIdAndUpdate(
    subId,
    { $inc: { favoriteCount: delta } },
    { new: true }
  );
};

const favoriteService = {
  userFavoriteService,
};

export default favoriteService;
