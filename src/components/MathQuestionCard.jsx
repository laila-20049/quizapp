import React, { useState } from 'react';
import { Calculator, Clock, Award, Check, X } from 'lucide-react';

const MathQuestionCard = ({ 
  question, 
  formula, 
  options, 
  correctAnswer, 
  onAnswer 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (answer) => {
    if (isSubmitted) return;
    
    setSelectedAnswer(answer);
    setIsSubmitted(true);
    
    setTimeout(() => {
      onAnswer(answer === correctAnswer);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      
      {/* En-tête spécial mathématiques */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-purple-600">
          <Calculator className="h-5 w-5" />
          <span className="font-medium">Mathématiques</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>3:00</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>10 points</span>
          </div>
        </div>
      </div>

      {/* Question et formule */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {question}
        </h3>
        {formula && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-center text-xl font-mono text-gray-700">
              {formula}
            </div>
          </div>
        )}
      </div>

      {/* Options numériques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={isSubmitted}
            className={`p-4 rounded-lg text-center font-mono text-lg transition-all ${
              !isSubmitted
                ? 'bg-white border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md cursor-pointer'
                : option === correctAnswer
                  ? 'bg-green-100 border-2 border-green-500 text-green-700'
                  : option === selectedAnswer && option !== correctAnswer
                    ? 'bg-red-100 border-2 border-red-500 text-red-700'
                    : 'bg-gray-100 border-2 border-gray-200 text-gray-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Feedback détaillé pour les maths */}
      {isSubmitted && (
        <div className={`p-4 rounded-lg ${
          selectedAnswer === correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start gap-3">
            {selectedAnswer === correctAnswer ? (
              <Check className="h-6 w-6 text-green-600 mt-0.5" />
            ) : (
              <X className="h-6 w-6 text-red-600 mt-0.5" />
            )}
            <div>
              <p className={`font-semibold ${
                selectedAnswer === correctAnswer ? 'text-green-800' : 'text-red-800'
              }`}>
                {selectedAnswer === correctAnswer ? 'Excellent !' : 'Presque !'}
              </p>
              <p className={`text-sm mt-1 ${
                selectedAnswer === correctAnswer ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedAnswer === correctAnswer 
                  ? 'Votre raisonnement est correct.' 
                  : `La réponse correcte est ${correctAnswer}. Revoyez le calcul.`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathQuestionCard;