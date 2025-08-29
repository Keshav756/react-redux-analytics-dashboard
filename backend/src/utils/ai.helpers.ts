/**
 * AI Helper Functions
 * Utility functions for AI processing and data manipulation
 */

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

/**
 * Analyze learning pattern based on completion data
 */
export const analyzeLearningPattern = (
  completionRate: number,
  averageTimePerStep: number,
  totalSteps: number,
  completedSteps: number
): LearningPattern => {
  let type: 'fast' | 'steady' | 'slow' = 'steady';
  let confidence = 0.7;
  let description = '';

  if (completionRate > 75 && averageTimePerStep < 30) {
    type = 'fast';
    confidence = 0.9;
    description = 'Fast learner with quick comprehension and implementation';
  } else if (completionRate < 40 || averageTimePerStep > 90) {
    type = 'slow';
    confidence = 0.8;
    description = 'Methodical learner who takes time to absorb concepts';
  } else {
    type = 'steady';
    confidence = 0.75;
    description = 'Balanced learner with consistent progress';
  }

  return { type, confidence, description };
};

/**
 * Calculate skill gaps based on user performance
 */
export const calculateSkillGaps = (
  completedSteps: string[],
  totalSteps: number,
  category: string
): SkillAssessment[] => {
  const skillGaps: SkillAssessment[] = [];

  // Basic skill assessment based on completion patterns
  if (completedSteps.length < totalSteps * 0.5) {
    skillGaps.push({
      skill: 'Learning Consistency',
      level: 'beginner',
      confidence: 0.8,
      evidence: ['Low completion rate', 'May need motivation support']
    });
  }

  // Category-specific skill gaps
  if (category === 'web-development' && completedSteps.length < totalSteps * 0.6) {
    skillGaps.push({
      skill: 'Web Development Fundamentals',
      level: 'beginner',
      confidence: 0.7,
      evidence: ['Struggling with basic concepts', 'May need additional resources']
    });
  }

  if (category === 'data-science' && completedSteps.length < totalSteps * 0.4) {
    skillGaps.push({
      skill: 'Data Analysis',
      level: 'intermediate',
      confidence: 0.6,
      evidence: ['Complex mathematical concepts', 'May need prerequisite knowledge']
    });
  }

  return skillGaps;
};

/**
 * Generate time estimates based on learning pattern
 */
export const generateTimeEstimates = (
  learningPattern: LearningPattern,
  stepCount: number
): {
  totalEstimatedTime: number;
  averageTimePerStep: number;
  recommendedDailyTime: number;
} => {
  let baseTimePerStep = 45; // minutes

  // Adjust based on learning pattern
  if (learningPattern.type === 'fast') {
    baseTimePerStep = 30;
  } else if (learningPattern.type === 'slow') {
    baseTimePerStep = 75;
  }

  const totalEstimatedTime = stepCount * baseTimePerStep;
  const averageTimePerStep = baseTimePerStep;
  const recommendedDailyTime = Math.min(180, Math.max(60, baseTimePerStep * 2)); // 1-3 hours daily

  return {
    totalEstimatedTime,
    averageTimePerStep,
    recommendedDailyTime
  };
};

/**
 * Generate personalized learning tips
 */
export const generateLearningTips = (
  learningPattern: LearningPattern,
  skillGaps: SkillAssessment[]
): string[] => {
  const tips: string[] = [];

  // Pattern-based tips
  if (learningPattern.type === 'fast') {
    tips.push('You learn quickly! Try challenging yourself with advanced topics.');
    tips.push('Consider mentoring others who are learning the same topics.');
    tips.push('Experiment with different learning methods to stay engaged.');
  } else if (learningPattern.type === 'slow') {
    tips.push('Take your time to fully understand concepts before moving forward.');
    tips.push('Break complex topics into smaller, manageable chunks.');
    tips.push('Consider spaced repetition techniques for better retention.');
  } else {
    tips.push('You have a good balance! Keep up the consistent effort.');
    tips.push('Mix different types of learning activities to stay motivated.');
  }

  // Skill gap-based tips
  skillGaps.forEach(gap => {
    if (gap.skill === 'Learning Consistency') {
      tips.push('Set small daily goals to build momentum and consistency.');
      tips.push('Track your progress visually to stay motivated.');
    }
    if (gap.skill.includes('Fundamentals')) {
      tips.push('Focus on building strong foundations before advancing.');
      tips.push('Practice basic concepts repeatedly until they become second nature.');
    }
  });

  // General tips
  tips.push('Take regular breaks to maintain focus and prevent burnout.');
  tips.push('Apply what you learn through hands-on projects.');
  tips.push('Join learning communities for support and networking.');

  return tips;
};

/**
 * Calculate learning progress percentage
 */
export const calculateProgressPercentage = (
  completedSteps: number,
  totalSteps: number
): number => {
  if (totalSteps === 0) return 0;
  return Math.round((completedSteps / totalSteps) * 100);
};

/**
 * Generate motivational messages based on progress
 */
export const generateMotivationalMessage = (
  progressPercentage: number,
  learningPattern: LearningPattern
): string => {
  if (progressPercentage === 100) {
    return "🎉 Congratulations! You've completed this learning path. Keep up the great work!";
  }

  if (progressPercentage >= 75) {
    return "🚀 You're almost there! Keep pushing forward to reach your goal!";
  }

  if (progressPercentage >= 50) {
    return "💪 You're making excellent progress! Stay focused and keep learning!";
  }

  if (progressPercentage >= 25) {
    return "📈 Great start! You're building momentum. Keep up the good work!";
  }

  if (learningPattern.type === 'fast') {
    return "⚡ You're a quick learner! Take advantage of your natural ability and keep accelerating!";
  }

  return "🌟 Every expert was once a beginner. You're on the right path - keep learning!";
};

/**
 * Validate AI input parameters
 */
export const validateAIInput = (
  userId: string,
  pathId: string,
  completedSteps: string[]
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!userId || typeof userId !== 'string') {
    errors.push('Valid user ID is required');
  }

  if (!pathId || typeof pathId !== 'string') {
    errors.push('Valid path ID is required');
  }

  if (!Array.isArray(completedSteps)) {
    errors.push('Completed steps must be an array');
  } else {
    completedSteps.forEach((step, index) => {
      if (typeof step !== 'string') {
        errors.push(`Completed step at index ${index} must be a string`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format AI response for consistency
 */
export const formatAIResponse = (
  data: any,
  userId: string,
  timestamp: Date = new Date()
) => {
  return {
    ...data,
    userId,
    generatedAt: timestamp.toISOString(),
    version: '1.0.0'
  };
};
