import express from 'express';
import {getAllTestimonials, createTestimonial} from '../controllers/testimonialsController.js'

const router = express.Router();

router.get('/testimonials', getAllTestimonials);
router.post('/testimonials/add', createTestimonial);

export default router;
