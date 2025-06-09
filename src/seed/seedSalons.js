import mongoose from 'mongoose';
import model from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();
const salons = [
  {
    name: "Sunny Beauty Salon",
    phone: "0901234001",
    email: "sunnybeauty01@gmail.com",
    description: "Chuyên làm tóc, chăm sóc da và spa thư giãn cao cấp.",
  },
  {
    name: "Linh Luxury Spa",
    phone: "0901234002",
    email: "linhluxury02@gmail.com",
    description: "Trị liệu da mặt và massage body chuyên sâu.",
  },
  {
    name: "The Hair Corner",
    phone: "0901234003",
    email: "haircorner03@gmail.com",
    description: "Salon thời trang tóc theo phong cách Hàn Quốc.",
  },
  {
    name: "Nail Art Studio",
    phone: "0901234004",
    email: "nailartstudio04@gmail.com",
    description: "Chuyên vẽ móng nghệ thuật, sơn gel, đính đá cao cấp.",
  },
  {
    name: "Hana Spa & Beauty",
    phone: "0901234005",
    email: "hanaspa05@gmail.com",
    description: "Dịch vụ chăm sóc sắc đẹp toàn diện từ tóc đến body.",
  },
  {
    name: "Glamour Hair Salon",
    phone: "0901234006",
    email: "glamour06@gmail.com",
    description: "Tạo kiểu tóc chuyên nghiệp và phục hồi tóc hư tổn.",
  },
  {
    name: "Royal Skin Clinic",
    phone: "0901234007",
    email: "royalskin07@gmail.com",
    description: "Điều trị da liễu và chăm sóc da công nghệ cao.",
  },
  {
    name: "Elite Beauty Center",
    phone: "0901234008",
    email: "elite08@gmail.com",
    description: "Chăm sóc sắc đẹp chuẩn 5 sao cho phụ nữ hiện đại.",
  },
  {
    name: "Angel Spa",
    phone: "0901234009",
    email: "angelspa09@gmail.com",
    description: "Liệu trình thư giãn và trị liệu cho cơ thể và tâm trí.",
  },
  {
    name: "Tokyo Hair Lounge",
    phone: "0901234010",
    email: "tokyolounge10@gmail.com",
    description: "Salon Nhật Bản hiện đại với kỹ thuật nhuộm tóc cao cấp.",
  },
  {
    name: "Paris Nail Studio",
    phone: "0901234011",
    email: "parisnail11@gmail.com",
    description: "Dịch vụ làm móng tinh tế, đẳng cấp phong cách châu Âu.",
  },
  {
    name: "Diamond Skincare",
    phone: "0901234012",
    email: "diamond12@gmail.com",
    description: "Trung tâm điều trị mụn, nám, lão hóa bằng laser.",
  },
  {
    name: "Queen Beauty Salon",
    phone: "0901234013",
    email: "queenbeauty13@gmail.com",
    description: "Nơi tôn vinh sắc đẹp và phong cách riêng của bạn.",
  },
  {
    name: "Aroma Spa",
    phone: "0901234014",
    email: "aromaspa14@gmail.com",
    description: "Liệu pháp tinh dầu thiên nhiên giúp thư giãn sâu.",
  },
  {
    name: "Cẩm Tú Hair Studio",
    phone: "0901234015",
    email: "camtustudio15@gmail.com",
    description: "Chuyên làm tóc cô dâu và trang điểm sự kiện.",
  },
  {
    name: "Lavie Skin & Spa",
    phone: "0901234016",
    email: "lavie16@gmail.com",
    description: "Chăm sóc da mặt bằng mỹ phẩm hữu cơ an toàn.",
  },
  {
    name: "Golden Touch Beauty",
    phone: "0901234017",
    email: "goldentouch17@gmail.com",
    description: "Công nghệ nâng cơ không xâm lấn tiên tiến nhất.",
  },
  {
    name: "Romance Hair Design",
    phone: "0901234018",
    email: "romance18@gmail.com",
    description: "Salon tạo kiểu tóc hiện đại, chuyên uốn – nhuộm.",
  },
  {
    name: "Mint Nails & Spa",
    phone: "0901234019",
    email: "mintspa19@gmail.com",
    description: "Nail – spa kết hợp phong cách nhẹ nhàng thư giãn.",
  },
  {
    name: "Yuki Beauty Lounge",
    phone: "0901234020",
    email: "yukibeauty20@gmail.com",
    description: "Nơi sắc đẹp được nâng niu như nghệ thuật sống.",
  },
  {
    name: "Glam Studio",
    phone: "0901234021",
    email: "glam21@gmail.com",
    description: "Trang điểm và làm tóc chuyên nghiệp cho mọi dịp.",
  },
  {
    name: "Glow Skincare Clinic",
    phone: "0901234022",
    email: "glowskin22@gmail.com",
    description: "Da khỏe đẹp tự nhiên với công nghệ sinh học.",
  },
  {
    name: "Nắng Hair & Makeup",
    phone: "0901234023",
    email: "nangmakeup23@gmail.com",
    description: "Salon nghệ thuật làm đẹp đậm chất Việt.",
  },
  {
    name: "Ivy Spa",
    phone: "0901234024",
    email: "ivyspa24@gmail.com",
    description: "Massage đá nóng, xông hơi thảo dược cổ truyền.",
  },
  {
    name: "Sapphire Nail Boutique",
    phone: "0901234025",
    email: "sapphirenail25@gmail.com",
    description: "Móng tay – móng chân thời trang và sáng tạo.",
  },
  {
    name: "Bella Luxury Salon",
    phone: "0901234026",
    email: "bella26@gmail.com",
    description: "Salon cao cấp phục vụ khách hàng VIP.",
  },
  {
    name: "Thảo Mộc Spa",
    phone: "0901234027",
    email: "thaomocspa27@gmail.com",
    description: "Liệu pháp thiên nhiên phục hồi năng lượng.",
  },
  {
    name: "Peony Hair Studio",
    phone: "0901234028",
    email: "peonyhair28@gmail.com",
    description: "Tạo kiểu tóc thời trang, trẻ trung và năng động.",
  },
  {
    name: "Mocha Nails",
    phone: "0901234029",
    email: "mochanails29@gmail.com",
    description: "Thiết kế nail sáng tạo và an toàn cho móng.",
  },
  {
    name: "Zen Beauty Center",
    phone: "0901234030",
    email: "zenbeauty30@gmail.com",
    description: "Tịnh tâm – làm đẹp – tái tạo năng lượng sống.",
  },
  {
    name: "Vintage Hair Lab",
    phone: "0901234031",
    email: "vintagehair31@gmail.com",
    description: "Phong cách hoài cổ kết hợp kỹ thuật hiện đại.",
  },
  {
    name: "Lotus Spa & Beauty",
    phone: "0901234032",
    email: "lotusbeauty32@gmail.com",
    description: "Đẳng cấp chăm sóc toàn diện cho phái nữ.",
  },
  {
    name: "Shiny Hair Studio",
    phone: "0901234033",
    email: "shinyhair33@gmail.com",
    description: "Chuyên nhuộm, phục hồi, uốn lạnh chất lượng cao.",
  },
  {
    name: "Bamboo Spa",
    phone: "0901234034",
    email: "bamboospa34@gmail.com",
    description: "Thư giãn với phương pháp cổ truyền và hiện đại.",
  },
  {
    name: "Miracle Beauty House",
    phone: "0901234035",
    email: "miraclehouse35@gmail.com",
    description: "Cải thiện làn da và sắc vóc bằng công nghệ tiên tiến.",
  },
  {
    name: "Trang Angel Hair",
    phone: "0901234036",
    email: "trangangel36@gmail.com",
    description: "Chuyên làm tóc cô dâu và trang điểm sự kiện.",
  },
  {
    name: "Infinity Nails",
    phone: "0901234037",
    email: "infinitynails37@gmail.com",
    description: "Làm móng nghệ thuật với hơn 1000 mẫu thiết kế.",
  },
  {
    name: "Jade Spa",
    phone: "0901234038",
    email: "jadespa38@gmail.com",
    description: "Chăm sóc sức khỏe và tinh thần toàn diện.",
  },
  {
    name: "Lumière Beauty Studio",
    phone: "0901234039",
    email: "lumierebeauty39@gmail.com",
    description: "Studio kết hợp ánh sáng và công nghệ làm đẹp.",
  },
  {
    name: "Blossom Skin Clinic",
    phone: "0901234040",
    email: "blossomclinic40@gmail.com",
    description: "Da sáng – dáng xinh – vẻ đẹp tỏa sáng.",
  }
];


async function seedSalons() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await model.business.deleteMany(); // Xoá dữ liệu cũ nếu cần
    await model.business.insertMany(salons);
    console.log('✅ Đã seed dữ liệu salon thành công!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seed thất bại:', error);
    await mongoose.disconnect();
  }
}

seedSalons();
