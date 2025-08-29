export interface LearningPattern {
    type: 'fast' | 'steady' | 'slow';
    confidence: number;
    description: string;
}
export interface SkillAssessment {
    skill: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    confidence: number;
    evidence: string[];
}
export declare const analyzeLearningPattern: (completionRate: number, averageTimePerStep: number, totalSteps: number, completedSteps: number) => LearningPattern;
export declare const calculateSkillGaps: (completedSteps: string[], totalSteps: number, category: string) => SkillAssessment[];
export declare const generateTimeEstimates: (learningPattern: LearningPattern, stepCount: number) => {
    totalEstimatedTime: number;
    averageTimePerStep: number;
    recommendedDailyTime: number;
};
export declare const generateLearningTips: (learningPattern: LearningPattern, skillGaps: SkillAssessment[]) => string[];
export declare const calculateProgressPercentage: (completedSteps: number, totalSteps: number) => number;
export declare const generateMotivationalMessage: (progressPercentage: number, learningPattern: LearningPattern) => string;
export declare const validateAIInput: (userId: string, pathId: string, completedSteps: string[]) => {
    isValid: boolean;
    errors: string[];
};
export declare const formatAIResponse: (data: any, userId: string, timestamp?: Date) => any;
//# sourceMappingURL=ai.helpers.d.ts.map