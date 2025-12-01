import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Play, Pause, SkipBack, SkipForward, CheckCircle2 } from 'lucide-react';

const QuizRunner = ({ quizId }) => {
  const {
    status,
    currentQuiz,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    timeSpent,
    userAnswers,
    loadQuiz,
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    pauseQuiz,
    resumeQuiz,
    submitQuiz,
    isQuestionAnswered,
    getUserAnswer,
    getFormattedTime
  } = useQuiz();

  useEffect(() => {
    loadQuiz(quizId);
  }, [quizId]);

  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    answerQuestion({
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent: 0 // À calculer par question
    });
  };

  const handleStart = () => {
    startQuiz({
      questions: currentQuiz.questions,
      duration: currentQuiz.duration
    });
  };

  if (status === 'loading') {
    return <div className="text-center py-8">Chargement du quiz...</div>;
  }

  if (status === 'idle' || status === 'ready') {
    return (
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">{currentQuiz?.title}</h1>
        <p className="text-gray-600 mb-6">{currentQuiz?.description}</p>
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Play className="inline w-5 h-5 mr-2" />
          Commencer le Quiz
        </button>
      </div>
    );
  }

  if (status === 'in_progress' || status === 'paused') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{currentQuiz?.title}</h1>
            <p className="text-gray-600">
              Question {currentQuestionIndex + 1} sur {totalQuestions}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">{getFormattedTime()}</div>
            <div className="text-sm text-gray-500">Temps écoulé</div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {currentQuestion?.question}
          </h2>

          {/* Options de réponse */}
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => {
              const userAnswer = getUserAnswer(currentQuestion.id);
              const isSelected = userAnswer?.selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isQuestionAnswered(currentQuestion.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                  } ${
                    isQuestionAnswered(currentQuestion.id) && isCorrect
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
          >
            <SkipBack className="w-4 h-4" />
            Précédent
          </button>

          {status === 'in_progress' ? (
            <button
              onClick={pauseQuiz}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white"
            >
              <Pause className="w-4 h-4" />
              Pause
            </button>
          ) : (
            <button
              onClick={resumeQuiz}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white"
            >
              <Play className="w-4 h-4" />
              Reprendre
            </button>
          )}

          {currentQuestionIndex === totalQuestions - 1 ? (
            <button
              onClick={submitQuiz}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white"
            >
              Terminer le Quiz
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300"
            >
              Suivant
              <SkipForward className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return <div>État non géré: {status}</div>;
};

export default QuizRunner;