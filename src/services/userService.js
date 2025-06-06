import User from '../models/userModel.js';

const createUser = async (userData) => {
  const { Username, Email } = userData;

  // 1. Kiểm tra trùng Username/Email
  const existingUser = await User.findOne({
    $or: [{ Username }, { Email }],
  });

  if (existingUser) {
    const error = new Error('Username hoặc Email đã được sử dụng.');
    error.statusCode = 409;
    throw error;
  }

  // 2. Tạo và lưu user mới (lưu nguyên Password)
  const newUser = new User(userData);
  await newUser.save();

  // 3. Chuyển sang object thuần và loại bỏ field Password trước khi trả về
  const userObj = newUser.toObject();
  delete userObj.Password;

  return userObj;
};

const registerUser = async (req, res) => {
  try {
    const {
      Username,
      Password,
      FirstName,
      LastName,
      Email,
      Phone,
      Dob,
      Address: { Country, City, District, Specifict } = {},
    } = req.body;

    const userData = {
      Username,
      Password,
      FirstName,
      LastName,
      Email,
      Phone,
      Dob: Dob ? new Date(Dob) : undefined,
      Address: {
        Country: Country || '',
        City: City || '',
        District: District || '',
        Specifict: Specifict || '',
      },
    };

    const createdUser = await createUser(userData);

    return res.status(201).json({
      message: 'Đăng ký thành công',
      user: createdUser,
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

export default { createUser, registerUser };
