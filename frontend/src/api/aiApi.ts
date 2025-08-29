import { api } from './apiClient';

// Types for AI API
export interface AISuggestionInput {
  pathId: string;
}

export interface AISuggestion {
  nextStep: string | null;
  suggestions: string[];
  miniProjects: string[];
  skillGaps: string[];
  personalizedPath: Array<{
    stepId: string;
    name: string;
    order: number;
    priority: 'high' | 'medium' | 'low';
    estimatedTime: string;
  }>;
}

export interface AIResponse {
  suggestions: AISuggestion & {
    userId: string;
    pathId: string;
    progress: {
      completedCount: number;
      totalSteps: number;
      completionRate: number;
      remainingSteps: number;
    };
    generatedAt: string;
  };
}

export interface LearningAnalytics {
  totalPaths: number;
  completedSteps: number;
  averageCompletionRate: number;
  learningStreak: number;
  favoriteCategories: string[];
  recentActivity: Array<{
    pathTitle: string;
    stepName: string;
    completedAt: string;
  }>;
  userId: string;
  generatedAt: string;
}

export interface AIRecommendation {
  nextSteps: string[];
  studyTips: string[];
  resourceSuggestions: string[];
  goals: string[];
  analytics: LearningAnalytics;
  userId: string;
  generatedAt: string;
}

export interface StudyPlanInput {
  pathId: string;
  targetCompletionDate: string;
  dailyHours: number;
}

export interface StudyPlan {
  pathId: string;
  targetCompletionDate: string;
  dailyHours: number;
  totalDays: number;
  weeklySchedule: Array<{
    week: number;
    focus: string;
    dailyGoals: string[];
    estimatedHours: number;
  }>;
  milestones: Array<{
    name: string;
    percentage: number;
  }>;
  userId: string;
  generatedAt: string;
}

// AI API methods
export const aiApi = {
  // Generate AI suggestions for user learning path
  generateSuggestions: async (input: AISuggestionInput): Promise<AIResponse> => {
    const response = await api.post<AIResponse>('/ai/suggest', input);
    return response.data;
  },

  // Get learning analytics for authenticated user
  getLearningAnalytics: async (): Promise<LearningAnalytics> => {
    const response = await api.get<LearningAnalytics>('/ai/analytics');
    return response.data;
  },

  // Get AI-powered learning recommendations
  getRecommendations: async (): Promise<AIRecommendation> => {
    const response = await api.get<AIRecommendation>('/ai/recommendations');
    return response.data;
  },

  // Generate personalized study plan
  generateStudyPlan: async (input: StudyPlanInput): Promise<StudyPlan> => {
    const response = await api.post<StudyPlan>('/ai/study-plan', input);
    return response.data;
  },
};

export default aiApi;
