"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepController = void 0;
const step_service_1 = __importDefault(require("../services/step.service"));
const helpers_1 = require("../utils/helpers");
const constants_1 = require("../utils/constants");
class StepController {
    static async addStepToPath(req, res, next) {
        try {
            const { pathId } = req.params;
            const { name, description, resourceLinks, order } = req.body;
            if (!name || !description || order === undefined) {
                (0, helpers_1.sendErrorResponse)(res, "Name, description, and order are required", constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            const stepData = {
                name,
                description,
                path: pathId,
                order,
                resourceLinks: resourceLinks || [],
            };
            const step = await step_service_1.default.addStepToPath(stepData);
            (0, helpers_1.sendSuccessResponse)(res, "Step added successfully", {
                step: {
                    id: step.id,
                    name: step.name,
                    description: step.description,
                    resourceLinks: step.resourceLinks,
                    order: step.order,
                    path: step.path,
                    completedBy: step.completedBy,
                    completionCount: step.completionCount,
                    createdAt: step.createdAt,
                    updatedAt: step.updatedAt,
                },
            }, constants_1.HTTP_STATUS.CREATED);
        }
        catch (error) {
            if (error.message === "Path not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Invalid step data" ||
                error.message === "Step order must be unique within the path") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to add step", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async updateStep(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const step = await step_service_1.default.updateStep(id, updateData);
            (0, helpers_1.sendSuccessResponse)(res, "Step updated successfully", {
                step: {
                    id: step.id,
                    name: step.name,
                    description: step.description,
                    resourceLinks: step.resourceLinks,
                    order: step.order,
                    path: step.path,
                    completedBy: step.completedBy,
                    completionCount: step.completionCount,
                    createdAt: step.createdAt,
                    updatedAt: step.updatedAt,
                },
            });
        }
        catch (error) {
            if (error.message === "Step not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Invalid step data" ||
                error.message === "Invalid step ID" ||
                error.message === "Step order must be unique within the path") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to update step", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async deleteStep(req, res, next) {
        try {
            const { id } = req.params;
            await step_service_1.default.deleteStep(id);
            (0, helpers_1.sendSuccessResponse)(res, "Step deleted successfully");
        }
        catch (error) {
            if (error.message === "Step not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Invalid step ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to delete step", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async markStepCompleted(req, res, next) {
        try {
            const { id } = req.params;
            if (!req.user) {
                (0, helpers_1.sendErrorResponse)(res, "User not authenticated", constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            const step = await step_service_1.default.markStepCompletedByUser(id, req.user.id);
            (0, helpers_1.sendSuccessResponse)(res, "Step marked as completed", {
                step: {
                    id: step.id,
                    name: step.name,
                    description: step.description,
                    resourceLinks: step.resourceLinks,
                    order: step.order,
                    path: step.path,
                    completedBy: step.completedBy,
                    completionCount: step.completionCount,
                    createdAt: step.createdAt,
                    updatedAt: step.updatedAt,
                },
            });
        }
        catch (error) {
            if (error.message === "Step not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Step already completed by this user") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.CONFLICT);
                return;
            }
            if (error.message === "Invalid step or user ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to mark step as completed", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async markStepIncomplete(req, res, next) {
        try {
            const { id } = req.params;
            if (!req.user) {
                (0, helpers_1.sendErrorResponse)(res, "User not authenticated", constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            const step = await step_service_1.default.markStepIncompleteByUser(id, req.user.id);
            (0, helpers_1.sendSuccessResponse)(res, "Step marked as incomplete", {
                step: {
                    id: step.id,
                    name: step.name,
                    description: step.description,
                    resourceLinks: step.resourceLinks,
                    order: step.order,
                    path: step.path,
                    completedBy: step.completedBy,
                    completionCount: step.completionCount,
                    createdAt: step.createdAt,
                    updatedAt: step.updatedAt,
                },
            });
        }
        catch (error) {
            if (error.message === "Step not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Step not completed by this user") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.CONFLICT);
                return;
            }
            if (error.message === "Invalid step or user ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to mark step as incomplete", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getStepsByPath(req, res, next) {
        try {
            const { pathId } = req.params;
            console.log("StepController: Getting steps for path ID:", pathId);
            const steps = await step_service_1.default.getStepsByPath(pathId);
            console.log("StepController: Found steps:", steps.length, "steps");
            (0, helpers_1.sendSuccessResponse)(res, "Steps retrieved successfully", {
                steps: steps.map((step) => ({
                    id: step.id,
                    title: step.title,
                    description: step.description,
                    resourceLinks: step.resourceLinks,
                    order: step.order,
                    pathId: step.pathId,
                    completedBy: step.completedBy,
                    completionCount: step.completionCount,
                    createdAt: step.createdAt,
                    updatedAt: step.updatedAt,
                })),
                total: steps.length,
            });
        }
        catch (error) {
            console.log("StepController: Error getting steps:", error.message);
            if (error.message === "Invalid path ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to fetch steps", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getAllStepsDebug(req, res, next) {
        try {
            console.log("StepController: Getting ALL steps for debugging");
            const steps = await step_service_1.default.getAllStepsForDebug();
            console.log("StepController: Found", steps.length, "total steps in database");
            (0, helpers_1.sendSuccessResponse)(res, "All steps retrieved for debugging", {
                steps: steps.map((step) => ({
                    id: step.id,
                    title: step.title,
                    description: step.description,
                    pathId: step.pathId,
                    order: step.order,
                    resourceLinks: step.resourceLinks,
                    completedBy: step.completedBy,
                    completionCount: step.completionCount,
                    createdAt: step.createdAt,
                    updatedAt: step.updatedAt,
                    fullStep: step,
                })),
                total: steps.length,
            });
        }
        catch (error) {
            console.log("StepController: Error getting all steps:", error.message);
            (0, helpers_1.sendErrorResponse)(res, "Failed to fetch all steps", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getUserCompletedSteps(req, res, next) {
        try {
            if (!req.user) {
                (0, helpers_1.sendErrorResponse)(res, "User not authenticated", constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            const steps = await step_service_1.default.getUserCompletedSteps(req.user.id);
            (0, helpers_1.sendSuccessResponse)(res, "Completed steps retrieved successfully", {
                steps: steps.map((step) => ({
                    id: step.id,
                    title: step.title,
                    description: step.description,
                    resourceLinks: step.resourceLinks,
                    order: step.order,
                    pathId: step.pathId,
                    completedBy: step.completedBy,
                    completionCount: step.completionCount,
                    createdAt: step.createdAt,
                    updatedAt: step.updatedAt,
                })),
                total: steps.length,
            });
        }
        catch (error) {
            if (error.message === "Invalid user ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to fetch completed steps", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getUserProgress(req, res, next) {
        try {
            const { userId } = req.params;
            const { pathId } = req.query;
            if (!req.user) {
                (0, helpers_1.sendErrorResponse)(res, "User not authenticated", constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            if (req.user.id !== userId) {
                (0, helpers_1.sendErrorResponse)(res, "You can only view your own progress", constants_1.HTTP_STATUS.FORBIDDEN);
                return;
            }
            if (!pathId || typeof pathId !== "string") {
                (0, helpers_1.sendErrorResponse)(res, "Path ID is required", constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            const progress = await step_service_1.default.getUserProgress(userId, pathId);
            (0, helpers_1.sendSuccessResponse)(res, "User progress retrieved successfully", {
                progress,
            });
        }
        catch (error) {
            if (error.message === "No steps found for this path") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Invalid user or path ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to get user progress", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getStepCompletionStats(req, res, next) {
        try {
            const { id } = req.params;
            const stats = await step_service_1.default.getStepCompletionStats(id);
            (0, helpers_1.sendSuccessResponse)(res, "Step completion statistics retrieved successfully", {
                stats,
            });
        }
        catch (error) {
            if (error.message === "Step not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Invalid step ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to get completion statistics", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.StepController = StepController;
exports.default = StepController;
//# sourceMappingURL=step.controller.js.map