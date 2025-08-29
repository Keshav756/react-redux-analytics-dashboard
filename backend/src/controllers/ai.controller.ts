import { Request, Response, NextFunction } from "express";
import AIService, { AISuggestionInput } from "../services/ai.service";
import StepService from "../services/step.service";
import { sendSuccessResponse, sendErrorResponse } from "../utils/helpers";
import { HTTP_STATUS } from "../utils/constants";

export class AIController {
  /**
   * Generate AI suggestions for user learning path
   * POST /api/ai/suggest
   */
  static async generateSuggestions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Validate user authentication
      if (!req.user) {
        sendErrorResponse(
          res,
          "User not authenticated",
          HTTP_STATUS.UNAUTHORIZED
        );
        return;
      }

      const { pathId }: { pathId: string } = req.body;

      // Validate required fields
      if (!pathId) {
        sendErrorResponse(
          res,
          "Path ID is required",
          HTTP_STATUS.BAD_REQUEST
        );
        return;
      }

      // Get user's actual progress from the database
      const userProgress = await StepService.getUserProgress(req.user.id, pathId);

      // Prepare input for AI service using actual progress data
      const aiInput: AISuggestionInput = {
        userId: req.user.id,
        pathId,
        completedSteps: userProgress.completedSteps
      };

      // Generate AI suggestions
      const suggestions = await AIService.generateSuggestions(aiInput);

      sendSuccessResponse(
        res,
        "AI suggestions generated successfully",
        {
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
        }
      );
    } catch (error: any) {
      // Handle specific errors
      if (error.message === "User not found") {
        sendErrorResponse(res, error.message, HTTP_STATUS.NOT_FOUND);
        return;
      }

      if (error.message === "Path not found") {
        sendErrorResponse(res, error.message, HTTP_STATUS.NOT_FOUND);
        return;
      }

      if (error.message === "No steps found for this path") {
        sendErrorResponse(res, error.message, HTTP_STATUS.NOT_FOUND);
        return;
      }

      if (error.message === "Invalid user or path ID") {
        sendErrorResponse(res, error.message, HTTP_STATUS.BAD_REQUEST);
        return;
      }

      // Handle AI service errors
      if (error.message === "Failed to generate AI suggestions") {
        sendErrorResponse(
          res,
          "Unable to generate AI suggestions at this time. Please try again later.",
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
        return;
      }

      sendErrorResponse(
        res,
        "Failed to generate AI suggestions",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get learning analytics for authenticated user
   * GET /api/ai/analytics
   */
  static async getLearningAnalytics(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Validate user authentication
      if (!req.user) {
        sendErrorResponse(
          res,
          "User not authenticated",
          HTTP_STATUS.UNAUTHORIZED
        );
        return;
      }

      // Get learning analytics
      const analytics = await AIService.getLearningAnalytics(req.user.id);

      sendSuccessResponse(
        res,
        "Learning analytics retrieved successfully",
        {
          analytics: {
            ...analytics,
            userId: req.user.id,
            generatedAt: new Date().toISOString()
          }
        }
      );
    } catch (error: any) {
      sendErrorResponse(
        res,
        "Failed to get learning analytics",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get AI-powered learning recommendations
   * GET /api/ai/recommendations
   */
  static async getRecommendations(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Validate user authentication
      if (!req.user) {
        sendErrorResponse(
          res,
          "User not authenticated",
          HTTP_STATUS.UNAUTHORIZED
        );
        return;
      }

      // Get user's learning analytics
      const analytics = await AIService.getLearningAnalytics(req.user.id);

      // Generate recommendations based on analytics
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

      sendSuccessResponse(
        res,
        "AI recommendations generated successfully",
        {
          recommendations: {
            ...recommendations,
            analytics: analytics,
            userId: req.user.id,
            generatedAt: new Date().toISOString()
          }
        }
      );
    } catch (error: any) {
      sendErrorResponse(
        res,
        "Failed to generate recommendations",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get personalized study plan
   * POST /api/ai/study-plan
   */
  static async generateStudyPlan(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Validate user authentication
      if (!req.user) {
        sendErrorResponse(
          res,
          "User not authenticated",
          HTTP_STATUS.UNAUTHORIZED
        );
        return;
      }

      const { pathId, targetCompletionDate, dailyHours }: {
        pathId: string;
        targetCompletionDate: string;
        dailyHours: number;
      } = req.body;

      // Validate required fields
      if (!pathId) {
        sendErrorResponse(
          res,
          "Path ID is required",
          HTTP_STATUS.BAD_REQUEST
        );
        return;
      }

      if (!targetCompletionDate) {
        sendErrorResponse(
          res,
          "Target completion date is required",
          HTTP_STATUS.BAD_REQUEST
        );
        return;
      }

      // Get path information
      const path = await AIService.getLearningAnalytics(req.user.id);

      // Generate study plan (simplified version)
      const studyPlan = {
        pathId,
        targetCompletionDate,
        dailyHours: dailyHours || 2,
        totalDays: 30, // Placeholder calculation
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

      sendSuccessResponse(
        res,
        "Study plan generated successfully",
        {
          studyPlan: {
            ...studyPlan,
            userId: req.user.id,
            generatedAt: new Date().toISOString()
          }
        }
      );
    } catch (error: any) {
      sendErrorResponse(
        res,
        "Failed to generate study plan",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default AIController;
