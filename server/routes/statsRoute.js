import express from 'express';
import { addStat, getStats } from '../controllers/statsController.js';

const router = express.Router();

router.post('/stats/add', addStat);
router.get('/stats', getStats);

export default router;