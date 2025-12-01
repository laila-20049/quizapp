import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  Star, 
  Play, 
  BookOpen, 
  GraduationCap, 
  MapPin,
  BarChart3,
  Lock,
  Unlock,
  Trophy
} from 'lucide-react';

const QuizCard = ({ 
  quiz = {
    id: 1,
    title: "Introduction à la Programmation",
    description: "Quiz couvrant les bases de la programmation en Python",
    subject: "Informatique",
    university: "Université Hassan II",
    faculty: "Faculté des Sciences",
    level: "S1",
    questionsCount: 20,
    duration: 30, // minutes
    participants: 1250,
    difficulty: "medium",
    rating: 4.5,
    isPro: false,
    isCompleted: false,
    bestScore: null,
    tags: ["Python", "Algorithmique", "Bases"]
  },
  onStartQuiz 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Couleurs selon la difficulté
  const difficultyColors = {
    easy: "text-green-600 bg-green-50 border-green-200",
    medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
    hard: "text-red-600 bg-red-50 border-red-200",
    expert: "text-purple-600 bg-purple-50 border-purple-200"
  };

  // Icônes selon la matière
  const subjectIcons = {
    "Informatique": "💻",
    "Mathématiques": "📊",
    "Physique": "⚛️",
    "Économie": "💰",
    "Droit": "⚖️",
    "Philosophie": "🧠",
    "SVT": "🔬",
    "Culture Générale": "🌍"
  };

  const handleStartQuiz = () => {
    if (onStartQuiz) {
      onStartQuiz(quiz.id);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* En-tête avec badge de matière */}
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2"></div>
        
        <div className="absolute top-3 left-3 flex gap-2">
          {/* Badge matière */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            quiz.isPro 
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
              : "bg-white text-gray-700 border border-gray-300"
          }`}>
            {subjectIcons[quiz.subject] || "📚"} {quiz.subject}
            {quiz.isPro && <Star className="h-3 w-3 fill-current" />}
          </span>

          {/* Badge difficulté */}
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${difficultyColors[quiz.difficulty]}`}>
            {quiz.difficulty === 'easy' && 'Facile'}
            {quiz.difficulty === 'medium' && 'Moyen'}
            {quiz.difficulty === 'hard' && 'Difficile'}
            {quiz.difficulty === 'expert' && 'Expert'}
          </span>
        </div>

        {/* Badge complété */}
        {quiz.isCompleted && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            Complété
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="p-5">
        {/* Titre et description */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {quiz.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {quiz.description}
          </p>
        </div>

        {/* Métadonnées */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <GraduationCap className="h-3 w-3" />
            <span className="truncate">{quiz.university}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{quiz.faculty}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>Niveau {quiz.level}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{quiz.duration} min</span>
          </div>
        </div>

        {/* Statistiques */}
        <div className="flex justify-between items-center mb-4 text-xs">
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{quiz.participants.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span>{quiz.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              <span>{quiz.questionsCount} questions</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {quiz.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meilleur score */}
        {quiz.bestScore && (
          <div className="mb-4 p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center text-xs">
              <span className="text-blue-700 font-medium">Votre meilleur score</span>
              <span className="text-blue-900 font-bold">{quiz.bestScore}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-1.5 mt-1">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${quiz.bestScore}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Bouton d'action */}
        <button
          onClick={handleStartQuiz}
          disabled={quiz.isPro && !quiz.isCompleted}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            quiz.isPro && !quiz.isCompleted
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg transform hover:scale-105"
              : quiz.isCompleted
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg"
          } ${isHovered && !quiz.isPro ? 'transform -translate-y-1' : ''}`}
        >
          {quiz.isPro && !quiz.isCompleted ? (
            <>
              <Lock className="h-4 w-4" />
              <span>Quiz Premium</span>
            </>
          ) : quiz.isCompleted ? (
            <>
              <Trophy className="h-4 w-4" />
              <span>Refaire le Quiz</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>Commencer le Quiz</span>
            </>
          )}
        </button>

        {/* Indicateur Premium */}
        {quiz.isPro && (
          <div className="mt-2 text-center">
            <span className="text-xs text-purple-600 flex items-center justify-center gap-1">
              <Unlock className="h-3 w-3" />
              Débloquez avec l'abonnement Premium
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant Grid pour afficher plusieurs QuizCards
export const QuizCardGrid = ({ quizzes, onStartQuiz, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard 
          key={quiz.id} 
          quiz={quiz} 
          onStartQuiz={onStartQuiz}
        />
      ))}
    </div>
  );
};

export default QuizCard;