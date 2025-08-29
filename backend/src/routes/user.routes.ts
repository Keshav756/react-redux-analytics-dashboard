import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Public routes (no authentication required)
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Protected routes (authentication required)
router.get("/profile", authenticate, UserController.getProfile);
router.put("/profile", authenticate, UserController.updateProfile);

export default router;
