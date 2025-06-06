
module.exports = (req, res, next) => {
  const {
    Username,
    Password,
    FirstName,
    LastName,
    Email,
    Phone
  } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!Username || !Password || !FirstName || !LastName || !Email || !Phone) {
    return res
      .status(400)
      .json({ message: 'Vui lòng điền đầy đủ các trường bắt buộc.' });
  }

  // (Nếu cần) Kiểm tra định dạng email đơn giản
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Email)) {
    return res
      .status(400)
      .json({ message: 'Email không hợp lệ.' });
  }

  // (Nếu cần) Kiểm tra độ dài mật khẩu (ví dụ >= 6 ký tự)
  if (Password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Password phải có ít nhất 6 ký tự.' });
  }

  next();
};