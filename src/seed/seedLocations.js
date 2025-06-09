import mongoose from "mongoose";
import model from "../models/index.js";
const { ObjectId } = mongoose.Types;

import dotenv from "dotenv";
dotenv.config();

const locations = [
  {
    image:
      "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    phone: "0910000000",
    name: "Location 1",
    address: {
      country: "Vietnam",
      city: "Đà Nẵng",
      cityCode: "VN-DN",
      district: "District 1",
      specifict: "Specific street 1",
    },
    services: [
      {
        serviceId: "68469b232b03db0d3106e952",
        price: 100000,
      },
    ],
    favoriteCount: 0,
    businessId: "6846981a6d2b65bf52ad8a5b",
  },
  {
    image:
      "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    phone: "0910000001",
    name: "Location 2",
    address: {
      country: "Vietnam",
      city: "Đà Nẵng",
      cityCode: "VN-DN",
      district: "District 2",
      specifict: "Specific street 2",
    },
    services: [
      {
        serviceId: "68469b232b03db0d3106e94a",
        price: 150000,
      },
    ],
    favoriteCount: 0,
    businessId: "6846981a6d2b65bf52ad8a56",
  },
  {
    image:
      "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    phone: "0910000002",
    name: "Location 3",
    address: {
      country: "Vietnam",
      city: "Đồng Nai",
      cityCode: "VN-39",
      district: "District 3",
      specifict: "Specific street 3",
    },
    services: [
      {
        serviceId: "68469b232b03db0d3106e94f",
        price: 200000,
      },
    ],
    favoriteCount: 0,
    businessId: "6846981a6d2b65bf52ad8a59",
  },
  {
    image:
      "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    phone: "0910000003",
    name: "Location 4",
    address: {
      country: "Vietnam",
      city: "Long An",
      cityCode: "VN-41",
      district: "District 4",
      specifict: "Specific street 4",
    },
    services: [
      {
        serviceId: "68469b232b03db0d3106e94e",
        price: 250000,
      },
    ],
    favoriteCount: 0,
    businessId: "6846981a6d2b65bf52ad8a56",
  },
  {
    image:
      "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    phone: "0910000004",
    name: "Location 5",
    address: {
      country: "Vietnam",
      city: "Nghệ An",
      cityCode: "VN-22",
      district: "District 5",
      specifict: "Specific street 5",
    },
    services: [
      {
        serviceId: "68469b232b03db0d3106e94b",
        price: 300000,
      },
    ],
    favoriteCount: 0,
    businessId: "6846981a6d2b65bf52ad8a59",
  },
  {
    image:
      "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    phone: "0910000005",
    name: "Location 6",
    address: {
      country: "Vietnam",
      city: "Hải phòng",
      cityCode: "VN-HP",
      district: "District 6",
      specifict: "Specific street 6",
    },
    services: [
      {
        serviceId: "68469b232b03db0d3106e94f",
        price: 350000,
      },
    ],
    favoriteCount: 0,
    businessId: "6846981a6d2b65bf52ad8a56",
  },
  {
    image:
      "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    phone: "0910000006",
    name: "Location 7",
    address: {
      country: "Vietnam",
      city: "Bình Định",
      cityCode: "VN-31",
      district: "District 7",
      specifict: "Specific street 7",
    },
    services: [
      {
        serviceId: "68469b232b03db0d3106e94c",
        price: 400000,
      },
    ],
    favoriteCount: 0,
    businessId: "6846981a6d2b65bf52ad8a5b",
  },
  {
    image:
      "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    phone: "0910000007",
    name: "Location 8",
    address: {
      country: "Vietnam",
      city: "Hà Nội",
      cityCode: "VN-HN",
      district: "District 8",
      specifict: "Specific street 8",
    },
    services: [
      {
        serviceId: "68469b232b03db0d3106e94e",
        price: 450000,
      },
    ],
    favoriteCount: 0,
    businessId: "6846981a6d2b65bf52ad8a52",
  },
  {
    image:
      "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    phone: "0910000008",
    name: "Location 9",
    address: {
      country: "Vietnam",
      city: "Hà Nội",
      cityCode: "VN-HN",
      district: "District 9",
      specifict: "Specific street 9",
    },
    services: [
      {
        serviceId: "68469b232b03db0d3106e951",
        price: 500000,
      },
    ],
    favoriteCount: 0,
    businessId: "6846981a6d2b65bf52ad8a57",
  },
  {
    image:
      "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    phone: "0910000009",
    name: "Location 10",
    address: {
      country: "Vietnam",
      city: "Cần Thơ",
      cityCode: "VN-CT",
      district: "District 10",
      specifict: "Specific street 10",
    },
    services: [
      {
        serviceId: "68469b232b03db0d3106e94a",
        price: 550000,
      },
    ],
    favoriteCount: 0,
    businessId: "6846981a6d2b65bf52ad8a55",
  },
];

async function seedLoations() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // await model.location.deleteMany(); // Xoá dữ liệu cũ nếu cần
    await model.location.insertMany(locations);
    // const listBussinessIds = await model.business.find({}).select('_id').lean();
    // const listServiceIds = await model.service.find({}).select('_id').lean();
    // console.log('listBussinessIds', listBussinessIds);
    // console.log('listServiceIds', listServiceIds);

    // const businessIds = [
    //   new ObjectId("6846981a6d2b65bf52ad8a52"),
    //   new ObjectId("6846981a6d2b65bf52ad8a53"),
    //   new ObjectId("6846981a6d2b65bf52ad8a54"),
    //   new ObjectId("6846981a6d2b65bf52ad8a55"),
    //   new ObjectId("6846981a6d2b65bf52ad8a56"),
    //   new ObjectId("6846981a6d2b65bf52ad8a57"),
    //   new ObjectId("6846981a6d2b65bf52ad8a58"),
    //   new ObjectId("6846981a6d2b65bf52ad8a59"),
    //   new ObjectId("6846981a6d2b65bf52ad8a5a"),
    //   new ObjectId("6846981a6d2b65bf52ad8a5b"),
    // ];

    // const serviceIds = [
    //   new ObjectId("68469b232b03db0d3106e94a"),
    //   new ObjectId("68469b232b03db0d3106e94b"),
    //   new ObjectId("68469b232b03db0d3106e94c"),
    //   new ObjectId("68469b232b03db0d3106e94d"),
    //   new ObjectId("68469b232b03db0d3106e94e"),
    //   new ObjectId("68469b232b03db0d3106e94f"),
    //   new ObjectId("68469b232b03db0d3106e950"),
    //   new ObjectId("68469b232b03db0d3106e951"),
    //   new ObjectId("68469b232b03db0d3106e952"),
    //   new ObjectId("68469b232b03db0d3106e953"),
    // ];

    // const cities = [
    //   { cityCode: "VN-SG", city: "Thành phố Hồ Chí Minh" },
    //   { cityCode: "VN-HN", city: "Hà Nội" },
    //   { cityCode: "VN-DN", city: "Đà Nẵng" },
    //   { cityCode: "VN-CT", city: "Cần Thơ" },
    //   { cityCode: "VN-HP", city: "Hải phòng" },
    //   { cityCode: "VN-57", city: "Bình Dương" },
    //   { cityCode: "VN-39", city: "Đồng Nai" },
    //   { cityCode: "VN-41", city: "Long An" },
    //   { cityCode: "VN-22", city: "Nghệ An" },
    //   { cityCode: "VN-31", city: "Bình Định" },
    // ];

    // function getRandomInt(max) {
    //   return Math.floor(Math.random() * max);
    // }

    // const locations = [];

    // for (let i = 0; i < 10; i++) {
    //   const businessId = businessIds[getRandomInt(businessIds.length)];
    //   const serviceId = serviceIds[getRandomInt(serviceIds.length)];
    //   const cityInfo = cities[getRandomInt(cities.length)];

    //   locations.push({
    //     image:
    //       "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    //     phone: `09${10000000 + i}`, // phone dạng giả lập
    //     name: `Location ${i + 1}`,
    //     address: {
    //       country: "Vietnam",
    //       city: cityInfo.city,
    //       cityCode: cityInfo.cityCode,
    //       district: `District ${i + 1}`,
    //       specifict: `Specific street ${i + 1}`,
    //     },
    //     services: [
    //       {
    //         serviceId: serviceId,
    //         price: 100000 + i * 50000,
    //       },
    //     ],
    //     favoriteCount: getRandomInt(100),
    //     businessId: businessId,
    //   });
    // }

    // console.log(JSON.stringify(locations, null, 2));

    console.log("✅ Đã seed dữ liệu locaiton thành công!");
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seed thất bại:", error);
    await mongoose.disconnect();
  }
}

seedLoations();
