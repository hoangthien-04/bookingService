const userService = require('../services/userService');

const registerUser = async (req, res) => {
  try {
    // Chuẩn bị dữ liệu để tạo user
    const {
      Username,
      Password,
      FirstName,
      LastName,
      Email,
      Phone,
      Dob,
      Address: { Country, City, District, Specifict } = {}
    } = req.body;

    // Đưa vào service
    const userData = {
      Username,
      Password, // Lưu nguyên, không hash
      FirstName,
      LastName,
      Email,
      Phone,
      Dob: Dob ? new Date(Dob) : undefined,
      Address: {
        Country: Country || '',
        City: City || '',
        District: District || '',
        Specifict: Specifict || ''
      }
    };

    const createdUser = await userService.createUser(userData);

    return res.status(201).json({
      message: 'Đăng ký thành công',
      user: createdUser
    });
  } catch (err) {
    console.error('Lỗi ở controller.registerUser:', err);
    const status = err.statusCode || 500;
    const message =
      err.statusCode === 409
        ? err.message
        : 'Lỗi server khi đăng ký user.';
    return res.status(status).json({ message });
  }
};

module.exports = {
  registerUser
};
