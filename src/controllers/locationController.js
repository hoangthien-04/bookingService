import locationService from '../services/locationService.js';

export const createLocation = async (req, res) => {
  try {
    const location = await locationService.createLocationService(req.body);
    res.status(201).json({ message: 'Đã tạo location', data: location });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating location',
      error: error.message
    });
  }
};

export const getAllLocations = async (req, res, next) => {
  try {
    const list = await locationService.getAllLocationsService();
    res.json({ data: list });
  } catch (err) {
    next(err);
  }
};

export const getLocationById = async (req, res, next) => {
  try {
    const loc = await locationService.getLocationByIdService(req.params.id);
    res.json({ data: loc });
  } catch (err) {
    next(err);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const loc = await locationService.updateLocationService(req.params.id, req.body);
    res.json({ message: 'Đã cập nhật location', data: loc });
  } catch (err) {
    next(err);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    await locationService.deleteLocationService(req.params.id);
    res.json({ message: 'Đã xóa location' });
  } catch (err) {
    next(err);
  }
};

const getRecommendedLocations = async (req, res, next) => {
  const city   = req.params.city;
  const userId = req.user?.id || null;

  if (!city) return res.status(400).json({ message: 'City is required' });

  try {
    const list = await locationService.getRcmLocationsService(city, userId);
    return res.json(list);
  } catch (err) {
    next(err);
  }
};

const locationController = {
    createLocation,
    getRecommendedLocations
};

export default locationController