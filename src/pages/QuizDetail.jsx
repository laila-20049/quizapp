import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { 
  Play, 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Trophy, 
  Award,
  BarChart3,
  ChevronLeft,
  Share2,
  Bookmark,
  Eye,
  Target,
  TrendingUp,
  HelpCircle,
  Calendar,
  GraduationCap,
  MapPin,
  Zap,
  Shield,
  CheckCircle2,
  AlertCircle,
  Loader,
  Download,
  Filter,
  MessageSquare
} from 'lucide-react';

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getQuizById, 
    getUserAttempts,
    getQuizStatistics,
    getQuizLeaderboard
  } = useQuiz();
  const { user, isAuthenticated } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAttempts, setUserAttempts] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Données de démonstration
  const demoQuiz = {
    id: parseInt(id),
    title: "Algèbre Linéaire Avancée - Matrices et Espaces Vectoriels",
    description: "Master advanced linear algebra concepts including matrix operations, vector spaces, eigenvalues, and eigenvectors with real-world applications.",
    detailedDescription: "Ce quiz couvre les concepts avancés de l'algèbre linéaire, incluant les opérations sur les matrices, les espaces vectoriels, les valeurs propres et les vecteurs propres. Idéal pour les étudiants en mathématiques, physique et ingénierie.",
    subject: "Mathématiques",
    category: "Algèbre",
    university: "Université Hassan II",
    faculty: "Faculté des Sciences",
    level: "S3",
    author: "Dr. Ahmed Alami",
    questionsCount: 25,
    duration: 45,
    difficulty: "advanced",
    isPro: false,
    isFeatured: true,
    isNew: false,
    participants: 3250,
    avgScore: 72.5,
    successRate: 65,
    rating: 4.7,
    ratingCount: 847,
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-02-10T14:30:00Z",
    tags: ["Matrices", "Espaces Vectoriels", "Algèbre", "Maths Avancées"],
    learningObjectives: [
      "Maîtriser les opérations sur les matrices",
      "Comprendre les espaces vectoriels",
      "Calculer les valeurs propres et vecteurs propres",
      "Résoudre des systèmes d'équations linéaires"
    ],
    prerequisites: ["Algèbre Linéaire Basique", "Calcul Matriciel"],
    topics: [
      "Opérations sur les matrices",
      "Déterminants et inverses",
      "Espaces vectoriels et sous-espaces",
      "Applications linéaires",
      "Valeurs propres et vecteurs propres",
      "Diagonalisation"
    ],
    resources: [
      { name: "Polycopié du cours", type: "pdf", url: "#" },
      { name: "Exercices supplémentaires", type: "pdf", url: "#" },
      { name: "Vidéos explicatives", type: "video", url: "#" }
    ]
  };

  const demoAttempts = [
    { id: 1, score: 85, date: "2024-02-15T14:30:00Z", timeSpent: 32, correctAnswers: 21 },
    { id: 2, score: 92, date: "2024-02-10T11:15:00Z", timeSpent: 28, correctAnswers: 23 },
    { id: 3, score: 76, date: "2024-02-05T16:45:00Z", timeSpent: 40, correctAnswers: 19 }
  ];

  const demoLeaderboard = [
    { rank: 1, user: "Ahmed Alami", score: 98, timeSpent: 25, date: "2024-02-18" },
    { rank: 2, user: "Fatima Zahra", score: 96, timeSpent: 28, date: "2024-02-17" },
    { rank: 3, user: "Youssef Benani", score: 94, timeSpent: 30, date: "2024-02-16" },
    { rank: 4, user: "Amina Toumi", score: 92, timeSpent: 27, date: "2024-02-15" },
    { rank: 5, user: "Mehdi Kassi", score: 90, timeSpent: 32, date: "2024-02-14" }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulation de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setQuiz(demoQuiz);
      setUserAttempts(demoAttempts);
      setStatistics({
        totalAttempts: 3250,
        avgScore: 72.5,
        completionRate: 89,
        timeSpentAvg: 35,
        difficultyDistribution: {
          easy: 15,
          medium: 60,
          hard: 25
        }
      });
      setLeaderboard(demoLeaderboard);
      
      setLoading(false);
    };

    loadData();
  }, [id]);

  const handleStartQuiz = () => {
    if (isAuthenticated) {
      navigate(`/quiz/${id}/play`);
    } else {
      navigate('/login', { state: { from: `/quiz/${id}/play` } });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-green-700';
      case 'intermediate': return 'from-blue-500 to-blue-700';
      case 'advanced': return 'from-purple-500 to-purple-700';
      case 'expert': return 'from-red-500 to-red-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      case 'expert': return 'Expert';
      default: return difficulty;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Eye },
    { id: 'details', name: 'Détails', icon: BookOpen },
    { id: 'attempts', name: 'Mes tentatives', icon: Trophy },
    { id: 'leaderboard', name: 'Classement', icon: TrendingUp },
    { id: 'discussion', name: 'Discussion', icon: MessageSquare }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Skeleton Loading */}
          <div className="animate-pulse">
            {/* Breadcrumb Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            
            {/* Main Card Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz non trouvé</h2>
          <p className="text-gray-600 mb-6">Le quiz que vous recherchez n'existe pas.</p>
          <Link to="/quizzes" className="btn-primary">
            Voir tous les quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb et actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Link 
              to="/quizzes" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Retour aux quiz
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg ${
                isBookmarked 
                  ? 'bg-yellow-50 text-yellow-600' 
                  : 'bg-gray-100 text-gray-400 hover:text-yellow-500 hover:bg-gray-200'
              }`}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200">
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* En-tête principal */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getDifficultyColor(quiz.difficulty)}`}>
                    {getDifficultyText(quiz.difficulty)}
                  </span>
                  {quiz.isFeatured && (
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500">
                      <Zap className="h-3 w-3 inline mr-1" />
                      Populaire
                    </span>
                  )}
                  {quiz.isPro && (
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-500 to-yellow-700">
                      <Shield className="h-3 w-3 inline mr-1" />
                      Premium
                    </span>
                  )}
                </div>

                {/* Titre */}
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  {quiz.title}
                </h1>

                {/* Description */}
                <p className="text-blue-100 text-lg mb-6 max-w-3xl">
                  {quiz.description}
                </p>

                {/* Métadonnées */}
                <div className="flex flex-wrap items-center gap-4 text-blue-200">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>{quiz.university}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{quiz.faculty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>Niveau {quiz.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Mis à jour le {formatDate(quiz.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="lg:w-80">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                  <button
                    onClick={handleStartQuiz}
                    className="w-full bg-gradient-to-r from-white to-blue-100 text-blue-600 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mb-4"
                  >
                    <Play className="h-5 w-5" />
                    {userAttempts.length > 0 ? 'Refaire le quiz' : 'Commencer le quiz'}
                  </button>
                  
                  <div className="text-center text-blue-100 text-sm">
                    {userAttempts.length > 0 ? (
                      <div>
                        Meilleur score: <span className="font-bold text-white">{Math.max(...userAttempts.map(a => a.score))}%</span>
                      </div>
                    ) : (
                      <div>Première tentative</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-6 w-6 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{quiz.questionsCount}</span>
            </div>
            <div className="text-gray-600 text-sm">Questions</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-6 w-6 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">{quiz.duration}</span>
            </div>
            <div className="text-gray-600 text-sm">Minutes</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-6 w-6 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">{quiz.participants.toLocaleString()}</span>
            </div>
            <div className="text-gray-600 text-sm">Participants</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
              <span className="text-2xl font-bold text-gray-900">{quiz.rating}</span>
            </div>
            <div className="text-gray-600 text-sm">Note ({quiz.ratingCount})</div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="p-8">
            {/* Vue d'ensemble */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Description détaillée */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">À propos de ce quiz</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {quiz.detailedDescription}
                  </p>
                </div>

                {/* Objectifs d'apprentissage */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    <Target className="h-5 w-5 inline mr-2 text-blue-500" />
                    Objectifs d'apprentissage
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quiz.learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {quiz.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Statistiques avancées */}
                {statistics && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      <BarChart3 className="h-5 w-5 inline mr-2 text-blue-500" />
                      Statistiques
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tentatives totales</span>
                          <span className="font-semibold text-gray-900">{statistics.totalAttempts.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Score moyen</span>
                          <span className="font-semibold text-gray-900">{statistics.avgScore}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taux de complétion</span>
                          <span className="font-semibold text-gray-900">{statistics.completionRate}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Distribution de difficulté</div>
                        <div className="space-y-2">
                          {Object.entries(statistics.difficultyDistribution).map(([level, percentage]) => (
                            <div key={level} className="flex items-center gap-3">
                              <span className="w-20 text-sm text-gray-600 capitalize">{level}</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    level === 'easy' ? 'bg-green-500' :
                                    level === 'medium' ? 'bg-blue-500' :
                                    'bg-purple-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="w-10 text-right text-sm font-medium">{percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Détails */}
            {activeTab === 'details' && (
              <div className="space-y-8">
                {/* Prerequisites */}
                {quiz.prerequisites && quiz.prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Prérequis</h3>
                    <div className="flex flex-wrap gap-2">
                      {quiz.prerequisites.map((prereq, index) => (
                        <span 
                          key={index}
                          className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topics */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sujets couverts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quiz.topics.map((topic, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                {quiz.resources && quiz.resources.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Ressources utiles</h3>
                    <div className="space-y-3">
                      {quiz.resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                              <Download className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{resource.name}</div>
                              <div className="text-sm text-gray-500 uppercase">{resource.type}</div>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Télécharger
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Info */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">À propos de l'auteur</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {quiz.author?.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{quiz.author}</div>
                      <div className="text-gray-600">Professeur à {quiz.university}</div>
                      <div className="text-sm text-gray-500 mt-2">Expert en {quiz.subject} avec 15 ans d'expérience</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mes tentatives */}
            {activeTab === 'attempts' && (
              <div>
                {userAttempts.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Historique des tentatives</h3>
                      <div className="text-sm text-gray-600">
                        Meilleur score: <span className="font-bold text-green-600">
                          {Math.max(...userAttempts.map(a => a.score))}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {userAttempts.map((attempt, index) => (
                        <div key={attempt.id} className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-900">
                                Tentative #{userAttempts.length - index}
                              </div>
                              <div className="text-sm text-gray-600">
                                {formatDate(attempt.date)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">{attempt.score}%</div>
                              <div className="text-sm text-gray-600">{attempt.timeSpent} min</div>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span>{attempt.correctAnswers}/{quiz.questionsCount} correctes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-blue-500" />
                              <span>Temps: {attempt.timeSpent} min</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucune tentative enregistrée
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Lancez-vous dans votre première tentative !
                    </p>
                    <button
                      onClick={handleStartQuiz}
                      className="btn-primary"
                    >
                      <Play className="h-4 w-4 inline mr-2" />
                      Commencer le quiz
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Classement */}
            {activeTab === 'leaderboard' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Classement</h3>
                {leaderboard.length > 0 ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
                      <div className="col-span-1">Rang</div>
                      <div className="col-span-6">Étudiant</div>
                      <div className="col-span-2">Score</div>
                      <div className="col-span-2">Temps</div>
                      <div className="col-span-1">Date</div>
                    </div>
                    
                    {leaderboard.map((entry) => (
                      <div key={entry.rank} className="grid grid-cols-12 gap-4 px-4 py-3 bg-white border border-gray-200 rounded-lg items-center hover:bg-gray-50">
                        <div className="col-span-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            entry.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' :
                            entry.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                            entry.rank === 3 ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {entry.rank}
                          </div>
                        </div>
                        <div className="col-span-6 font-medium text-gray-900">{entry.user}</div>
                        <div className="col-span-2 font-bold text-gray-900">{entry.score}%</div>
                        <div className="col-span-2 text-gray-600">{entry.timeSpent} min</div>
                        <div className="col-span-1 text-sm text-gray-500">{entry.date}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-600">Aucune donnée de classement disponible</div>
                  </div>
                )}
              </div>
            )}

            {/* Discussion */}
            {activeTab === 'discussion' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Discussion</h3>
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Forum de discussion
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discutez des questions et partagez vos connaissances avec la communauté
                  </p>
                  <button className="btn-primary">
                    Accéder au forum
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-2">
            Prêt à relever le défi ?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Testez vos connaissances et rejoignez des milliers d'étudiants qui ont déjà relevé ce défi
          </p>
          <button
            onClick={handleStartQuiz}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Play className="h-5 w-5 inline mr-2" />
            {userAttempts.length > 0 ? 'Améliorer mon score' : 'Commencer maintenant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;