import { useState, useEffect } from 'react';
import { DatabaseAPI } from '../data/database';

export const useDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const withLoading = async (asyncFunction) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFunction();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    loading,
    error,
    
    // Methods
    getQuizzes: (filters) => withLoading(() => DatabaseAPI.getQuizzes(filters)),
    getQuizById: (id) => withLoading(() => DatabaseAPI.getQuizById(id)),
    getUserProgress: (userId) => withLoading(() => DatabaseAPI.getUserProgress(userId)),
    getQuizLeaderboard: (quizId, limit) => withLoading(() => DatabaseAPI.getQuizLeaderboard(quizId, limit)),
    getUserAttempts: (userId, quizId) => withLoading(() => DatabaseAPI.getUserAttempts(userId, quizId)),
    getQuizStatistics: (quizId) => withLoading(() => DatabaseAPI.getQuizStatistics(quizId)),
    searchQuizzes: (query) => withLoading(() => DatabaseAPI.searchQuizzes(query)),
    
    // Clear error
    clearError: () => setError(null)
  };
};