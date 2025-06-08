import businessService from "../services/businessService.js";

const createBusiness = async (req, res) => {
  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

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
      message: "tạo doanh nghiệp thành công",
      data: createBusiness,
    });
  } catch (error) {
    console.error("Lỗi ở business controller:", error);
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
