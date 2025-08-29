"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepService = void 0;
const step_model_1 = __importDefault(require("../models/step.model"));
const path_model_1 = __importDefault(require("../models/path.model"));
class StepService {
    static async addStepToPath(stepData) {
        try {
            const path = await path_model_1.default.findById(stepData.path);
            if (!path) {
                const error = new Error("Path not found");
                error.statusCode = 404;
                throw error;
            }
            const step = new step_model_1.default(stepData);
            await step.save();
            await path_model_1.default.findByIdAndUpdate(stepData.path, {
                $push: { steps: step._id },
            });
            return step;
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            if (error.name === "ValidationError") {
                const customError = new Error("Invalid step data");
                customError.statusCode = 400;
                throw customError;
            }
            if (error.code === 11000) {
                const customError = new Error("Step order must be unique within the path");
                customError.statusCode = 409;
                throw customError;
            }
            const customError = new Error("Failed to create step");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getStepById(id) {
        try {
            const step = await step_model_1.default.findById(id).populate("path", "title category");
            if (!step) {
                const error = new Error("Step not found");
                error.statusCode = 404;
                throw error;
            }
            return step;
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            if (error.name === "CastError") {
                const customError = new Error("Invalid step ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to fetch step");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async updateStep(id, updateData) {
        try {
            const step = await step_model_1.default.findByIdAndUpdate(id, { ...updateData, updatedAt: new Date() }, { new: true, runValidators: true }).populate("path", "title category");
            if (!step) {
                const error = new Error("Step not found");
                error.statusCode = 404;
                throw error;
            }
            return step;
        }
        catch (error) {
            if (error.name === "ValidationError") {
                const customError = new Error("Invalid step data");
                customError.statusCode = 400;
                throw customError;
            }
            if (error.name === "CastError") {
                const customError = new Error("Invalid step ID");
                customError.statusCode = 400;
                throw customError;
            }
            if (error.code === 11000) {
                const customError = new Error("Step order must be unique within the path");
                customError.statusCode = 409;
                throw customError;
            }
            const customError = new Error("Failed to update step");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async deleteStep(id) {
        try {
            const step = await step_model_1.default.findById(id);
            if (!step) {
                const error = new Error("Step not found");
                error.statusCode = 404;
                throw error;
            }
            await path_model_1.default.findByIdAndUpdate(step.path, {
                $pull: { steps: step._id },
            });
            await step_model_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            if (error.name === "CastError") {
                const customError = new Error("Invalid step ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to delete step");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async markStepCompletedByUser(stepId, userId) {
        try {
            const step = await step_model_1.default.findById(stepId);
            if (!step) {
                const error = new Error("Step not found");
                error.statusCode = 404;
                throw error;
            }
            const userObjectId = userId;
            const isCompleted = step.completedBy.some((id) => id.toString() === userObjectId.toString());
            if (isCompleted) {
                const error = new Error("Step already completed by this user");
                error.statusCode = 409;
                throw error;
            }
            const updatedStep = await step_model_1.default.findByIdAndUpdate(stepId, { $push: { completedBy: userObjectId } }, { new: true }).populate("path", "title category");
            return updatedStep;
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            if (error.name === "CastError") {
                const customError = new Error("Invalid step or user ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to mark step as completed");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async markStepIncompleteByUser(stepId, userId) {
        try {
            const step = await step_model_1.default.findById(stepId);
            if (!step) {
                const error = new Error("Step not found");
                error.statusCode = 404;
                throw error;
            }
            const userObjectId = userId;
            const isCompleted = step.completedBy.some((id) => id.toString() === userObjectId.toString());
            if (!isCompleted) {
                const error = new Error("Step not completed by this user");
                error.statusCode = 409;
                throw error;
            }
            const updatedStep = await step_model_1.default.findByIdAndUpdate(stepId, { $pull: { completedBy: userObjectId } }, { new: true }).populate("path", "title category");
            return updatedStep;
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            if (error.name === "CastError") {
                const customError = new Error("Invalid step or user ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to mark step as incomplete");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getStepsByPath(pathId) {
        try {
            console.log('StepService: Querying for steps with path ID:', pathId);
            const steps = await step_model_1.default.find({ path: pathId })
                .populate("completedBy", "name email")
                .sort({ order: 1 });
            console.log('StepService: Found', steps.length, 'steps for path', pathId);
            if (steps.length > 0) {
                console.log('StepService: First step:', {
                    id: steps[0]._id,
                    name: steps[0].name,
                    path: steps[0].path
                });
            }
            return steps;
        }
        catch (error) {
            console.log('StepService: Error querying steps:', error.message);
            if (error.name === "CastError") {
                const customError = new Error("Invalid path ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to fetch steps");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getAllStepsForDebug() {
        try {
            console.log('StepService: Getting ALL steps for debugging');
            const steps = await step_model_1.default.find({})
                .populate("path", "title category")
                .sort({ createdAt: -1 });
            console.log('StepService: Found', steps.length, 'total steps in database');
            steps.forEach((step, index) => {
                console.log(`Step ${index + 1}:`, {
                    id: step._id,
                    name: step.name,
                    path: step.path,
                    pathTitle: step.path?.title || 'Unknown',
                    order: step.order,
                    createdAt: step.createdAt
                });
            });
            return steps;
        }
        catch (error) {
            console.log('StepService: Error getting all steps:', error.message);
            const customError = new Error("Failed to fetch all steps");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getUserCompletedSteps(userId) {
        try {
            const steps = await step_model_1.default.find({ completedBy: userId })
                .populate("path", "title category")
                .sort({ updatedAt: -1 });
            return steps;
        }
        catch (error) {
            if (error.name === "CastError") {
                const customError = new Error("Invalid user ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to fetch completed steps");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getUserProgress(userId, pathId) {
        try {
            const allSteps = await step_model_1.default.find({ path: pathId }).sort({ order: 1 });
            if (allSteps.length === 0) {
                const error = new Error("No steps found for this path");
                error.statusCode = 404;
                throw error;
            }
            const completedSteps = allSteps
                .filter(step => step.completedBy.some(id => id.toString() === userId))
                .map(step => step._id.toString());
            const totalSteps = allSteps.length;
            const completedCount = completedSteps.length;
            const completionRate = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;
            const remainingSteps = allSteps
                .filter(step => !completedSteps.includes(step._id.toString()))
                .map(step => ({
                id: step._id.toString(),
                name: step.name,
                order: step.order,
                description: step.description
            }));
            return {
                pathId,
                totalSteps,
                completedSteps,
                completionRate: Math.round(completionRate * 100) / 100,
                completedCount,
                remainingSteps
            };
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            if (error.name === "CastError") {
                const customError = new Error("Invalid user or path ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to get user progress");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getStepCompletionStats(stepId) {
        try {
            const step = await step_model_1.default.findById(stepId).populate("completedBy", "name email");
            if (!step) {
                const error = new Error("Step not found");
                error.statusCode = 404;
                throw error;
            }
            return {
                totalCompletions: step.completedBy.length,
                completedBy: step.completedBy.map((user) => ({
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                })),
            };
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            if (error.name === "CastError") {
                const customError = new Error("Invalid step ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to get completion statistics");
            customError.statusCode = 500;
            throw customError;
        }
    }
}
exports.StepService = StepService;
exports.default = StepService;
//# sourceMappingURL=step.service.js.map