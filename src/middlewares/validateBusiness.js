const validateBusiness = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    console.error("Vui lòng điền đầy đủ các trường bắt buộc.", {
      name,
      email,
      phone,
    });
    return res.status(400).json({
      status: "400",
      message: "Vui lòng điền đầy đủ các trường bắt buộc.",
    });
  }
  next();
};

export default validateBusiness;
