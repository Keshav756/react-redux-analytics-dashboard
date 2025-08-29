"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAIResponse = exports.validateAIInput = exports.generateMotivationalMessage = exports.calculateProgressPercentage = exports.generateLearningTips = exports.generateTimeEstimates = exports.calculateSkillGaps = exports.analyzeLearningPattern = void 0;
const analyzeLearningPattern = (completionRate, averageTimePerStep, totalSteps, completedSteps) => {
    let type = 'steady';
    let confidence = 0.7;
    let description = '';
    if (completionRate > 75 && averageTimePerStep < 30) {
        type = 'fast';
        confidence = 0.9;
        description = 'Fast learner with quick comprehension and implementation';
    }
    else if (completionRate < 40 || averageTimePerStep > 90) {
        type = 'slow';
        confidence = 0.8;
        description = 'Methodical learner who takes time to absorb concepts';
    }
    else {
        type = 'steady';
        confidence = 0.75;
        description = 'Balanced learner with consistent progress';
    }
    return { type, confidence, description };
};
exports.analyzeLearningPattern = analyzeLearningPattern;
const calculateSkillGaps = (completedSteps, totalSteps, category) => {
    const skillGaps = [];
    if (completedSteps.length < totalSteps * 0.5) {
        skillGaps.push({
            skill: 'Learning Consistency',
            level: 'beginner',
            confidence: 0.8,
            evidence: ['Low completion rate', 'May need motivation support']
        });
    }
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
exports.calculateSkillGaps = calculateSkillGaps;
const generateTimeEstimates = (learningPattern, stepCount) => {
    let baseTimePerStep = 45;
    if (learningPattern.type === 'fast') {
        baseTimePerStep = 30;
    }
    else if (learningPattern.type === 'slow') {
        baseTimePerStep = 75;
    }
    const totalEstimatedTime = stepCount * baseTimePerStep;
    const averageTimePerStep = baseTimePerStep;
    const recommendedDailyTime = Math.min(180, Math.max(60, baseTimePerStep * 2));
    return {
        totalEstimatedTime,
        averageTimePerStep,
        recommendedDailyTime
    };
};
exports.generateTimeEstimates = generateTimeEstimates;
const generateLearningTips = (learningPattern, skillGaps) => {
    const tips = [];
    if (learningPattern.type === 'fast') {
        tips.push('You learn quickly! Try challenging yourself with advanced topics.');
        tips.push('Consider mentoring others who are learning the same topics.');
        tips.push('Experiment with different learning methods to stay engaged.');
    }
    else if (learningPattern.type === 'slow') {
        tips.push('Take your time to fully understand concepts before moving forward.');
        tips.push('Break complex topics into smaller, manageable chunks.');
        tips.push('Consider spaced repetition techniques for better retention.');
    }
    else {
        tips.push('You have a good balance! Keep up the consistent effort.');
        tips.push('Mix different types of learning activities to stay motivated.');
    }
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
    tips.push('Take regular breaks to maintain focus and prevent burnout.');
    tips.push('Apply what you learn through hands-on projects.');
    tips.push('Join learning communities for support and networking.');
    return tips;
};
exports.generateLearningTips = generateLearningTips;
const calculateProgressPercentage = (completedSteps, totalSteps) => {
    if (totalSteps === 0)
        return 0;
    return Math.round((completedSteps / totalSteps) * 100);
};
exports.calculateProgressPercentage = calculateProgressPercentage;
const generateMotivationalMessage = (progressPercentage, learningPattern) => {
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
exports.generateMotivationalMessage = generateMotivationalMessage;
const validateAIInput = (userId, pathId, completedSteps) => {
    const errors = [];
    if (!userId || typeof userId !== 'string') {
        errors.push('Valid user ID is required');
    }
    if (!pathId || typeof pathId !== 'string') {
        errors.push('Valid path ID is required');
    }
    if (!Array.isArray(completedSteps)) {
        errors.push('Completed steps must be an array');
    }
    else {
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
exports.validateAIInput = validateAIInput;
const formatAIResponse = (data, userId, timestamp = new Date()) => {
    return {
        ...data,
        userId,
        generatedAt: timestamp.toISOString(),
        version: '1.0.0'
    };
};
exports.formatAIResponse = formatAIResponse;
//# sourceMappingURL=ai.helpers.js.map