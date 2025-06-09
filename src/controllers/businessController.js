import businessService from "../services/businessService.js";

const createBusiness = async (req, res) => {
  try {
    const { name, description, phone, email } = req.body;
    const logo = req.file ? req.file.path : null;

    const createBusiness = await businessService.createBusiness(
      name,
      logo,
      description,
      phone,
      email
    );

    return res.status(200).json({
      status: "200",
      message: "Tạo doanh nghiệp thành công",
      data: createBusiness,
    });
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({
      status: status,
      error: error.message || "Lỗi không xác định",
    });
  }
};

export default {
  createBusiness,
};
