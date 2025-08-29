import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AIResponse, LearningAnalytics, AIRecommendation, StudyPlan } from '../api/aiApi';

// AI context interface
interface AIContextType {
  currentSuggestions: AIResponse | null;
  analytics: LearningAnalytics | null;
  recommendations: AIRecommendation | null;
  studyPlan: StudyPlan | null;
  isLoading: boolean;
  error: string | null;
  setCurrentSuggestions: (suggestions: AIResponse | null) => void;
  setAnalytics: (analytics: LearningAnalytics | null) => void;
  setRecommendations: (recommendations: AIRecommendation | null) => void;
  setStudyPlan: (studyPlan: StudyPlan | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAll: () => void;
}

// Create context
const AIContext = createContext<AIContextType | undefined>(undefined);

// AI provider props
interface AIProviderProps {
  children: ReactNode;
}

// AI provider component
export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [currentSuggestions, setCurrentSuggestions] = useState<AIResponse | null>(null);
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendation | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear all AI data
  const clearAll = (): void => {
    setCurrentSuggestions(null);
    setAnalytics(null);
    setRecommendations(null);
    setStudyPlan(null);
    setError(null);
  };

  // Context value
  const value: AIContextType = {
    currentSuggestions,
    analytics,
    recommendations,
    studyPlan,
    isLoading,
    error,
    setCurrentSuggestions,
    setAnalytics,
    setRecommendations,
    setStudyPlan,
    setIsLoading,
    setError,
    clearAll,
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
};

// Custom hook to use AI context
export const useAI = (): AIContextType => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export default AIContext;
