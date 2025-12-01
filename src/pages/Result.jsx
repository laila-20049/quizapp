import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRightCircle, 
  Home, 
  BarChart3,
  Target,
  Clock,
  CalendarDays,
  Award,
  TrendingUp,
  RefreshCw,
  ChevronLeft,
  Share2,
  Download,
  Brain,
  Timer,
  Check,
  X
} from 'lucide-react';

const Result = () => {
  const navigate = useNavigate();
  const {
    results,
    currentAttempt,
    currentQuiz,
    currentQuestions,
    resetQuiz
  } = useQuiz();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  
  const attempt = results || currentAttempt;

  useEffect(() => {
    if (!attempt || (!attempt.answers || attempt.answers.length === 0)) {
      navigate('/quizzes');
    }
  }, [attempt, navigate]);

  if (!attempt || (!attempt.answers || attempt.answers.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Aucun résultat disponible</h2>
          <p className="text-gray-600 mb-6">Il n'y a pas de tentative enregistrée pour ce quiz.</p>
          <Link 
            to="/quizzes" 
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Voir les quiz disponibles
          </Link>
        </div>
      </div>
    );
  }

  const total = attempt.totalQuestions || attempt.answers.length;
  const correct = attempt.correctAnswers ?? attempt.answers.filter(a => a.isCorrect).length;
  const score = attempt.score ?? Math.round((correct / total) * 100);
  const percentage = Math.round((correct / total) * 100);

  const formatTime = (secs) => {
    if (!secs && secs !== 0) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatDateTime = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-50 border-green-200';
    if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getPerformanceEmoji = (percentage) => {
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '👍';
    return '💪';
  };

  const getRecommendations = (percentage) => {
    if (percentage >= 80) {
      return [
        '🎉 Excellent travail ! Votre maîtrise du sujet est exceptionnelle.',
        '🚀 Continuez à explorer des sujets avancés pour aller plus loin.',
        '📈 Essayez des quiz plus difficiles pour vous challenger.'
      ];
    } else if (percentage >= 60) {
      return [
        '✅ Bon résultat ! Vous avez une bonne compréhension des bases.',
        '🔍 Concentrez-vous sur les questions que vous avez ratées.',
        '💪 Pratiquez régulièrement pour améliorer votre score.'
      ];
    } else {
      return [
        '📚 Revenez sur les concepts fondamentaux du sujet.',
        '🧐 Étudiez attentivement les explications des réponses.',
        '🔄 Recommencez ce quiz après avoir révisé.'
      ];
    }
  };

  const handleRetake = () => {
    resetQuiz();
    if (currentQuiz?.id) navigate(`/quiz/${currentQuiz.id}/play`);
    else navigate('/quizzes');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Résultat du quiz: ${currentQuiz?.title || 'Quiz'}`,
        text: `J'ai obtenu ${score}% au quiz "${currentQuiz?.title || 'Quiz'}" !`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const averageTimePerQuestion = attempt.timeSpent ? 
    Math.round(attempt.timeSpent / total) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/quizzes')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Retour aux quiz
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Target className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {currentQuiz?.title || 'Résultat du Quiz'}
                    </h1>
                    {currentQuiz?.category && (
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm mt-2">
                        {currentQuiz.category}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600">
                  {currentQuiz?.description || 'Votre performance détaillée'}
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-end">
                <div className={`text-5xl lg:text-6xl font-black ${getPerformanceColor(percentage)}`}>
                  {score}%
                </div>
                <div className="text-center lg:text-right mt-2">
                  <div className="text-lg font-semibold text-gray-900">
                    {correct} / {total} correct{correct > 1 ? 's' : ''}
                  </div>
                  <div className="text-sm text-gray-500">
                    {getPerformanceEmoji(percentage)} {percentage >= 80 ? 'Excellent' : 
                     percentage >= 60 ? 'Bon' : 'À améliorer'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white rounded-xl shadow-md mb-8">
            <div className="flex flex-wrap border-b">
              <button
                className={`flex-1 min-w-[200px] py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                <div className="flex items-center justify-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Vue d'ensemble
                </div>
              </button>
              <button
                className={`flex-1 min-w-[200px] py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'details'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('details')}
              >
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-5 w-5" />
                  Détails des réponses
                </div>
              </button>
              <button
                className={`flex-1 min-w-[200px] py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'analysis'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('analysis')}
              >
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Analyse
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Score</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {score}%
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Temps total</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatTime(attempt.timeSpent || 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Moyenne: {formatTime(averageTimePerQuestion)} par question
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Réponses</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {correct} / {total}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Check className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: total }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full ${
                        attempt.answers[i]?.isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Date</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatDateTime(attempt.completedAt || new Date())}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <CalendarDays className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Tentative #{attempt.id || '1'}
                </p>
              </div>
            </div>

            {/* Performance Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-600" />
                  Répartition des réponses
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Correctes</span>
                    </div>
                    <div className="text-lg font-semibold">{correct}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">Incorrectes</span>
                    </div>
                    <div className="text-lg font-semibold">{total - correct}</div>
                  </div>
                  <div className="mt-4">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-green-500 h-full"
                        style={{ width: `${(correct / total) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-red-500 h-full"
                        style={{ width: `${((total - correct) / total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Temps par catégorie
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Temps total</span>
                      <span>{formatTime(attempt.timeSpent || 0)}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Par question</span>
                      <span>{formatTime(averageTimePerQuestion)}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${Math.min(averageTimePerQuestion * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setActiveTab('details')}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Award className="h-5 w-5" />
                Voir les détails des réponses
              </button>
              <button
                onClick={handleRetake}
                className="px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Refaire le quiz
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Share2 className="h-5 w-5" />
                Partager
              </button>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-8">
            {/* Questions Navigation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Navigation des questions
              </h3>
              <div className="flex flex-wrap gap-2">
                {attempt.answers.map((answer, idx) => {
                  const isCorrect = answer.isCorrect;
                  const question = currentQuestions?.find(q => q.id === answer.questionId) || {};
                  
                  return (
                    <button
                      key={answer.questionId || idx}
                      onClick={() => setSelectedQuestion(idx)}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center font-medium transition-all relative ${
                        selectedQuestion === idx
                          ? 'ring-2 ring-indigo-500 ring-offset-2 scale-105'
                          : 'hover:scale-105'
                      } ${
                        isCorrect
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                      title={question.question?.substring(0, 50) || `Question ${idx + 1}`}
                    >
                      {idx + 1}
                      <div className="absolute -top-1 -right-1">
                        {isCorrect ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <X className="h-3 w-3 text-red-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Question Detail */}
            {currentQuestions && currentQuestions[selectedQuestion] && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${attempt.answers[selectedQuestion]?.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                      {attempt.answers[selectedQuestion]?.isCorrect ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Question {selectedQuestion + 1}
                      </h3>
                      <div className={`text-sm font-medium ${attempt.answers[selectedQuestion]?.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {attempt.answers[selectedQuestion]?.isCorrect ? 'Correcte' : 'Incorrecte'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      {attempt.answers[selectedQuestion]?.timeSpent || 0}s
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {currentQuestions[selectedQuestion].question}
                  </h4>
                  
                  <div className="space-y-3">
                    {currentQuestions[selectedQuestion].options?.map((option, idx) => {
                      const isCorrect = idx === currentQuestions[selectedQuestion].correctAnswer;
                      const isUserAnswer = idx === attempt.answers[selectedQuestion]?.selectedAnswer;
                      
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isCorrect
                              ? 'border-green-500 bg-green-50'
                              : isUserAnswer && !isCorrect
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                                isCorrect
                                  ? 'bg-green-500 text-white'
                                  : isUserAnswer && !isCorrect
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-200 text-gray-700'
                              }`}>
                                {String.fromCharCode(65 + idx)}
                              </div>
                              <span className="text-gray-800">{option}</span>
                            </div>
                            
                            <div className="flex gap-2">
                              {isCorrect && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                  Bonne réponse
                                </span>
                              )}
                              {isUserAnswer && !isCorrect && (
                                <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                                  Votre réponse
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {currentQuestions[selectedQuestion].explanation && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-indigo-600">💡</span>
                      Explication
                    </h4>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <p className="text-gray-700">
                        {currentQuestions[selectedQuestion].explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-4 justify-between">
              <button
                onClick={() => setActiveTab('overview')}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="h-5 w-5" />
                Retour à la vue d'ensemble
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={handleRetake}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  Refaire le quiz
                </button>
                <Link
                  to="/quizzes"
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Home className="h-5 w-5" />
                  Tous les quiz
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-8">
            {/* Performance Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Analyse de performance
              </h3>
              
              <div className={`p-6 rounded-xl border ${getPerformanceBgColor(percentage)} mb-6`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="text-4xl">{getPerformanceEmoji(percentage)}</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {percentage >= 80 ? 'Performance exceptionnelle !' : 
                       percentage >= 60 ? 'Bonne performance !' : 'Des progrès à faire !'}
                    </h4>
                    <ul className="space-y-2">
                      {getRecommendations(percentage).map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="h-2 w-2 rounded-full bg-current mt-2"></div>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Points forts</h4>
                  <div className="space-y-2">
                    {attempt.answers.filter(a => a.isCorrect).slice(0, 3).map((answer, idx) => {
                      const question = currentQuestions?.find(q => q.id === answer.questionId);
                      return (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">
                            {question?.question?.substring(0, 40) || `Question ${idx + 1}`}...
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">À améliorer</h4>
                  <div className="space-y-2">
                    {attempt.answers.filter(a => !a.isCorrect).slice(0, 3).map((answer, idx) => {
                      const question = currentQuestions?.find(q => q.id === answer.questionId);
                      return (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                          <X className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-700">
                            {question?.question?.substring(0, 40) || `Question ${idx + 1}`}...
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{percentage}%</div>
                <div className="text-gray-600">Taux de réussite</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{averageTimePerQuestion}s</div>
                <div className="text-gray-600">Temps moyen par question</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {attempt.answers.filter(a => a.isCorrect).length}
                </div>
                <div className="text-gray-600">Suite de réponses correctes la plus longue</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleRetake}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <ArrowRightCircle className="h-5 w-5" />
                Refaire le quiz maintenant
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-2"
              >
                <Share2 className="h-5 w-5" />
                Partager mes résultats
              </button>
              <Link
                to="/quizzes"
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Home className="h-5 w-5" />
                Découvrir d'autres quiz
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;