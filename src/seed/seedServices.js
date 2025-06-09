import mongoose from "mongoose";
import model from "../models/index.js";
import dotenv from "dotenv";
dotenv.config();

const services = [
  {
    name: "Classic Manicure",
    image: "https://example.com/images/classic_manicure.jpg",
    serviceCategoryId: "6844ef293dac2669b9102f02",
    time: 45,
  },
  {
    name: "French Manicure",
    image: "https://example.com/images/french_manicure.jpg",
    serviceCategoryId: "6844ef293dac2669b9102f02",
    time: 60,
  },
  {
    name: "Gel Manicure",
    image: "https://example.com/images/gel_manicure.jpg",
    serviceCategoryId: "6844ef293dac2669b9102f02",
    time: 75,
  },
  {
    name: "Acrylic Nails",
    image: "https://example.com/images/acrylic_nails.jpg",
    serviceCategoryId: "6844ef293dac2669b9102f02",
    time: 90,
  },
  {
    name: "Basic Haircut",
    image: "https://example.com/images/basic_haircut.jpg",
    serviceCategoryId: "6844f3981061958416d67f2b",
    time: 30,
  },
  {
    name: "Hair Coloring",
    image: "https://example.com/images/hair_coloring.jpg",
    serviceCategoryId: "6844f3981061958416d67f2b",
    time: 120,
  },
  {
    name: "Hair Highlights",
    image: "https://example.com/images/hair_highlights.jpg",
    serviceCategoryId: "6844f3981061958416d67f2b",
    time: 150,
  },
  {
    name: "Hair Styling",
    image: "https://example.com/images/hair_styling.jpg",
    serviceCategoryId: "6844f3981061958416d67f2b",
    time: 60,
  },
  {
    name: "Facial Cleanse",
    image: "https://example.com/images/facial_cleanse.jpg",
    serviceCategoryId: "6844f3b51061958416d67f2f",
    time: 45,
  },
  {
    name: "Anti-Aging Facial",
    image: "https://example.com/images/anti_aging_facial.jpg",
    serviceCategoryId: "6844f3b51061958416d67f2f",
    time: 60,
  },
  {
    name: "Acne Treatment Facial",
    image: "https://example.com/images/acne_treatment.jpg",
    serviceCategoryId: "6844f3b51061958416d67f2f",
    time: 50,
  },
  {
    name: "Hydrating Facial",
    image: "https://example.com/images/hydrating_facial.jpg",
    serviceCategoryId: "6844f3b51061958416d67f2f",
    time: 55,
  },
  {
    name: "Men's Haircut",
    image: "https://example.com/images/mens_haircut.jpg",
    serviceCategoryId: "6844f3c11061958416d67f33",
    time: 30,
  },
  {
    name: "Beard Trim",
    image: "https://example.com/images/beard_trim.jpg",
    serviceCategoryId: "6844f3c11061958416d67f33",
    time: 20,
  },
  {
    name: "Men's Hair Coloring",
    image: "https://example.com/images/mens_hair_coloring.jpg",
    serviceCategoryId: "6844f3c11061958416d67f33",
    time: 90,
  },
  {
    name: "Eyelash Extensions",
    image: "https://example.com/images/eyelash_extensions.jpg",
    serviceCategoryId: "6844f3ca1061958416d67f37",
    time: 90,
  },
  {
    name: "Eyelash Tinting",
    image: "https://example.com/images/eyelash_tinting.jpg",
    serviceCategoryId: "6844f3ca1061958416d67f37",
    time: 30,
  },
  {
    name: "Eyelash Lift",
    image: "https://example.com/images/eyelash_lift.jpg",
    serviceCategoryId: "6844f3ca1061958416d67f37",
    time: 60,
  },
  {
    name: "Full Body Massage",
    image: "https://example.com/images/full_body_massage.jpg",
    serviceCategoryId: "6844f3e91061958416d67f47",
    time: 90,
  },
  {
    name: "Aromatherapy Massage",
    image: "https://example.com/images/aromatherapy_massage.jpg",
    serviceCategoryId: "6844f3e91061958416d67f47",
    time: 60,
  },
  {
    name: "Hot Stone Massage",
    image: "https://example.com/images/hot_stone_massage.jpg",
    serviceCategoryId: "6844f3e91061958416d67f47",
    time: 75,
  },
  {
    name: "Deep Tissue Massage",
    image: "https://example.com/images/deep_tissue_massage.jpg",
    serviceCategoryId: "6844f3e91061958416d67f47",
    time: 90,
  },
  {
    name: "Basic Nail Care",
    image: "https://example.com/images/basic_nail_care.jpg",
    serviceCategoryId: "6844f3f51061958416d67f4b",
    time: 40,
  },
  {
    name: "Nail Polish Change",
    image: "https://example.com/images/nail_polish_change.jpg",
    serviceCategoryId: "6844f3f51061958416d67f4b",
    time: 30,
  },
  {
    name: "Gel Nail Removal",
    image: "https://example.com/images/gel_nail_removal.jpg",
    serviceCategoryId: "6844f3f51061958416d67f4b",
    time: 30,
  },
  {
    name: "Paraffin Wax Treatment",
    image: "https://example.com/images/paraffin_wax.jpg",
    serviceCategoryId: "6844f3f51061958416d67f4b",
    time: 45,
  },
  {
    name: "Nail Art Design",
    image: "https://example.com/images/nail_art_design.jpg",
    serviceCategoryId: "6844f3f51061958416d67f4b",
    time: 60,
  },
  {
    name: "Reflexology Massage",
    image: "https://example.com/images/reflexology_massage.jpg",
    serviceCategoryId: "6844f3e91061958416d67f47",
    time: 50,
  },
  {
    name: "Scalp Massage",
    image: "https://example.com/images/scalp_massage.jpg",
    serviceCategoryId: "6844f3e91061958416d67f47",
    time: 30,
  },
  {
    name: "Foot Massage",
    image: "https://example.com/images/foot_massage.jpg",
    serviceCategoryId: "6844f3e91061958416d67f47",
    time: 45,
  },
  {
    name: "Body Scrub",
    image: "https://example.com/images/body_scrub.jpg",
    serviceCategoryId: "6844f3e91061958416d67f47",
    time: 60,
  },
  {
    name: "Facial Massage",
    image: "https://example.com/images/facial_massage.jpg",
    serviceCategoryId: "6844f3e91061958416d67f47",
    time: 45,
  },
  {
    name: "Cuticle Care",
    image: "https://example.com/images/cuticle_care.jpg",
    serviceCategoryId: "6844f3f51061958416d67f4b",
    time: 30,
  },
  {
    name: "Nail Repair",
    image: "https://example.com/images/nail_repair.jpg",
    serviceCategoryId: "6844f3f51061958416d67f4b",
    time: 50,
  },
  {
    name: "Body Scrub",
    image: "https://example.com/images/body-scrub.jpg",
    serviceCategoryId: "6844f3d11061958416d67f3b",
    time: 60, // phút
  },
  {
    name: "Body Wrap",
    image: "https://example.com/images/body-wrap.jpg",
    serviceCategoryId: "6844f3d11061958416d67f3b",
    time: 75,
  },

  // Hair removal - id: 6844f3d91061958416d67f3f
  {
    name: "Laser Hair Removal - Legs",
    image: "https://example.com/images/laser-hair-removal-legs.jpg",
    serviceCategoryId: "6844f3d91061958416d67f3f",
    time: 90,
  },
  {
    name: "Waxing - Arms",
    image: "https://example.com/images/waxing-arms.jpg",
    serviceCategoryId: "6844f3d91061958416d67f3f",
    time: 45,
  },

  // Piercing and tattoo - id: 6844f3e21061958416d67f43
  {
    name: "Ear Piercing",
    image: "https://example.com/images/ear-piercing.jpg",
    serviceCategoryId: "6844f3e21061958416d67f43",
    time: 30,
  },
  {
    name: "Small Tattoo Design",
    image: "https://example.com/images/small-tattoo-design.jpg",
    serviceCategoryId: "6844f3e21061958416d67f43",
    time: 120,
  },
];

async function seedServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Xóa dữ liệu dịch vụ cũ
    await model.service.deleteMany();

    // Reset mảng services trong tất cả serviceCategory
    await model.serviceCategory.updateMany({}, { $set: { services: [] } });

    // Thêm dịch vụ mới
    const insertedServices = await model.service.insertMany(services);

    // Cập nhật serviceCategory với các service mới
    for (const service of insertedServices) {
      await model.serviceCategory.updateOne(
        { _id: service.serviceCategoryId },
        { $push: { services: { serviceId: service._id } } }
      );
    }

    console.log(
      "✅ Đã seed dữ liệu services và cập nhật serviceCategory thành công!"
    );
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seed thất bại:", error);
    await mongoose.disconnect();
  }
}

seedServices();
