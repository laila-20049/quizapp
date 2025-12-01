import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import QuizCard from '../components/QuizCard';
import { 
  Play, 
  Trophy, 
  Users, 
  Star, 
  TrendingUp, 
  BookOpen,
  Clock,
  Award,
  GraduationCap,
  Zap,
  ArrowRight,
  ChevronRight,
  Shield,
  Target
} from 'lucide-react';

const Home = () => {
  const { quizzes, statistics } = useQuiz();
  const { user, isAuthenticated } = useAuth();
  const [featuredQuizzes, setFeaturedQuizzes] = useState([]);
  const [newQuizzes, setNewQuizzes] = useState([]);
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Statistiques de démonstration
  const stats = {
    totalQuizzes: 156,
    activeUsers: 12470,
    averageScore: 78,
    quizzesCompleted: 84520,
    totalUniversities: 24,
    successRate: 85
  };

  const features = [
    {
      icon: Trophy,
      title: "Classement Compétitif",
      description: "Affrontez d'autres étudiants et montez dans le classement",
      color: "from-yellow-500 to-amber-600"
    },
    {
      icon: BookOpen,
      title: "Quiz par Matière",
      description: "Des quiz spécialisés par matière universitaire",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: Clock,
      title: "Timer Intelligent",
      description: "Gérez votre temps avec notre système de timer adaptatif",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Certification",
      description: "Obtenez des certificats de réussite pour vos compétences",
      color: "from-purple-500 to-purple-700"
    }
  ];

  const universities = [
    { name: "Université Hassan II", students: 4500, quizzes: 42 },
    { name: "Université Mohammed V", students: 3800, quizzes: 38 },
    { name: "Université Cadi Ayyad", students: 3200, quizzes: 35 },
    { name: "Université Ibn Tofail", students: 2800, quizzes: 28 }
  ];

  useEffect(() => {
    // Simulation de chargement des données
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filtrer les quizzes
      setFeaturedQuizzes(quizzes.filter(q => q.isFeatured).slice(0, 6));
      setNewQuizzes(quizzes.filter(q => q.isNew).slice(0, 3));
      setTrendingQuizzes(quizzes.sort((a, b) => b.participants - a.participants).slice(0, 3));
      
      setLoading(false);
    };

    loadData();
  }, [quizzes]);

  const StatCard = ({ icon: Icon, value, label, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${color} mb-3`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );

  const FeatureCard = ({ feature }) => {
    const Icon = feature.icon;
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Section Skeleton */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center animate-pulse">
            <div className="h-12 bg-blue-500 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-6 bg-blue-500 rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-12 bg-blue-400 rounded w-48 mx-auto"></div>
          </div>
        </div>

        {/* Features Skeleton */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                  <div className="h-14 w-14 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Zap className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">Plateforme N°1 des Quiz Universitaires au Maroc</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Moroccan
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                University Quiz
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Maîtrisez vos cours grâce à nos quiz interactifs. 
              <span className="text-yellow-300 font-semibold"> Relevez le défi </span>
              avec des étudiants de toutes les universités marocaines.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                to="/quizzes" 
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <Play className="h-5 w-5" />
                Commencer les Quiz
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {!isAuthenticated && (
                <Link 
                  to="/register" 
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Créer un Compte
                </Link>
              )}
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.totalQuizzes}+</div>
                <div className="text-blue-200 text-sm">Quiz Disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.activeUsers}+</div>
                <div className="text-blue-200 text-sm">Étudiants Actifs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.averageScore}%</div>
                <div className="text-blue-200 text-sm">Score Moyen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.totalUniversities}</div>
                <div className="text-blue-200 text-sm">Universités</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir notre plateforme ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une expérience d'apprentissage unique conçue spécialement pour les étudiants universitaires marocains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quizzes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Quiz Populaires
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez les quiz les plus appréciés par la communauté
              </p>
            </div>
            <Link 
              to="/quizzes" 
              className="hidden lg:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group"
            >
              Voir tous les quiz
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featuredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredQuizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun quiz disponible
              </h3>
              <p className="text-gray-600">
                Les quiz seront bientôt ajoutés à la plateforme
              </p>
            </div>
          )}

          <div className="text-center mt-8 lg:hidden">
            <Link 
              to="/quizzes" 
              className="btn-primary"
            >
              Voir tous les quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Notre Impact
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Rejoignez des milliers d'étudiants qui améliorent déjà leurs compétences
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard 
              icon={BookOpen}
              value={stats.totalQuizzes}
              label="Quiz Créés"
              color="from-blue-400 to-blue-600"
            />
            <StatCard 
              icon={Users}
              value={stats.activeUsers.toLocaleString()}
              label="Étudiants Actifs"
              color="from-green-400 to-green-600"
            />
            <StatCard 
              icon={Trophy}
              value={`${stats.averageScore}%`}
              label="Score Moyen"
              color="from-yellow-400 to-yellow-600"
            />
            <StatCard 
              icon={TrendingUp}
              value={`${stats.successRate}%`}
              label="Taux de Réussite"
              color="from-purple-400 to-purple-600"
            />
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Universités Partenaires
            </h2>
            <p className="text-xl text-gray-600">
              Des quiz adaptés pour les étudiants de toutes les universités marocaines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {universities.map((uni, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{uni.name}</h3>
                <div className="flex justify-center gap-4 text-sm text-gray-600">
                  <span>{uni.students} étudiants</span>
                  <span>•</span>
                  <span>{uni.quizzes} quiz</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Prêt à relever le défi ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez la communauté des étudiants marocains et améliorez vos compétences dès aujourd'hui
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/quizzes" 
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Target className="h-5 w-5" />
              Commencer Maintenant
            </Link>
            {!isAuthenticated && (
              <Link 
                to="/register" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Créer un Compte Gratuit
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;