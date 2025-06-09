import express from 'express';
import countryController from '../controllers/countryController.js';

const router = express.Router();

router.get('/all-cities', countryController.getAllCities);
router.get('/:cityCode', countryController.getCityInfo);

export default router;
