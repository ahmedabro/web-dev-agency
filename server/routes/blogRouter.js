import express from 'express';
import { createBlog, getAllBlogs, getBlogById } from '../controllers/blogController.js';

const router = express.Router();

router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs/add', createBlog);

export default router;
