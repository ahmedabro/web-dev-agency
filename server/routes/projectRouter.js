import express from 'express';

import { getAllProjects, getProjectById, addProject } from '../controllers/projectController.js';

const router = express.Router();

router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects/add', addProject);

export default router;