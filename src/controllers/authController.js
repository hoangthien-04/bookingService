import userService from "../services/userService.js";

const registerUser = async (req, res) => {
  try {
    // Chuẩn bị dữ liệu để tạo user
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
      dob,
      address: { country, city, district, specifict } = {},
    } = req.body;

    // Đưa vào service
    const userData = {
      username,
      password, // Lưu nguyên, không hash      firstName,
      lastName,
      email,
      phone,
      dob: dob ? new Date(dob) : undefined,
      address: {
        country: country || "",
        city: city || "",
        district: district || "",
        specifict: specifict || "",
      },
    };

    const createdUser = await userService.createUser(userData);

    return res.status(201).json({
      message: "Đăng ký thành công",
      user: createdUser,
    });
  } catch (err) {
    console.error("Lỗi ở controller.registerUser:", err);
    const status = err.statusCode || 500;
    const message =
      err.statusCode === 409 ? err.message : "Lỗi server khi đăng ký user.";
    return res.status(status).json({ message });
  }
};

export default { registerUser };
