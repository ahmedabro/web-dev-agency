import express from 'express';
import { createBlog, getAllBlogs, getBlogById } from '../controllers/blogController.js';
import { upload } from '../middleware/multerUploade.js';

const router = express.Router();

router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs/add', upload.array("images", 10), createBlog);

export default router;
