import model from '../models/index.js';

const getAllCitiesService = async () => {
  const countries = await model.country.find({}, { cities: 1, _id: 0 });

  const allCities = countries.flatMap(doc => doc.cities);
  return allCities;
};

const getCityInfoService = async (cityCode) => {
  const country = await model.country.findOne({'cities.cityCode': cityCode});
  const city = country.cities.find(c => c.cityCode === cityCode);

  const locations = await model.location.find(
    { 'address.city': city.cityName },   // hoặc tuỳ schema: { 'address.cityCode': cityCode }
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

const countryService = {
    getAllCitiesService,
    getCityInfoService
};

export default countryService
