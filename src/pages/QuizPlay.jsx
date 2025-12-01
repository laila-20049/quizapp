import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  Users,
  BarChart3,
  Settings,
  Maximize2,
  Minimize2,
  X,
  Check,
  FastForward,
  RefreshCw
} from 'lucide-react';

const QuizPlay = () => {
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
    isQuestionAnswered,
    getUserAnswer,
    getFormattedTime
  } = useQuiz();
  const { user } = useAuth();

  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [quizDuration] = useState(currentQuiz?.duration || 30); // en minutes
  const [timeLeft, setTimeLeft] = useState(quizDuration * 60);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const timerRef = useRef(null);
  const containerRef = useRef(null);

  // Charger le quiz
  useEffect(() => {
    if (id) {
      loadQuiz(id);
    }
  }, [id, loadQuiz]);

  // Gérer le timer
  useEffect(() => {
    if (status === 'in_progress' && !isPaused && quizStarted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status, isPaused, quizStarted]);

  // Gérer le plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

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
    setQuizStarted(true);
    setTimeLeft(quizDuration * 60);
  };

  const handleAnswer = (optionIndex) => {
    if (isQuestionAnswered(currentQuestion?.id) || !currentQuestion) return;
    
    setSelectedOption(optionIndex);
    
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    answerQuestion({
      questionId: currentQuestion.id,
      selectedAnswer: optionIndex,
      isCorrect,
      timeSpent: Math.floor((quizDuration * 60 - timeLeft) / totalQuestions)
    });

    // Son de feedback
    if (soundEnabled) {
      const audio = new Audio(
        isCorrect 
          ? 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3'
          : 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'
      );
      audio.volume = 0.3;
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

  const handleSkip = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    nextQuestion();
  };

  const togglePause = () => {
    if (isPaused) {
      resumeQuiz();
      setIsPaused(false);
    } else {
      pauseQuiz();
      setIsPaused(true);
    }
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const toggleBookmark = (questionId) => {
    setBookmarkedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSubmit = () => {
    submitQuiz();
    navigate(`/quiz/${id}/results`);
  };

  const handleReset = () => {
    resetQuiz();
    setQuizStarted(false);
    setTimeLeft(quizDuration * 60);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const calculateProgress = () => {
    return totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
  };

  const calculateScore = () => {
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    return totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  };

  const getQuestionStatus = (questionIndex) => {
    if (questionIndex < currentQuestionIndex) {
      const answer = userAnswers[questionIndex];
      return answer?.isCorrect ? 'correct' : 'incorrect';
    }
    if (questionIndex === currentQuestionIndex) return 'current';
    return 'pending';
  };

  const getOptionStyle = (optionIndex) => {
    if (!currentQuestion || !isQuestionAnswered(currentQuestion.id)) {
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
          <Link to="/quizzes" className="btn-primary">
            Retour aux quiz
          </Link>
        </div>
      </div>
    );
  }

  // Écran d'introduction
  if (!quizStarted && status !== 'in_progress') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12" ref={containerRef}>
        <div className="max-w-4xl mx-auto px-4">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              to={`/quiz/${id}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5" />
              Retour aux détails
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md"
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
              <button className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Carte de préparation */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
            {/* Bannière */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Prêt à jouer ?</h1>
              <p className="text-blue-100">Vérifiez les règles et paramètres avant de commencer</p>
            </div>

            <div className="p-8">
              {/* Informations rapides */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{totalQuestions}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{quizDuration}</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {currentQuiz?.difficulty === 'beginner' ? '★' : 
                     currentQuiz?.difficulty === 'intermediate' ? '★★' : 
                     currentQuiz?.difficulty === 'advanced' ? '★★★' : '★★★★'}
                  </div>
                  <div className="text-sm text-gray-600">Difficulté</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900 mb-1">100</div>
                  <div className="text-sm text-gray-600">Points max</div>
                </div>
              </div>

              {/* Règles */}
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Règles importantes
                </h3>
                <ul className="space-y-3 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Le quiz est limité à {quizDuration} minutes
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Vous pouvez naviguer entre les questions
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Les réponses ne peuvent pas être modifiées après soumission
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Utilisez les boutons "Marquer" et "Signaler" si nécessaire
                  </li>
                </ul>
              </div>

              {/* Paramètres */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Paramètres</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={soundEnabled}
                      onChange={() => setSoundEnabled(!soundEnabled)}
                      className="h-5 w-5 text-blue-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Sons de feedback</div>
                      <div className="text-sm text-gray-600">Activer les sons de validation</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 text-blue-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Plein écran automatique</div>
                      <div className="text-sm text-gray-600">Passer en plein écran au démarrage</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStartQuiz}
                  className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Play className="h-6 w-6" />
                  Commencer le quiz
                  <Zap className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                
                <button
                  onClick={() => navigate(`/quiz/${id}`)}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Retour aux détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz en cours
  return (
    <div className="min-h-screen bg-gray-50" ref={containerRef}>
      {/* Barre supérieure */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Informations du quiz */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Quitter</span>
              </button>
              <div className="hidden md:block">
                <h2 className="font-semibold text-gray-900 truncate max-w-xs">
                  {currentQuiz?.title}
                </h2>
                <div className="text-xs text-gray-500">
                  Question {currentQuestionIndex + 1} sur {totalQuestions}
                </div>
              </div>
            </div>

            {/* Timer et score */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold text-gray-900">{calculateScore()}%</span>
              </div>
              
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <Timer className="h-4 w-4" />
                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePause}
                className="p-2 rounded-lg hover:bg-gray-100"
                title={isPaused ? 'Reprendre' : 'Pause'}
              >
                {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </button>
              
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg hover:bg-gray-100"
                title={soundEnabled ? 'Couper le son' : 'Activer le son'}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-gray-100"
                title={fullscreen ? 'Quitter le plein écran' : 'Plein écran'}
              >
                {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progression</span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
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
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded capitalize">
                    {currentQuestion?.difficulty || 'Moyenne'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Recommandé: 2 min</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => currentQuestion && toggleBookmark(currentQuestion.id)}
                className={`p-2 rounded-lg ${
                  currentQuestion && bookmarkedQuestions.includes(currentQuestion.id)
                    ? 'bg-yellow-50 text-yellow-600'
                    : 'bg-gray-100 text-gray-400 hover:text-yellow-500 hover:bg-gray-200'
                }`}
                title="Marquer la question"
              >
                <Bookmark className={`h-5 w-5 ${currentQuestion && bookmarkedQuestions.includes(currentQuestion.id) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => currentQuestion && toggleFlag(currentQuestion.id)}
                className={`p-2 rounded-lg ${
                  currentQuestion && flaggedQuestions.includes(currentQuestion.id)
                    ? 'bg-red-50 text-red-600'
                    : 'bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-gray-200'
                }`}
                title="Signaler la question"
              >
                <Flag className="h-5 w-5" />
              </button>
              <button
                onClick={handleSkip}
                className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:text-blue-500 hover:bg-gray-200"
                title="Passer la question"
              >
                <FastForward className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Texte de la question */}
          <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion?.question}
          </h3>

          {/* Options de réponse */}
          <div className="space-y-3 mb-6">
            {currentQuestion?.options?.map((option, index) => {
              const isAnswered = currentQuestion && isQuestionAnswered(currentQuestion.id);
              const userAnswer = currentQuestion && getUserAnswer(currentQuestion.id);
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
          {showExplanation && currentQuestion?.explanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 animate-fadeIn">
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
              Recommencer
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Navigation rapide */}
            <div className="hidden md:flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalQuestions) }).map((_, index) => {
                const questionIndex = Math.max(0, Math.min(totalQuestions - 5, currentQuestionIndex - 2)) + index;
                const status = getQuestionStatus(questionIndex);
                
                return (
                  <button
                    key={questionIndex}
                    onClick={() => {
                      // À implémenter: navigation vers une question spécifique
                    }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                      status === 'current' ? 'bg-blue-500 text-white' :
                      status === 'correct' ? 'bg-green-100 text-green-700' :
                      status === 'incorrect' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {questionIndex + 1}
                  </button>
                );
              })}
              {totalQuestions > 5 && (
                <span className="text-gray-400 px-2">...</span>
              )}
            </div>

            {currentQuestionIndex === totalQuestions - 1 ? (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Check className="h-5 w-5" />
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

        {/* Statistiques rapides */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Statistiques du quiz</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-gray-900">{userAnswers.length}</div>
              <div className="text-sm text-gray-600">Répondues</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-gray-900">{totalQuestions - userAnswers.length}</div>
              <div className="text-sm text-gray-600">Restantes</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-gray-900">
                {userAnswers.filter(a => a.isCorrect).length}
              </div>
              <div className="text-sm text-gray-600">Correctes</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-gray-900">{calculateScore()}%</div>
              <div className="text-sm text-gray-600">Score actuel</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <AlertCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {currentQuestionIndex === totalQuestions - 1 ? 'Terminer le quiz ?' : 'Quitter le quiz ?'}
              </h3>
              <p className="text-gray-600">
                {currentQuestionIndex === totalQuestions - 1 
                  ? 'Vous êtes sur le point de soumettre vos réponses. Voulez-vous continuer ?'
                  : 'Votre progression sera sauvegardée. Vous pourrez reprendre plus tard.'}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Questions répondues:</span>
                <span className="font-semibold">{userAnswers.length}/{totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Temps écoulé:</span>
                <span className="font-semibold">{getFormattedTime()}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Score actuel:</span>
                <span className="font-semibold text-green-600">{calculateScore()}%</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={currentQuestionIndex === totalQuestions - 1 ? handleSubmit : () => {
                  setShowConfirmModal(false);
                  navigate(`/quiz/${id}`);
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700"
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Soumettre' : 'Quitter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPlay;