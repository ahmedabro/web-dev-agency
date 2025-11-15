import express from 'express';
import { sendEmail, sendTestEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send-email', sendEmail);
router.post('/send-test-email', sendTestEmail);

export default router;
