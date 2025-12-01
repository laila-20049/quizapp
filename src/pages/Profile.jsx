import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { 
  User,
  Edit,
  Settings,
  LogOut,
  Trophy,
  BookOpen,
  Clock,
  TrendingUp,
  Star,
  Award,
  Target,
  BarChart3,
  Calendar,
  Shield,
  Bell,
  Mail,
  MapPin,
  GraduationCap,
  Bookmark,
  Users,
  Crown,
  Zap,
  ChevronRight,
  CheckCircle2,
  XCircle,
  PieChart,
  RefreshCw,
  Download
} from 'lucide-react';

const Profile = () => {
  const { user, logout, updateProfile, isLoading: authLoading } = useAuth();
  const { userAttempts, statistics, getUserProgress } = useQuiz();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [badges, setBadges] = useState([]);

  // Formate la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Données de démonstration
  const demoProgress = {
    totalScore: 5420,
    quizzesCompleted: 28,
    averageScore: 78,
    totalTimeSpent: 2540, // en minutes
    currentStreak: 7,
    bestScore: 96,
    rank: 15,
    totalRank: 12470,
    level: "Advanced",
    xp: 4250,
    nextLevelXP: 5000,
    subjects: [
      { name: "Mathématiques", score: 85, quizzes: 8 },
      { name: "Physique", score: 78, quizzes: 6 },
      { name: "Informatique", score: 92, quizzes: 10 },
      { name: "Culture Générale", score: 74, quizzes: 4 }
    ]
  };

  const demoBadges = [
    { id: 1, name: "Débutant", icon: Trophy, color: "from-yellow-400 to-yellow-600", earned: true, date: "2024-01-15" },
    { id: 2, name: "Quiz Master", icon: Crown, color: "from-purple-500 to-purple-700", earned: true, date: "2024-01-20" },
    { id: 3, name: "Streak King", icon: Zap, color: "from-orange-500 to-orange-700", earned: true, date: "2024-02-01" },
    { id: 4, name: "Perfect Score", icon: Star, color: "from-blue-500 to-blue-700", earned: false },
    { id: 5, name: "Speed Demon", icon: TrendingUp, color: "from-green-500 to-green-700", earned: false },
    { id: 6, name: "Subject Expert", icon: Award, color: "from-red-500 to-red-700", earned: false }
  ];

  const demoActivity = [
    { id: 1, type: "quiz_completed", title: "Algèbre Linéaire", score: 92, date: "2024-02-15T14:30:00Z" },
    { id: 2, type: "badge_earned", title: "Quiz Master", badge: "Master", date: "2024-02-14T10:15:00Z" },
    { id: 3, type: "quiz_completed", title: "Programmation Python", score: 85, date: "2024-02-13T16:45:00Z" },
    { id: 4, type: "rank_up", title: "Niveau Advanced", newLevel: "Advanced", date: "2024-02-12T09:20:00Z" },
    { id: 5, type: "streak_milestone", title: "7 jours consécutifs", days: 7, date: "2024-02-11T18:30:00Z" }
  ];

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      
      // Simulation de chargement des données
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProgress(demoProgress);
      setBadges(demoBadges.filter(b => b.earned));
      setRecentActivity(demoActivity);
      setEditForm({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        university: user?.university || '',
        faculty: user?.faculty || '',
        level: user?.level || '',
        bio: "Étudiant passionné par l'apprentissage et les quiz académiques."
      });
      
      setLoading(false);
    };

    loadProfileData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      university: user?.university || '',
      faculty: user?.faculty || '',
      level: user?.level || '',
      bio: "Étudiant passionné par l'apprentissage et les quiz académiques."
    });
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: User },
    { id: 'stats', name: 'Statistiques', icon: BarChart3 },
    { id: 'activity', name: 'Activité', icon: TrendingUp },
    { id: 'badges', name: 'Badges', icon: Trophy },
    { id: 'settings', name: 'Paramètres', icon: Settings }
  ];

  const StatCard = ({ icon: Icon, value, label, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center hover:shadow-md transition-shadow">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${color} mb-3`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );

  const BadgeCard = ({ badge }) => {
    const Icon = badge.icon;
    return (
      <div className={`relative ${badge.earned ? '' : 'opacity-50'}`}>
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${badge.color} flex items-center justify-center mx-auto mb-2`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-900">{badge.name}</div>
          {badge.earned ? (
            <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
              <CheckCircle2 className="h-3 w-3" />
              Obtenu
            </div>
          ) : (
            <div className="text-xs text-gray-500 mt-1">À débloquer</div>
          )}
        </div>
      </div>
    );
  };

  if (loading || authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Skeleton Loading */}
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          
          {/* Profile Card Skeleton */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          
          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Mon Profil
            </h1>
            <p className="text-gray-600 mt-2">
              Gérez votre compte et suivez votre progression
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              to="/quizzes" 
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Reprendre un quiz
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Carte de profil */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="relative">
                {/* Bannière */}
                <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-800"></div>
                
                {/* Photo de profil */}
                <div className="absolute -bottom-12 left-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                    {user?.isPro && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-1 rounded-full">
                        <Crown className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Informations */}
              <div className="pt-16 pb-6 px-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm">{user?.email}</p>
                </div>

                {/* Badges */}
                <div className="flex justify-center gap-2 mb-6">
                  {badges.slice(0, 3).map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                      <div 
                        key={index}
                        className={`w-8 h-8 rounded-lg bg-gradient-to-r ${badge.color} flex items-center justify-center`}
                        title={badge.name}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    );
                  })}
                  {badges.length > 3 && (
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-600">
                      +{badges.length - 3}
                    </div>
                  )}
                </div>

                {/* Informations détaillées */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <GraduationCap className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-700">{user?.university || "Non spécifiée"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">{user?.faculty || "Non spécifiée"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Target className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-700">Niveau {user?.level || "Non spécifié"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">
                      {user?.isPro ? "Compte Premium" : "Compte Standard"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                      <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${
                        activeTab === tab.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {/* Vue d'ensemble */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* En-tête modifiable */}
                {isEditing ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Modifier le profil</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <input
                          type="text"
                          value={editForm.firstName}
                          onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <input
                          type="text"
                          value={editForm.lastName}
                          onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Université</label>
                        <input
                          type="text"
                          value={editForm.university}
                          onChange={(e) => setEditForm({...editForm, university: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                        <select
                          value={editForm.level}
                          onChange={(e) => setEditForm({...editForm, level: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Sélectionner</option>
                          <option value="S1">S1</option>
                          <option value="S2">S2</option>
                          <option value="S3">S3</option>
                          <option value="S4">S4</option>
                          <option value="S5">S5</option>
                          <option value="S6">S6</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700"
                      >
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Progression générale</h3>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium">
                        {progress?.level}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6">
                      {editForm.bio}
                    </p>
                  </div>
                )}

                {/* Statistiques principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <StatCard 
                    icon={Trophy}
                    value={progress?.totalScore.toLocaleString()}
                    label="Score total"
                    color="from-yellow-500 to-yellow-700"
                  />
                  <StatCard 
                    icon={BookOpen}
                    value={progress?.quizzesCompleted}
                    label="Quiz complétés"
                    color="from-blue-500 to-blue-700"
                  />
                  <StatCard 
                    icon={Star}
                    value={`${progress?.averageScore}%`}
                    label="Score moyen"
                    color="from-green-500 to-green-700"
                  />
                  <StatCard 
                    icon={Clock}
                    value={`${Math.floor(progress?.totalTimeSpent / 60)}h`}
                    label="Temps d'étude"
                    color="from-purple-500 to-purple-700"
                  />
                </div>

                {/* Progression par matière */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance par matière</h3>
                  <div className="space-y-4">
                    {progress?.subjects?.map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-900">{subject.name}</span>
                          <span className="text-gray-700">{subject.score}% ({subject.quizzes} quiz)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${subject.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Statistiques détaillées */}
            {activeTab === 'stats' && (
              <div className="space-y-8">
                {/* Graphiques */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Progression du score</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {[65, 72, 78, 82, 85, 78, 92].map((value, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-8 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                            style={{ height: `${value}%` }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-2">S{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribution des quiz</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <PieChart className="h-48 w-48 text-gray-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">28</div>
                            <div className="text-sm text-gray-600">Quiz total</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informations détaillées */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Détails des performances</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Meilleur score</span>
                        <span className="font-semibold text-gray-900">{progress?.bestScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Streak actuel</span>
                        <span className="font-semibold text-gray-900">{progress?.currentStreak} jours</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Classement</span>
                        <span className="font-semibold text-gray-900">#{progress?.rank}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">XP total</span>
                        <span className="font-semibold text-gray-900">{progress?.xp}/{progress?.nextLevelXP}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taux de réussite</span>
                        <span className="font-semibold text-gray-90">84%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Temps moyen par quiz</span>
                        <span className="font-semibold text-gray-900">12 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activité récente */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Activité récente</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                          activity.type === 'quiz_completed' ? 'bg-green-100 text-green-600' :
                          activity.type === 'badge_earned' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {activity.type === 'quiz_completed' && <Trophy className="h-5 w-5" />}
                          {activity.type === 'badge_earned' && <Award className="h-5 w-5" />}
                          {activity.type === 'rank_up' && <TrendingUp className="h-5 w-5" />}
                          {activity.type === 'streak_milestone' && <Zap className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{activity.title}</div>
                          {activity.score && (
                            <div className="text-sm text-gray-600 mt-1">
                              Score: <span className="font-semibold">{activity.score}%</span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 whitespace-nowrap">
                          {formatDate(activity.date)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Badges */}
            {activeTab === 'badges' && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Mes badges</h3>
                    <div className="text-sm text-gray-600">
                      {badges.length} sur {demoBadges.length} débloqués
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {demoBadges.map(badge => (
                      <BadgeCard key={badge.id} badge={badge} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Paramètres */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Paramètres du compte</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Notifications</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                          <span className="ml-2 text-gray-700">Quiz recommandés</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                          <span className="ml-2 text-gray-700">Rappels de progression</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600" />
                          <span className="ml-2 text-gray-700">Newsletter</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Sécurité</h4>
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Changer le mot de passe</div>
                            <div className="text-sm text-gray-600">Mettre à jour votre mot de passe régulièrement</div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </button>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Données</h4>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="font-medium text-gray-900">Exporter mes données</div>
                          <Download className="h-5 w-5 text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                          <div className="font-medium">Supprimer mon compte</div>
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;