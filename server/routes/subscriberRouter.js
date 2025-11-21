import express from 'express';
import { getAllSubscribers, subscribe, unsubscribe, sendNewsletterService } from '../controllers/subscriberController.js';

const router = express.Router();

router.get('/subscribers', getAllSubscribers);
router.post('/subscribers/subscribe', subscribe);
router.post('/subscribers/unsubscribe/:token', unsubscribe);
router.post('/subscribers/send-newsletter', sendNewsletterService);

export default router;
