import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Timer,
  Trophy,
  Star,
  BookOpen,
  BarChart3,
  Target,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Award,
  AlertCircle,
  Volume2,
  VolumeX,
  RotateCcw,
  Flag,
  Share2,
  Bookmark,
  Zap,
  Home,
  Users
} from 'lucide-react';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentQuiz, 
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    userAnswers,
    timeSpent,
    status,
    loading,
    error,
    loadQuiz,
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    pauseQuiz,
    resumeQuiz,
    submitQuiz,
    resetQuiz,
    getFormattedTime,
    getRemainingTime,
    isQuestionAnswered,
    getUserAnswer
  } = useQuiz();
  const { user } = useAuth();

  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [quizDuration] = useState(currentQuiz?.duration || 30); // en minutes
  const [timeLeft, setTimeLeft] = useState(quizDuration * 60);

  // Charger le quiz
  useEffect(() => {
    if (id) {
      loadQuiz(id);
    }
  }, [id, loadQuiz]);

  // Initialiser le timer
  useEffect(() => {
    if (status === 'in_progress' && !isPaused) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, isPaused]);

  // Formatter le temps
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    submitQuiz();
    navigate(`/quiz/${id}/results`);
  };

  const handleStartQuiz = () => {
    startQuiz(currentQuiz);
  };

  const handleAnswer = (optionIndex) => {
    if (isQuestionAnswered(currentQuestion.id)) return;
    
    setSelectedOption(optionIndex);
    
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    answerQuestion({
      questionId: currentQuestion.id,
      selectedAnswer: optionIndex,
      isCorrect,
      timeSpent: 0 // À calculer
    });

    // Son de feedback
    if (soundEnabled) {
      const audio = new Audio(
        isCorrect 
          ? 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3'
          : 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'
      );
      audio.play();
    }

    // Afficher l'explication après un délai
    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    nextQuestion();
  };

  const handlePrevious = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    previousQuestion();
  };

  const togglePause = () => {
    if (isPaused) {
      resumeQuiz();
    } else {
      pauseQuiz();
    }
    setIsPaused(!isPaused);
  };

  const toggleBookmark = (questionId) => {
    setBookmarkedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSubmit = () => {
    submitQuiz();
    navigate(`/quiz/${id}/results`);
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / totalQuestions) * 100;
  };

  const getQuestionStatus = (questionId) => {
    const answer = getUserAnswer(questionId);
    if (answer) {
      return answer.isCorrect ? 'correct' : 'incorrect';
    }
    return 'unanswered';
  };

  const getOptionStyle = (optionIndex) => {
    if (!isQuestionAnswered(currentQuestion.id)) {
      return "bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50";
    }
    
    const userAnswer = getUserAnswer(currentQuestion.id);
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const isSelected = userAnswer?.selectedAnswer === optionIndex;
    
    if (isCorrect) {
      return "bg-green-100 border-2 border-green-500 text-green-700";
    }
    
    if (isSelected && !isCorrect) {
      return "bg-red-100 border-2 border-red-500 text-red-700";
    }
    
    return "bg-gray-100 border-2 border-gray-200 text-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <div className="text-gray-600">Chargement du quiz...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/quizzes')}
            className="btn-primary"
          >
            Retour aux quiz
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <div className="text-gray-600">Quiz non trouvé</div>
        </div>
      </div>
    );
  }

  // Écran d'introduction
  if (status === 'idle' || status === 'ready') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/quizzes')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5" />
              Retour
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md"
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
              <button className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Carte du quiz */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
            {/* En-tête avec image */}
            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="h-20 w-20 text-white opacity-20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                <h1 className="text-3xl font-bold text-white">{currentQuiz.title}</h1>
                <p className="text-blue-100">{currentQuiz.description}</p>
              </div>
            </div>

            {/* Informations détaillées */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Détails du quiz
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Questions</span>
                      <span className="font-semibold">{totalQuestions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temps</span>
                      <span className="font-semibold">{quizDuration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulté</span>
                      <span className="font-semibold capitalize">{currentQuiz.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                    Statistiques
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Participants</span>
                      <span className="font-semibold">{currentQuiz.participants?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Score moyen</span>
                      <span className="font-semibold">{currentQuiz.avgScore || 0}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taux de réussite</span>
                      <span className="font-semibold">{currentQuiz.successRate || 0}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Votre progression
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Score actuel</span>
                      <span className="font-semibold">--</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Classement</span>
                      <span className="font-semibold">--</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tentatives</span>
                      <span className="font-semibold">0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Instructions importantes
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Le quiz a une durée limitée de {quizDuration} minutes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Vous pouvez naviguer entre les questions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Vous ne pouvez pas modifier une réponse une fois soumise
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Le score est calculé en fonction des bonnes réponses
                  </li>
                </ul>
              </div>

              {/* Bouton de démarrage */}
              <div className="text-center">
                <button
                  onClick={handleStartQuiz}
                  className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  <Play className="h-6 w-6" />
                  Commencer le quiz
                  <Zap className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <p className="text-gray-500 text-sm mt-4">
                  Prêt à tester vos connaissances ?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz en cours
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre supérieure */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Informations du quiz */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/quiz/${id}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Retour</span>
              </button>
              <div className="hidden md:block">
                <h2 className="font-semibold text-gray-900 truncate max-w-xs">
                  {currentQuiz.title}
                </h2>
                <div className="text-xs text-gray-500">
                  Question {currentQuestionIndex + 1} sur {totalQuestions}
                </div>
              </div>
            </div>

            {/* Timer et actions */}
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <Timer className="h-4 w-4" />
                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>

              <button
                onClick={togglePause}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progression</span>
            <span>{Math.round(calculateProgress())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">Début</span>
            <span className="text-xs text-gray-500">Fin</span>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          {/* En-tête de la question */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white font-bold">
                {currentQuestionIndex + 1}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">Question</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {currentQuestion.difficulty || 'Moyenne'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Temps recommandé: 2 min</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(currentQuestion.id)}
                className={`p-2 rounded-lg ${
                  bookmarkedQuestions.includes(currentQuestion.id)
                    ? 'bg-yellow-50 text-yellow-600'
                    : 'bg-gray-100 text-gray-400 hover:text-yellow-500 hover:bg-gray-200'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${bookmarkedQuestions.includes(currentQuestion.id) ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200">
                <Flag className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Texte de la question */}
          <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h3>

          {/* Image si disponible */}
          {currentQuestion.image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src={currentQuestion.image} 
                alt="Illustration"
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* Options de réponse */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isAnswered = isQuestionAnswered(currentQuestion.id);
              const userAnswer = getUserAnswer(currentQuestion.id);
              const isCorrect = index === currentQuestion.correctAnswer;
              const isSelected = userAnswer?.selectedAnswer === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    getOptionStyle(index)
                  } ${!isAnswered ? 'hover:shadow-md cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        !isAnswered 
                          ? 'border-gray-300 text-gray-600' 
                          : isCorrect
                            ? 'border-green-500 bg-green-500 text-white'
                            : isSelected && !isCorrect
                              ? 'border-red-500 bg-red-500 text-white'
                              : 'border-gray-300 text-gray-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                    
                    {isAnswered && (
                      <>
                        {isCorrect && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                        {isSelected && !isCorrect && (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explication */}
          {showExplanation && currentQuestion.explanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-blue-900 mb-1">Explication</div>
                  <div className="text-blue-700 text-sm">{currentQuestion.explanation}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <SkipBack className="h-4 w-4" />
              Précédent
            </button>

            <button
              onClick={() => resetQuiz()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4" />
              Recommencer
            </button>
          </div>

          <div className="flex items-center gap-3">
            {currentQuestionIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Terminer le quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Suivant
                <SkipForward className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation rapide */}
        <div className="mt-12">
          <h4 className="font-semibold text-gray-900 mb-4">Navigation rapide</h4>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
            {Array.from({ length: totalQuestions }).map((_, index) => {
              const status = getQuestionStatus(index);
              return (
                <button
                  key={index}
                  onClick={() => {
                    // Naviguer vers la question
                    // À implémenter
                  }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500 text-white ring-2 ring-blue-200'
                      : status === 'correct'
                      ? 'bg-green-100 text-green-700'
                      : status === 'incorrect'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;