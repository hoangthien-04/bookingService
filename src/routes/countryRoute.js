import express from 'express';
import countryController from '../controllers/countryController.js';

const router = express.Router();

router.get('/reverse', countryController.reverseGeocode);
router.get('/search', countryController.searchAll);

router.get('/all-cities', countryController.getAllCities);
router.get('/:cityCode', countryController.getCityInfo);

export default router;
