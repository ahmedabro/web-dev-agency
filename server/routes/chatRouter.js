import express from 'express'
import Message from '../models/messageModel.js'
import { fetchChatHistory, fetchConversations } from '../controllers/chatController.js';

const router = express.Router();

// GET /api/chat/history/:room
router.get("/chat/history/:room", fetchChatHistory);

// GET /api/chat/conversations
router.get("/chat/conversations", fetchConversations);

export default router;

