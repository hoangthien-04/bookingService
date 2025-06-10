import authService from "../services/authService.js";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await authService.loginService(
      username,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/api/auth",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {

    const { refreshToken } = req.cookies;
    const userId = req.user.id;

    if (!refreshToken) throw new Error("No refresh token");

    const { newAccessToken } = await authService.refreshTokenService(
      refreshToken,
      userId
    );
    res.json({ newAccessToken });
  } catch (error) {
    res
      .status(403)
      .json({ message: "Invalid refresh token", error: error.message });
  }
};

const logout = async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      const accessToken = req.token;
      const userId = req.user.id;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    await authService.logoutService(accessToken, refreshToken, userId);

    // Xoá cookie trên trình duyệt
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/api/auth",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await authService.createUser(req.body);
    return res
      .status(201)
      .json({ user: { id: user._id, username: user.username } });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error register user", error: error.message });
  }
};

const authController = {
  login,
  refreshToken,
  logout,
  registerUser,
};

export default authController;
