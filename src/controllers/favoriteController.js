import favoriteService from '../services/favoriteService.js';

const userfavorite = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { subType, subId, action } = req.body; 

    if (!subType || !subId) {
      return res.status(400).json({ message: 'subType và subId là bắt buộc' });
    }

    const favorite = await favoriteService.userFavoriteService(userId, subType, subId, action);
    return res.status(201).json(favorite);
  } catch (err) {
    if (err.message === 'Favorite already exists') {
      return res.status(409).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const favoriteController = {
    userfavorite,
};

export default favoriteController
