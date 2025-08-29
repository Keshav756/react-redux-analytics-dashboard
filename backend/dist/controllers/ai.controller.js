"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const ai_service_1 = __importDefault(require("../services/ai.service"));
const step_service_1 = __importDefault(require("../services/step.service"));
const helpers_1 = require("../utils/helpers");
const constants_1 = require("../utils/constants");
class AIController {
    static async generateSuggestions(req, res, next) {
        try {
            if (!req.user) {
                (0, helpers_1.sendErrorResponse)(res, "User not authenticated", constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            const { pathId } = req.body;
            if (!pathId) {
                (0, helpers_1.sendErrorResponse)(res, "Path ID is required", constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            const userProgress = await step_service_1.default.getUserProgress(req.user.id, pathId);
            const aiInput = {
                userId: req.user.id,
                pathId,
                completedSteps: userProgress.completedSteps
            };
            const suggestions = await ai_service_1.default.generateSuggestions(aiInput);
            (0, helpers_1.sendSuccessResponse)(res, "AI suggestions generated successfully", {
                suggestions: {
                    nextStep: suggestions.nextStep,
                    suggestions: suggestions.suggestions,
                    miniProjects: suggestions.miniProjects,
                    skillGaps: suggestions.skillGaps,
                    personalizedPath: suggestions.personalizedPath,
                    userId: req.user.id,
                    pathId,
                    progress: {
                        completedCount: userProgress.completedCount,
                        totalSteps: userProgress.totalSteps,
                        completionRate: userProgress.completionRate,
                        remainingSteps: userProgress.remainingSteps.length
                    },
                    generatedAt: new Date().toISOString()
                }
            });
        }
        catch (error) {
            if (error.message === "User not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Path not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "No steps found for this path") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Invalid user or path ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            if (error.message === "Failed to generate AI suggestions") {
                (0, helpers_1.sendErrorResponse)(res, "Unable to generate AI suggestions at this time. Please try again later.", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to generate AI suggestions", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getLearningAnalytics(req, res, next) {
        try {
            if (!req.user) {
                (0, helpers_1.sendErrorResponse)(res, "User not authenticated", constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            const analytics = await ai_service_1.default.getLearningAnalytics(req.user.id);
            (0, helpers_1.sendSuccessResponse)(res, "Learning analytics retrieved successfully", {
                analytics: {
                    ...analytics,
                    userId: req.user.id,
                    generatedAt: new Date().toISOString()
                }
            });
        }
        catch (error) {
            (0, helpers_1.sendErrorResponse)(res, "Failed to get learning analytics", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getRecommendations(req, res, next) {
        try {
            if (!req.user) {
                (0, helpers_1.sendErrorResponse)(res, "User not authenticated", constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            const analytics = await ai_service_1.default.getLearningAnalytics(req.user.id);
            const recommendations = {
                nextSteps: [
                    "Continue with your current learning path",
                    "Consider exploring related topics",
                    "Practice with hands-on projects"
                ],
                studyTips: [
                    "Set aside dedicated study time each day",
                    "Take regular breaks to maintain focus",
                    "Review previously learned concepts periodically"
                ],
                resourceSuggestions: [
                    "Online documentation and tutorials",
                    "Practice coding challenges",
                    "Join developer communities"
                ],
                goals: [
                    "Complete current learning path",
                    "Build a portfolio project",
                    "Contribute to open source projects"
                ]
            };
            (0, helpers_1.sendSuccessResponse)(res, "AI recommendations generated successfully", {
                recommendations: {
                    ...recommendations,
                    analytics: analytics,
                    userId: req.user.id,
                    generatedAt: new Date().toISOString()
                }
            });
        }
        catch (error) {
            (0, helpers_1.sendErrorResponse)(res, "Failed to generate recommendations", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async generateStudyPlan(req, res, next) {
        try {
            if (!req.user) {
                (0, helpers_1.sendErrorResponse)(res, "User not authenticated", constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            const { pathId, targetCompletionDate, dailyHours } = req.body;
            if (!pathId) {
                (0, helpers_1.sendErrorResponse)(res, "Path ID is required", constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            if (!targetCompletionDate) {
                (0, helpers_1.sendErrorResponse)(res, "Target completion date is required", constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            const path = await ai_service_1.default.getLearningAnalytics(req.user.id);
            const studyPlan = {
                pathId,
                targetCompletionDate,
                dailyHours: dailyHours || 2,
                totalDays: 30,
                weeklySchedule: [
                    {
                        week: 1,
                        focus: "Foundations",
                        dailyGoals: ["Review basics", "Practice exercises", "Build simple project"],
                        estimatedHours: 14
                    },
                    {
                        week: 2,
                        focus: "Core Concepts",
                        dailyGoals: ["Deep dive into concepts", "Complete challenges", "Code review"],
                        estimatedHours: 14
                    },
                    {
                        week: 3,
                        focus: "Advanced Topics",
                        dailyGoals: ["Explore advanced features", "Build complex project", "Testing"],
                        estimatedHours: 14
                    },
                    {
                        week: 4,
                        focus: "Final Project",
                        dailyGoals: ["Complete capstone project", "Documentation", "Deployment"],
                        estimatedHours: 14
                    }
                ],
                milestones: [
                    { name: "Foundation Complete", percentage: 25 },
                    { name: "Core Concepts Complete", percentage: 50 },
                    { name: "Advanced Topics Complete", percentage: 75 },
                    { name: "Final Project Complete", percentage: 100 }
                ]
            };
            (0, helpers_1.sendSuccessResponse)(res, "Study plan generated successfully", {
                studyPlan: {
                    ...studyPlan,
                    userId: req.user.id,
                    generatedAt: new Date().toISOString()
                }
            });
        }
        catch (error) {
            (0, helpers_1.sendErrorResponse)(res, "Failed to generate study plan", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.AIController = AIController;
exports.default = AIController;
//# sourceMappingURL=ai.controller.js.map