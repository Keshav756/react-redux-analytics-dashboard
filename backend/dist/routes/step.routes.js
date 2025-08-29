"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const step_controller_1 = __importDefault(require("../controllers/step.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/path/:pathId", step_controller_1.default.getStepsByPath);
router.get("/debug/all", step_controller_1.default.getAllStepsDebug);
router.post("/:pathId", auth_middleware_1.authenticate, step_controller_1.default.addStepToPath);
router.put("/:id", auth_middleware_1.authenticate, step_controller_1.default.updateStep);
router.delete("/:id", auth_middleware_1.authenticate, step_controller_1.default.deleteStep);
router.patch("/:id/complete", auth_middleware_1.authenticate, step_controller_1.default.markStepCompleted);
router.patch("/:id/incomplete", auth_middleware_1.authenticate, step_controller_1.default.markStepIncomplete);
router.get("/completed", auth_middleware_1.authenticate, step_controller_1.default.getUserCompletedSteps);
router.get("/:id/stats", auth_middleware_1.authenticate, step_controller_1.default.getStepCompletionStats);
router.get("/users/:userId/progress", auth_middleware_1.authenticate, step_controller_1.default.getUserProgress);
exports.default = router;
//# sourceMappingURL=step.routes.js.map