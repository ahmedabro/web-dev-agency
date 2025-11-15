import express from 'express';

import { getTechnologies, addTechnology, addItem } from '../controllers/technologiesController.js';

const router = express.Router();

router.get('/technologies', getTechnologies);
router.post('/technologies/add', addTechnology);
router.post('/technologies/item/add', addItem);

export default router;
