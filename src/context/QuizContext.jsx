import React, { createContext, useContext, useReducer, useEffect } from 'react';

// États du quiz
export const QuizState = {
  IDLE: 'idle',
  LOADING: 'loading',
  READY: 'ready',
  IN_PROGRESS: 'in_progress',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  REVIEW: 'review'
};

// Types d'actions
export const QuizActionTypes = {
  // Chargement des données
  SET_LOADING: 'SET_LOADING',
  SET_QUIZZES: 'SET_QUIZZES',
  SET_CURRENT_QUIZ: 'SET_CURRENT_QUIZ',
  SET_QUESTIONS: 'SET_QUESTIONS',
  
  // Gestion du quiz en cours
  START_QUIZ: 'START_QUIZ',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  NEXT_QUESTION: 'NEXT_QUESTION',
  PREVIOUS_QUESTION: 'PREVIOUS_QUESTION',
  PAUSE_QUIZ: 'PAUSE_QUIZ',
  RESUME_QUIZ: 'RESUME_QUIZ',
  COMPLETE_QUIZ: 'COMPLETE_QUIZ',
  RESET_QUIZ: 'RESET_QUIZ',
  
  // Timer et progression
  UPDATE_TIMER: 'UPDATE_TIMER',
  SET_TIME_SPENT: 'SET_TIME_SPENT',
  
  // Résultats et statistiques
  SET_RESULTS: 'SET_RESULTS',
  SAVE_ATTEMPT: 'SAVE_ATTEMPT',
  UPDATE_LEADERBOARD: 'UPDATE_LEADERBOARD',
  
  // Filtres et recherche
  SET_FILTERS: 'SET_FILTERS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  
  // Gestion des erreurs
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// State initial
const initialState = {
  // État général
  status: QuizState.IDLE,
  loading: false,
  error: null,
  
  // Liste des quizzes
  quizzes: [],
  filteredQuizzes: [],
  
  // Quiz en cours
  currentQuiz: null,
  currentQuestions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  quizStartTime: null,
  timeSpent: 0,
  quizTimer: null,
  
  // Tentative en cours
  currentAttempt: {
    id: null,
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    status: 'not_started',
    answers: []
  },
  
  // Résultats
  results: null,
  userAttempts: [],
  leaderboard: [],
  
  // Filtres et recherche
  filters: {
    university: null,
    faculty: null,
    subject: null,
    level: null,
    difficulty: null,
    isPro: null
  },
  searchQuery: '',
  
  // Statistiques
  statistics: {
    totalQuizzesTaken: 0,
    averageScore: 0,
    totalTimeSpent: 0,
    bestScore: 0,
    quizzesCompleted: 0
  }
};

// Reducer
const quizReducer = (state, action) => {
  switch (action.type) {
    // === CHARGEMENT DES DONNÉES ===
    case QuizActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case QuizActionTypes.SET_QUIZZES:
      return {
        ...state,
        quizzes: action.payload,
        filteredQuizzes: action.payload,
        loading: false
      };

    case QuizActionTypes.SET_CURRENT_QUIZ:
      return {
        ...state,
        currentQuiz: action.payload,
        loading: false
      };

    case QuizActionTypes.SET_QUESTIONS:
      return {
        ...state,
        currentQuestions: action.payload,
        loading: false
      };

    // === GESTION DU QUIZ EN COURS ===
    case QuizActionTypes.START_QUIZ:
      const startTime = new Date().toISOString();
      return {
        ...state,
        status: QuizState.IN_PROGRESS,
        currentQuestionIndex: 0,
        userAnswers: [],
        quizStartTime: startTime,
        timeSpent: 0,
        currentAttempt: {
          id: `attempt_${Date.now()}`,
          score: 0,
          correctAnswers: 0,
          totalQuestions: action.payload.questions.length,
          status: 'in_progress',
          answers: [],
          startTime: startTime
        }
      };

    case QuizActionTypes.ANSWER_QUESTION:
      const { questionId, selectedAnswer, isCorrect, timeSpent } = action.payload;
      const newUserAnswers = [...state.userAnswers];
      const newAttemptAnswers = [...state.currentAttempt.answers];
      
      // Mettre à jour ou ajouter la réponse
      const existingAnswerIndex = newUserAnswers.findIndex(
        answer => answer.questionId === questionId
      );
      
      const answerData = {
        questionId,
        selectedAnswer,
        isCorrect,
        timeSpent,
        answeredAt: new Date().toISOString()
      };
      
      if (existingAnswerIndex >= 0) {
        newUserAnswers[existingAnswerIndex] = answerData;
        newAttemptAnswers[existingAnswerIndex] = answerData;
      } else {
        newUserAnswers.push(answerData);
        newAttemptAnswers.push(answerData);
      }
      
      // Calculer le score
      const correctAnswers = newUserAnswers.filter(answer => answer.isCorrect).length;
      const score = state.currentQuestions.length > 0 
        ? Math.round((correctAnswers / state.currentQuestions.length) * 100)
        : 0;
      
      return {
        ...state,
        userAnswers: newUserAnswers,
        currentAttempt: {
          ...state.currentAttempt,
          answers: newAttemptAnswers,
          correctAnswers,
          score
        }
      };

    case QuizActionTypes.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.currentQuestions.length - 1
        )
      };

    case QuizActionTypes.PREVIOUS_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
      };

    case QuizActionTypes.PAUSE_QUIZ:
      return {
        ...state,
        status: QuizState.PAUSED,
        quizTimer: null
      };

    case QuizActionTypes.RESUME_QUIZ:
      return {
        ...state,
        status: QuizState.IN_PROGRESS
      };

    case QuizActionTypes.COMPLETE_QUIZ:
      const completionTime = new Date().toISOString();
      return {
        ...state,
        status: QuizState.COMPLETED,
        currentAttempt: {
          ...state.currentAttempt,
          status: 'completed',
          endTime: completionTime,
          timeSpent: state.timeSpent
        }
      };

    case QuizActionTypes.RESET_QUIZ:
      return {
        ...state,
        status: QuizState.READY,
        currentQuestionIndex: 0,
        userAnswers: [],
        timeSpent: 0,
        currentAttempt: initialState.currentAttempt
      };

    // === TIMER ET PROGRESSION ===
    case QuizActionTypes.UPDATE_TIMER:
      return {
        ...state,
        timeSpent: state.timeSpent + 1
      };

    case QuizActionTypes.SET_TIME_SPENT:
      return {
        ...state,
        timeSpent: action.payload
      };

    // === RÉSULTATS ET STATISTIQUES ===
    case QuizActionTypes.SET_RESULTS:
      return {
        ...state,
        results: action.payload,
        status: QuizState.REVIEW
      };

    case QuizActionTypes.SAVE_ATTEMPT:
      const newAttempts = [...state.userAttempts, action.payload];
      return {
        ...state,
        userAttempts: newAttempts
      };

    case QuizActionTypes.UPDATE_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload
      };

    // === FILTRES ET RECHERCHE ===
    case QuizActionTypes.SET_FILTERS:
      const newFilters = { ...state.filters, ...action.payload };
      return {
        ...state,
        filters: newFilters
      };

    case QuizActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };

    // === GESTION DES ERREURS ===
    case QuizActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case QuizActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Création du contexte
const QuizContext = createContext();

// Hook personnalisé
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

// Provider component
export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Actions
  const actions = {
    // Chargement des données
    setLoading: (loading) => 
      dispatch({ type: QuizActionTypes.SET_LOADING, payload: loading }),

    setQuizzes: (quizzes) => 
      dispatch({ type: QuizActionTypes.SET_QUIZZES, payload: quizzes }),

    setCurrentQuiz: (quiz) => 
      dispatch({ type: QuizActionTypes.SET_CURRENT_QUIZ, payload: quiz }),

    setQuestions: (questions) => 
      dispatch({ type: QuizActionTypes.SET_QUESTIONS, payload: questions }),

    // Gestion du quiz
    startQuiz: (quizData) => 
      dispatch({ type: QuizActionTypes.START_QUIZ, payload: quizData }),

    answerQuestion: (answerData) => 
      dispatch({ type: QuizActionTypes.ANSWER_QUESTION, payload: answerData }),

    nextQuestion: () => 
      dispatch({ type: QuizActionTypes.NEXT_QUESTION }),

    previousQuestion: () => 
      dispatch({ type: QuizActionTypes.PREVIOUS_QUESTION }),

    pauseQuiz: () => 
      dispatch({ type: QuizActionTypes.PAUSE_QUIZ }),

    resumeQuiz: () => 
      dispatch({ type: QuizActionTypes.RESUME_QUIZ }),

    completeQuiz: () => 
      dispatch({ type: QuizActionTypes.COMPLETE_QUIZ }),

    resetQuiz: () => 
      dispatch({ type: QuizActionTypes.RESET_QUIZ }),

    // Timer
    updateTimer: () => 
      dispatch({ type: QuizActionTypes.UPDATE_TIMER }),

    setTimeSpent: (time) => 
      dispatch({ type: QuizActionTypes.SET_TIME_SPENT, payload: time }),

    // Résultats
    setResults: (results) => 
      dispatch({ type: QuizActionTypes.SET_RESULTS, payload: results }),

    saveAttempt: (attempt) => 
      dispatch({ type: QuizActionTypes.SAVE_ATTEMPT, payload: attempt }),

    updateLeaderboard: (leaderboard) => 
      dispatch({ type: QuizActionTypes.UPDATE_LEADERBOARD, payload: leaderboard }),

    // Filtres
    setFilters: (filters) => 
      dispatch({ type: QuizActionTypes.SET_FILTERS, payload: filters }),

    setSearchQuery: (query) => 
      dispatch({ type: QuizActionTypes.SET_SEARCH_QUERY, payload: query }),

    // Erreurs
    setError: (error) => 
      dispatch({ type: QuizActionTypes.SET_ERROR, payload: error }),

    clearError: () => 
      dispatch({ type: QuizActionTypes.CLEAR_ERROR })
  };

  // Effets pour filtrer les quizzes
  useEffect(() => {
    const filterQuizzes = () => {
      let filtered = state.quizzes;

      // Filtre par recherche
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(quiz =>
          quiz.title.toLowerCase().includes(query) ||
          quiz.description.toLowerCase().includes(query) ||
          quiz.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      // Filtres par critères
      if (state.filters.university) {
        filtered = filtered.filter(quiz => quiz.universityId === state.filters.university);
      }

      if (state.filters.faculty) {
        filtered = filtered.filter(quiz => quiz.facultyId === state.filters.faculty);
      }

      if (state.filters.subject) {
        filtered = filtered.filter(quiz => quiz.subjectId === state.filters.subject);
      }

      if (state.filters.level) {
        filtered = filtered.filter(quiz => quiz.level === state.filters.level);
      }

      if (state.filters.difficulty) {
        filtered = filtered.filter(quiz => quiz.difficulty === state.filters.difficulty);
      }

      if (state.filters.isPro !== null) {
        filtered = filtered.filter(quiz => quiz.isPro === state.filters.isPro);
      }

      dispatch({ type: QuizActionTypes.SET_QUIZZES, payload: filtered });
    };

    filterQuizzes();
  }, [state.filters, state.searchQuery, state.quizzes]);

  // Timer automatique
  useEffect(() => {
    let timer;
    
    if (state.status === QuizState.IN_PROGRESS) {
      timer = setInterval(() => {
        actions.updateTimer();
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state.status]);

  // Calcul des statistiques
  useEffect(() => {
    if (state.userAttempts.length > 0) {
      const totalQuizzesTaken = state.userAttempts.length;
      const averageScore = state.userAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalQuizzesTaken;
      const totalTimeSpent = state.userAttempts.reduce((sum, attempt) => sum + (attempt.timeSpent || 0), 0);
      const bestScore = Math.max(...state.userAttempts.map(attempt => attempt.score));
      const quizzesCompleted = state.userAttempts.filter(attempt => attempt.status === 'completed').length;

      // Mettre à jour les statistiques (dans un vrai app, on aurait une action dédiée)
    }
  }, [state.userAttempts]);

  // Valeur du contexte
  const contextValue = {
    // State
    ...state,
    
    // Getters utiles
    currentQuestion: state.currentQuestions[state.currentQuestionIndex] || null,
    totalQuestions: state.currentQuestions.length,
    progress: state.currentQuestions.length > 0 
      ? ((state.currentQuestionIndex + 1) / state.currentQuestions.length) * 100 
      : 0,
    isLastQuestion: state.currentQuestionIndex === state.currentQuestions.length - 1,
    isFirstQuestion: state.currentQuestionIndex === 0,
    answeredQuestions: state.userAnswers.length,
    
    // Actions
    ...actions,

    // Méthodes composites
    loadQuiz: async (quizId) => {
      try {
        actions.setLoading(true);
        
        // Simulation de chargement - remplacer par API réelle
        const quiz = await mockLoadQuizAPI(quizId);
        const questions = await mockLoadQuestionsAPI(quizId);
        
        actions.setCurrentQuiz(quiz);
        actions.setQuestions(questions);
        actions.setError(null);
        
        return { success: true, quiz, questions };
      } catch (error) {
        actions.setError(error.message);
        return { success: false, error: error.message };
      }
    },

    submitQuiz: async () => {
      try {
        actions.setLoading(true);
        
        // Préparer les données de tentative
        const attemptData = {
          ...state.currentAttempt,
          completedAt: new Date().toISOString()
        };

        // Simulation de sauvegarde - remplacer par API réelle
        await mockSaveAttemptAPI(attemptData);
        
        actions.saveAttempt(attemptData);
        actions.setResults(attemptData);
        actions.completeQuiz();
        
        return { success: true, results: attemptData };
      } catch (error) {
        actions.setError(error.message);
        return { success: false, error: error.message };
      }
    },

    // Méthodes de navigation améliorées
    goToQuestion: (index) => {
      if (index >= 0 && index < state.currentQuestions.length) {
        dispatch({ 
          type: QuizActionTypes.SET_CURRENT_QUESTION, 
          payload: index 
        });
      }
    },

    // Méthodes de gestion du temps
    getFormattedTime: () => {
      const minutes = Math.floor(state.timeSpent / 60);
      const seconds = state.timeSpent % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },

    getRemainingTime: (totalTime) => {
      return Math.max(0, totalTime - state.timeSpent);
    },

    // Méthodes de vérification
    isQuestionAnswered: (questionId) => {
      return state.userAnswers.some(answer => answer.questionId === questionId);
    },

    getUserAnswer: (questionId) => {
      return state.userAnswers.find(answer => answer.questionId === questionId);
    }
  };

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};

// Mock APIs - À remplacer par vos vraies APIs
const mockLoadQuizAPI = async (quizId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulation de données de quiz
  return {
    id: quizId,
    title: "Quiz de Démonstration",
    description: "Ceci est un quiz de démonstration",
    questionsCount: 5,
    duration: 30,
    difficulty: "intermediate"
  };
};

const mockLoadQuestionsAPI = async (quizId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: 1,
      question: "Quelle est la capitale du Maroc ?",
      options: ["Casablanca", "Marrakech", "Rabat", "Fès"],
      correctAnswer: 2,
      explanation: "Rabat est la capitale administrative du Maroc.",
      points: 1
    },
    {
      id: 2,
      question: "Quel langage est utilisé pour le style des pages web ?",
      options: ["HTML", "CSS", "JavaScript", "Python"],
      correctAnswer: 1,
      explanation: "CSS (Cascading Style Sheets) est utilisé pour le style.",
      points: 1
    }
  ];
};

const mockSaveAttemptAPI = async (attemptData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log('Attempt saved:', attemptData);
  return { success: true };
};

export default QuizContext;