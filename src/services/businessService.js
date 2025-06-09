import model from "../models/index.js";

const createBusiness = async (name, logo, description, phone, email) => {
  const existingBusiness = await model.business.find({ name: name });
  console.log("Checking for existing business with name:", existingBusiness);

  if (existingBusiness.length > 0) {
    const error = new Error("Business with this name already exists");
    error.statusCode = 400;
    throw error;
  }
  const newBusiness = await model.business.create({
    name,
    logo,
    description,
    phone,
    email,
  });
  console.log("Business created successfully:", newBusiness);

  return {
    id: newBusiness._id,
  };
};

export default {
  createBusiness,
};
