import jwt from "jsonwebtoken";
import redisClient from "../services/redisClient.js";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res.sendStatus(401); // Nếu không có token, trả về 401 (Unauthorized)
  }

  try {
    const isBlacklisted = await redisClient.sIsMember("blacklist", token);
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Token has been revoked (logged out)" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const authenticateOptional = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next(); // Không có token → bỏ qua

  const token = authHeader.split(" ")[1];
  if (!token) return next();

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token lỗi → vẫn bỏ qua, không trả 401
      return next();
    }
    // Gán req.user để controller biết ai đang login
    req.user = user;
    next();
  });
};

const verifyRefreshToken = (req, res, next) => {

  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.user = payload; // { id, username}
    next();
  });
};

const authMiddleware = {
  authenticateToken,
  authenticateOptional,
  verifyRefreshToken,
};

export default authMiddleware;
