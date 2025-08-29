import { Router } from "express";
import StepController from "../controllers/step.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Public routes (no authentication required)
router.get("/path/:pathId", StepController.getStepsByPath);
router.get("/debug/all", StepController.getAllStepsDebug);

// Protected routes (authentication required)
router.post("/:pathId", authenticate, StepController.addStepToPath);
router.put("/:id", authenticate, StepController.updateStep);
router.delete("/:id", authenticate, StepController.deleteStep);
router.patch("/:id/complete", authenticate, StepController.markStepCompleted);
router.patch(
  "/:id/incomplete",
  authenticate,
  StepController.markStepIncomplete
);
router.get("/completed", authenticate, StepController.getUserCompletedSteps);
router.get("/:id/stats", authenticate, StepController.getStepCompletionStats);
router.get(
  "/users/:userId/progress",
  authenticate,
  StepController.getUserProgress
);

export default router;
