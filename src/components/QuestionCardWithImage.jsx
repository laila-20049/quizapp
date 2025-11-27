import React, { useState } from 'react';
import { Check, X, Clock, Award, Image as ImageIcon } from 'lucide-react';

const QuestionCardWithImage = ({ 
  question, 
  image, 
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
    }, 1500);
  };

  const getOptionStyle = (option) => {
    if (!isSubmitted) {
      return "bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50";
    }
    
    if (option === correctAnswer) {
      return "bg-green-100 border-2 border-green-500";
    }
    
    if (option === selectedAnswer && option !== correctAnswer) {
      return "bg-red-100 border-2 border-red-500";
    }
    
    return "bg-gray-100 border-2 border-gray-200";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
      
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src={image} 
          alt="Question illustration" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Illustration
        </div>
      </div>

      <div className="p-6">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Question avec image
          </span>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>1:30</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>3 points</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {question}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isSubmitted}
              className={`p-4 rounded-lg text-left transition-all ${getOptionStyle(option)} ${
                !isSubmitted ? 'hover:shadow-md cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
                  !isSubmitted 
                    ? 'border-gray-300' 
                    : option === correctAnswer 
                      ? 'border-green-500 bg-green-500 text-white'
                      : option === selectedAnswer && option !== correctAnswer
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {isSubmitted && (
          <div className={`mt-4 p-3 rounded-lg ${
            selectedAnswer === correctAnswer ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <div className="flex items-center gap-2">
              {selectedAnswer === correctAnswer ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-green-800 font-medium">Correct !</span>
                </>
              ) : (
                <>
                  <X className="h-5 w-5 text-red-600" />
                  <span className="text-red-800 font-medium">Incorrect. Réponse : {correctAnswer}</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCardWithImage;