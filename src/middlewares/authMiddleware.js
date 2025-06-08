import jwt from 'jsonwebtoken';
import redisClient from '../services/redisClient.js';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];  // Lấy token từ header

  if (!token) {
    return res.sendStatus(401);  // Nếu không có token, trả về 401 (Unauthorized)
  }

  try {
    const isBlacklisted = await redisClient.sIsMember('blacklist', token);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token has been revoked (logged out)' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next(); 
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const authMiddleware = {
  authenticateToken,
};

export default authMiddleware