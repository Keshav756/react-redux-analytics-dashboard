export interface AISuggestionInput {
    userId: string;
    pathId: string;
    completedSteps: string[];
}
export interface AISuggestionOutput {
    nextStep: string | null;
    suggestions: string[];
    miniProjects: string[];
    skillGaps: string[];
    personalizedPath: Array<{
        stepId: string;
        name: string;
        order: number;
        priority: "high" | "medium" | "low";
        estimatedTime: string;
    }>;
}
export interface SkillGapAnalysis {
    missingSkills: string[];
    recommendedSteps: string[];
    difficulty: "beginner" | "intermediate" | "advanced";
    estimatedCompletionTime: string;
}
export interface MiniProject {
    title: string;
    description: string;
    skills: string[];
    difficulty: "easy" | "medium" | "hard";
    estimatedTime: string;
    resources: string[];
}
export declare class AIService {
    static generateSuggestions(input: AISuggestionInput): Promise<AISuggestionOutput>;
    private static analyzeUserProgress;
    private static analyzeSkillGaps;
    private static generatePersonalizedSuggestions;
    private static generateMiniProjects;
    private static createPersonalizedPath;
    static getLearningAnalytics(userId: string): Promise<{
        totalPaths: number;
        completedSteps: number;
        averageCompletionRate: number;
        learningStreak: number;
        favoriteCategories: string[];
        recentActivity: Array<{
            pathTitle: string;
            stepName: string;
            completedAt: Date;
        }>;
    }>;
}
export default AIService;
//# sourceMappingURL=ai.service.d.ts.map