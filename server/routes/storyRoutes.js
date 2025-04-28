import express from 'express';
import { createStory } from '../controllers/storyControllers.js';
const router = express.Router();

router.post("/story/create", createStory);
export default router;