import model from '../models/index.js';
import fetch from 'node-fetch';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';
const USER_AGENT   = 'hoangthien17090@gmail.com';

const searchLocations = async (cityCode, q) => {
  const regex = new RegExp(q, 'i');
  return model.location
    .find(
      { 'address.cityCode': cityCode, name: regex },
      { name: 1, address: 1 }
    )
    .limit(5);
};

const searchStaffs = async (cityCode, q) => {
  const regex = new RegExp(q, 'i');
  // Lấy trước tất cả locationId trong city
  const locs = await model.location.find(
    { 'address.cityCode': cityCode },
    { _id: 1 }
  );
  const locIds = locs.map(l => l._id);

  // Từ staffLocation lấy staffId
  const staffIds = await model.staffLocation.distinct(
    'staffId',
    { locationId: { $in: locIds } }
  );

  // Query staff
  return model.staff
    .find(
      {
        _id: { $in: staffIds },
        $or: [
          { firstName: regex },
          { lastName:  regex },
          { phone:     regex }
        ]
      },
      { firstName: 1, lastName: 1, phone: 1, services: 1 }
    )
    .limit(5);
};

const searchServices = async (cityCode, q) => {
  const regex = new RegExp(q, 'i');
  const agg = await model.location.aggregate([
    { $match: { 'address.cityCode': cityCode } },
    { $unwind: '$services' },
    {
      $lookup: {
        from: 'services',
        localField: 'services.serviceId',
        foreignField: '_id',
        as: 'svc'
      }
    },
    { $unwind: '$svc' },
    { $match: { 'svc.name': regex } },
    {
      $group: {
        _id: '$svc._id',
        name:  { $first: '$svc.name' },
        time:  { $first: '$svc.time' },
        image: { $first: '$svc.image' }
      }
    },
    { $limit: 5 }
  ]);
  return agg.map(s => ({
    _id:   s._id,
    name:  s.name,
    time:  s.time,
    image: s.image
  }));
};

const getAllCitiesService = async () => {
  const countries = await model.country.find({}, { cities: 1, _id: 0 });

  const allCities = countries.flatMap(doc => doc.cities);
  return allCities;
};

const getCityInfoService = async (cityCode) => {
  const country = await model.country.findOne({'cities.cityCode': cityCode});

  const locations = await model.location.find(
    { 'address.cityCode': cityCode },   // hoặc tuỳ schema: { 'address.cityCode': cityCode }
    { _id: 1 }                        // chỉ cần _id để đếm và lọc staff
  );

  const locationIds = locations.map(loc => loc._id);
  const locationCount = locationIds.length

  const staffIds = await model.staffLocation.distinct(
    'staffId',
    { locationId: { $in: locationIds } }
  );
  const staffCount = staffIds.length;

  const result = {
    locationCount,
    staffCount,
    images: country.images
  }
  return result;
};

const reverseGeocode = async (lat, lon) => {
  // 1. Gọi Nominatim
  const url = `${NOMINATIM_URL}?format=geojson&lat=${lat}&lon=${lon}`;
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT }
  });

  // 2. Kiểm tra HTTP status
  if (!response.ok) {
    throw new Error(`Nominatim error ${response.status}`);
  }

  // 3. Parse JSON
  const geojson = await response.json();

  // 4. Lấy address của feature đầu tiên
  const address = geojson
    .features?.[0]
    ?.properties
    ?.address;

  // 5. Lấy trường ISO3166-2-lvl4, nếu không có thì trả về null
  const cityCode = address?.['ISO3166-2-lvl4'] ?? null;
  return {
    cityCode
  }

}

const countryService = {
    getAllCitiesService,
    getCityInfoService,
    reverseGeocode,
    searchLocations,
    searchStaffs,
    searchServices
};

export default countryService
