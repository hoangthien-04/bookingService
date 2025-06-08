import authService from '../services/authService.js';

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const { accessToken, refreshToken } = await authService.loginService(username, password);
      res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  }

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
      const { newAccessToken } = await authService.refreshTokenService(refreshToken);
      res.json({ newAccessToken });
    } catch (error) {
      res.status(403).json({ message: 'Invalid refresh token', error: error.message });
    }
  }

const logout = async (req, res) => {
    const { accessToken, refreshToken } = req.body;
    try {
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }

      await authService.logoutService(accessToken, refreshToken);
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Logout failed', error: error.message });
    }
  }

const registerUser = async (req, res) => {
  try {
    const user = await authService.createUser(req.body);
    return res.status(201).json({ user: { id: user._id, username: user.username }});
  }
  catch (error) {
    return res.status(500).json({ message: 'Error register user', error: error.message });
  }
};

const authController = {
  login,
  refreshToken,
  logout,
  registerUser,
};

export default authController;