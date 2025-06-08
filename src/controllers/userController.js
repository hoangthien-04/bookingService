import { model } from 'mongoose';
import userService from '../services/userService.js';

const getPrivateUserInfo = async (req, res) => {
  const userId = req.user.id;

  try {
    // Truy vấn cơ sở dữ liệu để lấy thông tin người dùng từ userId
    const user = await userService.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Trả về thông tin người dùng
    res.status(200).json({
      message: 'Successfully',
      user: user
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user information', error: error.message });
  }
};

const getPublicUserInfo = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Truy vấn cơ sở dữ liệu để lấy thông tin người dùng từ userId
    const user = await userService.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Trả về thông tin người dùng
    res.status(200).json({
      message: 'Successfully',
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user information', error: error.message });
  }
};


const userController = {
    getPrivateUserInfo,
    getPublicUserInfo,
}

export default userController;