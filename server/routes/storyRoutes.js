import express from 'express';
import { createStory } from '../controllers/storyControllers.js';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.post("/story/create",isAuthenticated, createStory);
export default router;