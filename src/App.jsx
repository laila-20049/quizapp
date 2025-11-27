import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuestionCard from './components/QuestionCard';
import QuestionCardWithImage from './components/QuestionCardWithImage';
import MathQuestionCard from './components/MathQuestionCard';

function App() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      type: 'text',
      question: "Quelle est la capitale du Maroc ?",
      options: ["Casablanca", "Marrakech", "Rabat", "Fès"],
      correctAnswer: "Rabat"
    },
    {
      type: 'image',
      question: "Identifiez cette structure cellulaire :",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400",
      options: ["Mitochondrie", "Noyau", "Chloroplaste", "Réticulum endoplasmique"],
      correctAnswer: "Mitochondrie"
    },
    {
      type: 'math',
      question: "Résolvez l'équation suivante :",
      formula: "x² + 5x + 6 = 0",
      options: ["-2, -3", "2, 3", "-1, -6", "1, 6"],
      correctAnswer: "-2, -3"
    }
  ];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz terminé
      alert(`Quiz terminé ! Votre score : ${score + (isCorrect ? 10 : 0)}/${questions.length * 10}`);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    
    switch (question.type) {
      case 'image':
        return (
          <QuestionCardWithImage
            question={question.question}
            image={question.image}
            options={question.options}
            correctAnswer={question.correctAnswer}
            onAnswer={handleAnswer}
          />
        );
      case 'math':
        return (
          <MathQuestionCard
            question={question.question}
            formula={question.formula}
            options={question.options}
            correctAnswer={question.correctAnswer}
            onAnswer={handleAnswer}
          />
        );
      default:
        return (
          <QuestionCard
            question={question.question}
            options={question.options}
            correctAnswer={question.correctAnswer}
            onAnswer={handleAnswer}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        {/* En-tête du quiz */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Quiz de Culture Générale</h1>
                <p className="text-gray-600">Testez vos connaissances</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-gray-500">points</div>
              </div>
            </div>
            
            {/* Barre de progression */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} sur {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question courante */}
        <div className="max-w-4xl mx-auto px-4">
          {renderQuestion()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;