import express from 'express';
import { createExperience, getAllExperiences } from '../controllers/experienceController.js';

const router = express.Router();

router.get('/experiences', getAllExperiences);
router.post('/experiences/add', createExperience);

export default router;
