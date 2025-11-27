import React, { useState } from 'react';
import { Check, X, Clock, Award, BookOpen } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  options, 
  correctAnswer, 
  onAnswer,
  showResult = false 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (answer) => {
    if (isSubmitted) return;
    
    setSelectedAnswer(answer);
    setIsSubmitted(true);
    
    // Simuler un délai avant de passer à la question suivante
    setTimeout(() => {
      onAnswer(answer === correctAnswer);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    }, 1500);
  };

  const getOptionStyle = (option) => {
    if (!isSubmitted) {
      return "bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50";
    }
    
    if (option === correctAnswer) {
      return "bg-green-100 border-2 border-green-500 text-green-700";
    }
    
    if (option === selectedAnswer && option !== correctAnswer) {
      return "bg-red-100 border-2 border-red-500 text-red-700";
    }
    
    return "bg-gray-100 border-2 border-gray-200 text-gray-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      
      {/* En-tête de la question */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <BookOpen className="h-5 w-5" />
          <span className="font-medium">Question à choix multiple</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>2:00</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>5 points</span>
          </div>
        </div>
      </div>

      {/* Énoncé de la question */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
          {question}
        </h3>
      </div>

      {/* Options de réponse */}
      <div className="space-y-3 mb-6">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={isSubmitted}
            className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${getOptionStyle(option)} ${
              !isSubmitted ? 'hover:shadow-md cursor-pointer' : 'cursor-default'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
                  !isSubmitted 
                    ? 'border-gray-300 text-gray-600' 
                    : option === correctAnswer 
                      ? 'border-green-500 bg-green-500 text-white'
                      : option === selectedAnswer && option !== correctAnswer
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-300 text-gray-400'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-lg">{option}</span>
              </div>
              
              {isSubmitted && (
                <>
                  {option === correctAnswer && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                  {option === selectedAnswer && option !== correctAnswer && (
                    <X className="h-5 w-5 text-red-600" />
                  )}
                </>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {isSubmitted && (
        <div className={`p-4 rounded-lg ${
          selectedAnswer === correctAnswer 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center gap-3">
            {selectedAnswer === correctAnswer ? (
              <>
                <Check className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">Bonne réponse !</p>
                  <p className="text-green-600 text-sm">Vous avez gagné 5 points</p>
                </div>
              </>
            ) : (
              <>
                <X className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-semibold text-red-800">Mauvaise réponse</p>
                  <p className="text-red-600 text-sm">La bonne réponse était : {correctAnswer}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;