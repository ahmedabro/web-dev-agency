import express from 'express'
import User from '../models/userModel.js'
import { requireAuth } from '../middleware/auth.js'
import { registerUser, signInUser, getCurrentUser, logoutUser } from '../controllers/userController.js'

const router = express.Router()
router.post('/register', registerUser)
router.post('/signin', signInUser)
router.get('/current', requireAuth , getCurrentUser)
router.post('/logout', logoutUser)

export default router
