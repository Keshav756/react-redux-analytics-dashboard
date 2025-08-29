import { Router } from "express";
import AIController from "../controllers/ai.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// All AI routes require authentication
router.use(authenticate);

// Generate AI suggestions for learning path
router.post("/suggest", AIController.generateSuggestions);

// Get learning analytics
router.get("/analytics", AIController.getLearningAnalytics);

// Get AI-powered recommendations
router.get("/recommendations", AIController.getRecommendations);

// Generate personalized study plan
router.post("/study-plan", AIController.generateStudyPlan);

export default router;
