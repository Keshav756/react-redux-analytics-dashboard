"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const step_model_1 = __importDefault(require("../models/step.model"));
const path_model_1 = __importDefault(require("../models/path.model"));
const user_service_1 = __importDefault(require("./user.service"));
class AIService {
    static async generateSuggestions(input) {
        try {
            const { userId, pathId, completedSteps } = input;
            const user = await user_service_1.default.findById(userId);
            if (!user) {
                const error = new Error("User not found");
                error.statusCode = 404;
                throw error;
            }
            const path = await path_model_1.default.findById(pathId).populate({
                path: "steps",
                populate: {
                    path: "completedBy",
                    select: "name email",
                },
                options: { sort: { order: 1 } },
            });
            if (!path) {
                const error = new Error("Path not found");
                error.statusCode = 404;
                throw error;
            }
            const progressAnalysis = await this.analyzeUserProgress(userId, pathId, completedSteps);
            const skillGaps = await this.analyzeSkillGaps(progressAnalysis, path);
            const suggestions = await this.generatePersonalizedSuggestions(progressAnalysis, skillGaps);
            const miniProjects = await this.generateMiniProjects(progressAnalysis, skillGaps);
            const personalizedPath = await this.createPersonalizedPath(path, completedSteps, progressAnalysis);
            return {
                nextStep: personalizedPath.length > 0 ? personalizedPath[0].name : null,
                suggestions,
                miniProjects: miniProjects.map((p) => p.title),
                skillGaps: skillGaps.missingSkills,
                personalizedPath,
            };
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            const customError = new Error("Failed to generate AI suggestions");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async analyzeUserProgress(userId, pathId, completedSteps) {
        try {
            const steps = await step_model_1.default.find({ path: pathId }).sort({ order: 1 });
            const totalSteps = steps.length;
            const completedCount = completedSteps.length;
            const completionRate = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;
            let learningPattern = "steady";
            if (completionRate > 70) {
                learningPattern = "fast";
            }
            else if (completionRate < 30) {
                learningPattern = "slow";
            }
            const strengths = [];
            const weaknesses = [];
            if (completionRate > 50) {
                strengths.push("Good progress rate");
            }
            else {
                weaknesses.push("Needs to maintain consistent progress");
            }
            return {
                completedCount,
                totalSteps,
                completionRate,
                averageTimePerStep: 45,
                learningPattern,
                strengths,
                weaknesses,
            };
        }
        catch (error) {
            throw new Error("Failed to analyze user progress");
        }
    }
    static async analyzeSkillGaps(progressAnalysis, path) {
        try {
            const missingSkills = [];
            const recommendedSteps = [];
            if (progressAnalysis.completionRate < 50) {
                missingSkills.push("Consistent learning habits");
                recommendedSteps.push("Review foundational concepts");
            }
            if (progressAnalysis.learningPattern === "slow") {
                missingSkills.push("Time management skills");
                recommendedSteps.push("Break down complex topics into smaller tasks");
            }
            if (path.category === "web-development" &&
                progressAnalysis.completionRate < 60) {
                missingSkills.push("HTML/CSS fundamentals");
                recommendedSteps.push("Complete basic web development projects");
            }
            const difficulty = progressAnalysis.completionRate < 30
                ? "beginner"
                : progressAnalysis.completionRate < 70
                    ? "intermediate"
                    : "advanced";
            const estimatedCompletionTime = difficulty === "beginner"
                ? "2-3 weeks"
                : difficulty === "intermediate"
                    ? "1-2 weeks"
                    : "3-5 days";
            return {
                missingSkills,
                recommendedSteps,
                difficulty,
                estimatedCompletionTime,
            };
        }
        catch (error) {
            throw new Error("Failed to analyze skill gaps");
        }
    }
    static async generatePersonalizedSuggestions(progressAnalysis, skillGaps) {
        try {
            const suggestions = [];
            if (progressAnalysis.learningPattern === "fast") {
                suggestions.push("You're progressing quickly! Consider taking on more challenging projects.");
                suggestions.push("Share your knowledge with others in the community.");
            }
            else if (progressAnalysis.learningPattern === "slow") {
                suggestions.push("Take breaks between learning sessions to avoid burnout.");
                suggestions.push("Consider pairing with a study buddy for motivation.");
            }
            skillGaps.missingSkills.forEach((skill) => {
                suggestions.push(`Focus on improving your ${skill.toLowerCase()}.`);
            });
            suggestions.push("Practice regularly with small, consistent sessions.");
            suggestions.push("Apply what you learn by building real projects.");
            suggestions.push("Join online communities for support and networking.");
            return suggestions;
        }
        catch (error) {
            throw new Error("Failed to generate personalized suggestions");
        }
    }
    static async generateMiniProjects(progressAnalysis, skillGaps) {
        try {
            const projects = [];
            if (skillGaps.missingSkills.includes("HTML/CSS fundamentals")) {
                projects.push({
                    title: "Personal Portfolio Website",
                    description: "Create a responsive portfolio website showcasing your projects",
                    skills: ["HTML", "CSS", "Responsive Design"],
                    difficulty: "medium",
                    estimatedTime: "1 week",
                    resources: [
                        "https://developer.mozilla.org/en-US/docs/Web/HTML",
                        "https://developer.mozilla.org/en-US/docs/Web/CSS",
                    ],
                });
            }
            if (skillGaps.missingSkills.includes("Time management skills")) {
                projects.push({
                    title: "Learning Tracker App",
                    description: "Build an app to track your learning progress and time management",
                    skills: ["JavaScript", "Local Storage", "Time Management"],
                    difficulty: "hard",
                    estimatedTime: "2 weeks",
                    resources: [
                        "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
                        "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
                    ],
                });
            }
            if (progressAnalysis.completionRate > 50) {
                projects.push({
                    title: "Code Review Tool",
                    description: "Create a tool to help review and improve code quality",
                    skills: ["Code Analysis", "Best Practices", "Feedback"],
                    difficulty: "hard",
                    estimatedTime: "3 weeks",
                    resources: ["https://github.com/", "https://stackoverflow.com/"],
                });
            }
            return projects;
        }
        catch (error) {
            throw new Error("Failed to generate mini-projects");
        }
    }
    static async createPersonalizedPath(path, completedSteps, progressAnalysis) {
        try {
            const personalizedPath = [];
            const remainingSteps = path.steps.filter((step) => !completedSteps.includes(step._id.toString()));
            remainingSteps.forEach((step, index) => {
                let priority = "medium";
                let estimatedTime = "45 minutes";
                if (progressAnalysis.learningPattern === "fast" && index < 2) {
                    priority = "high";
                    estimatedTime = "30 minutes";
                }
                else if (progressAnalysis.learningPattern === "slow" && index < 1) {
                    priority = "high";
                    estimatedTime = "60 minutes";
                }
                personalizedPath.push({
                    stepId: step._id.toString(),
                    name: step.name,
                    order: step.order,
                    priority,
                    estimatedTime,
                });
            });
            personalizedPath.sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                }
                return a.order - b.order;
            });
            return personalizedPath;
        }
        catch (error) {
            throw new Error("Failed to create personalized path");
        }
    }
    static async getLearningAnalytics(userId) {
        try {
            const completedSteps = await step_model_1.default.find({ completedBy: userId })
                .populate("path", "title category")
                .sort({ updatedAt: -1 });
            const totalPaths = new Set(completedSteps.map((step) => step.path._id.toString())).size;
            const completedCount = completedSteps.length;
            const categoryCount = {};
            completedSteps.forEach((step) => {
                const category = step.path.category;
                categoryCount[category] = (categoryCount[category] || 0) + 1;
            });
            const favoriteCategories = Object.entries(categoryCount)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([category]) => category);
            const recentActivity = completedSteps.slice(0, 10).map((step) => ({
                pathTitle: step.path.title,
                stepName: step.name,
                completedAt: step.updatedAt,
            }));
            return {
                totalPaths,
                completedSteps: completedCount,
                averageCompletionRate: 75,
                learningStreak: 5,
                favoriteCategories,
                recentActivity,
            };
        }
        catch (error) {
            const customError = new Error("Failed to get learning analytics");
            customError.statusCode = 500;
            throw customError;
        }
    }
}
exports.AIService = AIService;
exports.default = AIService;
//# sourceMappingURL=ai.service.js.map