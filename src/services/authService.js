import jwt from 'jsonwebtoken';
import redisClient from './redisClient.js';
import model from '../models/index.js';

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  // Lưu refresh token vào Redis
  redisClient.set(refreshToken, JSON.stringify(user), { EX: 7 * 24 * 60 * 60 }); // Hết hạn sau 7 ngày

  return refreshToken;
};

const loginService = async (username, password) => {
  const user = await model.user.findOne({ username });
    if (!user) throw new Error('User not found');

    // Kiểm tra mật khẩu (so sánh)
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    // Tạo access token và refresh token
    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);

    return { accessToken, refreshToken };
};

const refreshTokenService = async (refreshToken, userId) => {
  try {
    const stored = await redisClient.get(refreshToken);
    if (!stored) {
      throw new Error('Refresh token không tồn tại hoặc đã hết hạn');
    }

    const user = JSON.parse(stored);
    if(user._id != userId) {
      throw new Error('Token không thuộc về user');
    }

    const newAccessToken = generateAccessToken(user)

    return { newAccessToken }; 
  } catch (error) {
    throw new Error(`Error refrestoken: ${error.message}`);
  }
};

const logoutService = async (accessToken, refreshToken, userId) => {
  try {
    const stored = await redisClient.get(refreshToken);
    if (!stored) {
      throw new Error('Refresh token không tồn tại hoặc đã hết hạn');
    }

    if(JSON.parse(stored)._id != userId) {
      throw new Error('Token không thuộc về user');
    }

    await redisClient.sAdd('blacklist', accessToken);
    
    await redisClient.del(refreshToken);

    return; 
  } catch (error) {
    throw new Error(`Error while logging out: ${error.message}`);
  }
}; 

const createUser = async (userData) => {
  
  const { username, email } = userData;

  const existingUsername = await model.user.findOne({username});
  if (existingUsername) {
    const error = new Error('Username đã được sử dụng.');
    throw error;
  }

  const existingEmail = await model.user.findOne({email});
  if (existingEmail) {
    const error = new Error('Email đã được sử dụng.');
    throw error;
  }

  // 2. Tạo và lưu user mới (lưu nguyên Password)
  const newUser = new model.user(userData);
  await newUser.save();

  // 3. Chuyển sang object thuần và loại bỏ field Password trước khi trả về
  const userObj = newUser.toObject();
  delete userObj.password;

  return userObj;
};

const authService = {
  generateAccessToken,
  generateRefreshToken,
  loginService,
  refreshTokenService,
  logoutService,
  createUser
};

export default authService;
