import express from 'express';
import { createExperience, getAllExperiences, addResponsibilities, addAchievements } from '../controllers/experienceController.js';

const router = express.Router();

router.get('/experiences', getAllExperiences);
router.post('/experiences/add', createExperience);
router.post('/experiences/resp', addResponsibilities);
router.post('/experiences/ach', addAchievements);

export default router;
