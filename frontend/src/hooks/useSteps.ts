import { useState, useCallback } from 'react';
import type { Step, UserProgress } from '../api/stepApi';
import { stepApi } from '../api/stepApi';

// Hook for managing steps
export function useSteps(pathId?: string) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch steps for a path
  const fetchSteps = useCallback(async (pathIdToFetch: string) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedSteps = await stepApi.getStepsByPath(pathIdToFetch);
      setSteps(fetchedSteps);
      return fetchedSteps;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch steps';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user progress for a path
  const fetchUserProgress = useCallback(async (userId: string, pathIdToFetch: string) => {
    try {
      setLoading(true);
      setError(null);
      const progress = await stepApi.getUserProgress(userId, pathIdToFetch);
      setUserProgress(progress);
      return progress;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch user progress';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark step as completed
  const markStepCompleted = useCallback(async (stepId: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedStep = await stepApi.markStepCompleted(stepId);

      // Update local state
      setSteps(prevSteps =>
        prevSteps.map(step =>
          step.id === stepId ? updatedStep : step
        )
      );

      return updatedStep;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to mark step as completed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark step as incomplete
  const markStepIncomplete = useCallback(async (stepId: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedStep = await stepApi.markStepIncomplete(stepId);

      // Update local state
      setSteps(prevSteps =>
        prevSteps.map(step =>
          step.id === stepId ? updatedStep : step
        )
      );

      return updatedStep;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to mark step as incomplete';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user's completed steps
  const fetchUserCompletedSteps = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const completedSteps = await stepApi.getUserCompletedSteps();
      return completedSteps;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch completed steps';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize steps when pathId changes
  const initializeSteps = useCallback(async () => {
    if (pathId) {
      await fetchSteps(pathId);
    }
  }, [pathId, fetchSteps]);

  return {
    steps,
    userProgress,
    loading,
    error,
    fetchSteps,
    fetchUserProgress,
    markStepCompleted,
    markStepIncomplete,
    fetchUserCompletedSteps,
    initializeSteps,
    setError,
  };
}
