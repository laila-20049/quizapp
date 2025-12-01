import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Star, 
  TrendingUp, 
  Award, 
  Users, 
  Filter, 
  Search,
  Calendar,
  Clock,
  Zap,
  Shield,
  Medal
} from 'lucide-react';

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState('all'); // 'weekly', 'monthly', 'all'
  const [category, setCategory] = useState('overall'); // 'overall', 'math', 'physics', etc.
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  // Données de démonstration
  const demoData = {
    weekly: [
      {
        id: 1,
        rank: 1,
        name: "Ahmed Alami",
        university: "Université Hassan II",
        faculty: "Faculté des Sciences",
        score: 9850,
        progress: 15,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        badges: ["top_rank", "quick_learner"],
        quizzesCompleted: 42,
        averageScore: 92
      },
      {
        id: 2,
        rank: 2,
        name: "Fatima Zahra",
        university: "Université Mohammed V",
        faculty: "ENSA",
        score: 8720,
        progress: 8,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
        badges: ["streak_master"],
        quizzesCompleted: 38,
        averageScore: 89
      },
      {
        id: 3,
        rank: 3,
        name: "Youssef Benani",
        university: "Université Cadi Ayyad",
        faculty: "FST",
        score: 7650,
        progress: -3,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        badges: ["math_expert"],
        quizzesCompleted: 35,
        averageScore: 87
      },
      {
        id: 4,
        rank: 4,
        name: "Amina Toumi",
        university: "Université Ibn Tofail",
        faculty: "Faculté de Médecine",
        score: 6980,
        progress: 12,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        badges: ["biology_pro"],
        quizzesCompleted: 31,
        averageScore: 85
      },
      {
        id: 5,
        rank: 5,
        name: "Mehdi Kassi",
        university: "Université Hassan II",
        faculty: "Faculté des Sciences",
        score: 6450,
        progress: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        badges: ["physics_wizard"],
        quizzesCompleted: 28,
        averageScore: 83
      },
      {
        id: 6, // Current user
        rank: 15,
        name: "You",
        university: "Université Hassan II",
        faculty: "FST",
        score: 4320,
        progress: 2,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        badges: ["rising_star"],
        quizzesCompleted: 18,
        averageScore: 78,
        isCurrentUser: true
      }
    ],
    monthly: [
      // Similar structure with different data
    ],
    all: [
      // All-time leaderboard data
    ]
  };

  const categories = [
    { id: 'overall', name: 'Classement Général', icon: Trophy },
    { id: 'math', name: 'Mathématiques', icon: TrendingUp },
    { id: 'physics', name: 'Physique', icon: Zap },
    { id: 'computer_science', name: 'Informatique', icon: Shield },
    { id: 'biology', name: 'Biologie', icon: Award }
  ];

  useEffect(() => {
    // Simulation de chargement des données
    const loadLeaderboard = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const data = demoData[timeRange] || demoData.weekly;
      setLeaderboardData(data);
      
      // Trouver l'utilisateur courant
      const currentUser = data.find(user => user.isCurrentUser);
      setCurrentUserRank(currentUser);
      
      setLoading(false);
    };

    loadLeaderboard();
  }, [timeRange, category]);

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-400 to-gray-600';
      case 3: return 'from-amber-600 to-amber-800';
      default: return 'from-blue-500 to-blue-700';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5" />;
      case 2: return <Medal className="h-5 w-5" />;
      case 3: return <Award className="h-5 w-5" />;
      default: return <Trophy className="h-4 w-4" />;
    }
  };

  const ProgressIndicator = ({ progress }) => {
    const isPositive = progress > 0;
    return (
      <div className={`flex items-center gap-1 text-sm ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}>
        <TrendingUp className={`h-4 w-4 ${isPositive ? '' : 'rotate-180'}`} />
        <span>{Math.abs(progress)}</span>
      </div>
    );
  };

  const BadgePill = ({ badge }) => {
    const badgeConfig = {
      top_rank: { color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', icon: Crown },
      quick_learner: { color: 'bg-gradient-to-r from-green-400 to-green-600', icon: Zap },
      streak_master: { color: 'bg-gradient-to-r from-orange-400 to-orange-600', icon: TrendingUp },
      math_expert: { color: 'bg-gradient-to-r from-blue-400 to-blue-600', icon: TrendingUp },
      biology_pro: { color: 'bg-gradient-to-r from-emerald-400 to-emerald-600', icon: Award },
      physics_wizard: { color: 'bg-gradient-to-r from-purple-400 to-purple-600', icon: Shield },
      rising_star: { color: 'bg-gradient-to-r from-pink-400 to-pink-600', icon: Star }
    };

    const config = badgeConfig[badge] || badgeConfig.rising_star;
    const IconComponent = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-white text-xs font-medium flex items-center gap-1 ${config.color}`}>
        <IconComponent className="h-3 w-3" />
        {badge.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* En-tête skeleton */}
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          
          {/* Filtres skeleton */}
          <div className="flex gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg w-32"></div>
            ))}
          </div>
          
          {/* Liste skeleton */}
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            Classement
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Découvrez les meilleurs étudiants et competez pour atteindre le sommet du classement
        </p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="h-6 w-6 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">1,247</span>
          </div>
          <p className="text-gray-600 text-sm">Participants actifs</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-900">42</span>
          </div>
          <p className="text-gray-600 text-sm">Quiz complétés</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-6 w-6 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">84%</span>
          </div>
          <p className="text-gray-600 text-sm">Score moyen</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-6 w-6 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">156h</span>
          </div>
          <p className="text-gray-600 text-sm">Temps d'étude</p>
        </div>
      </div>

      {/* Filtres et contrôles */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Période */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Période
            </label>
            <div className="flex gap-2">
              {[
                { id: 'weekly', name: 'Cette semaine' },
                { id: 'monthly', name: 'Ce mois' },
                { id: 'all', name: 'Tous le temps' }
              ].map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeRange === range.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range.name}
                </button>
              ))}
            </div>
          </div>

          {/* Catégorie */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="h-4 w-4 inline mr-2" />
              Catégorie
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Recherche */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="h-4 w-4 inline mr-2" />
              Rechercher
            </label>
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Classement */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* En-tête du tableau */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
          <div className="col-span-1">Rang</div>
          <div className="col-span-4">Étudiant</div>
          <div className="col-span-2">Université</div>
          <div className="col-span-1 text-center">Score</div>
          <div className="col-span-2 text-center">Progression</div>
          <div className="col-span-2 text-center">Badges</div>
        </div>

        {/* Liste des participants */}
        <div className="divide-y divide-gray-100">
          {leaderboardData.map((user) => (
            <div
              key={user.id}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all hover:bg-gray-50 ${
                user.isCurrentUser ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              } ${user.rank <= 3 ? 'bg-gradient-to-r from-white to-gray-50' : ''}`}
            >
              {/* Rang */}
              <div className="col-span-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold ${
                  user.rank <= 3 
                    ? `bg-gradient-to-r ${getRankColor(user.rank)} shadow-lg` 
                    : 'bg-gray-400'
                }`}>
                  {user.rank <= 3 ? getRankIcon(user.rank) : user.rank}
                </div>
              </div>

              {/* Étudiant */}
              <div className="col-span-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${
                        user.isCurrentUser ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {user.name}
                      </span>
                      {user.isCurrentUser && (
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                          Vous
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span>{user.averageScore}% moyenne</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Université */}
              <div className="col-span-2">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{user.university}</div>
                  <div className="text-gray-500">{user.faculty}</div>
                </div>
              </div>

              {/* Score */}
              <div className="col-span-1 text-center">
                <div className="text-lg font-bold text-gray-900">
                  {user.score.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  {user.quizzesCompleted} quiz
                </div>
              </div>

              {/* Progression */}
              <div className="col-span-2 text-center">
                <ProgressIndicator progress={user.progress} />
              </div>

              {/* Badges */}
              <div className="col-span-2">
                <div className="flex flex-wrap gap-1 justify-center">
                  {user.badges.slice(0, 2).map((badge, index) => (
                    <BadgePill key={index} badge={badge} />
                  ))}
                  {user.badges.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{user.badges.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Position de l'utilisateur courant */}
        {currentUserRank && currentUserRank.rank > 5 && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-white text-blue-600 rounded-full font-bold">
                  {currentUserRank.rank}
                </div>
                <div>
                  <div className="font-semibold">Votre position</div>
                  <div className="text-sm opacity-90">
                    Score: {currentUserRank.score.toLocaleString()} • {currentUserRank.quizzesCompleted} quiz complétés
                  </div>
                </div>
              </div>
              <div className="text-sm">
                <ProgressIndicator progress={currentUserRank.progress} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section de motivation */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold text-green-800">Progression Rapide</h3>
          </div>
          <p className="text-green-700 text-sm">
            Complétez 5 quiz de plus pour monter dans le classement
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Objectif Hebdomadaire</h3>
          </div>
          <p className="text-blue-700 text-sm">
            Atteignez le top 10 cette semaine pour gagner un badge spécial
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-violet-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold text-purple-800">Streak Actuelle</h3>
          </div>
          <p className="text-purple-700 text-sm">
            7 jours consécutifs - Continuez comme ça !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;