import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import QuizCard from '../components/QuizCard';
import { 
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Grid,
  List,
  Star,
  TrendingUp,
  Zap,
  Clock,
  Users,
  GraduationCap,
  MapPin,
  ChevronDown,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  BookOpen,
  Shield,
  Trophy,
  BarChart3
} from 'lucide-react';

const QuizList = () => {
  const { 
    filteredQuizzes, 
    setFilters, 
    setSearchQuery,
    quizzes,
    statistics 
  } = useQuiz();

  const [selectedFilters, setSelectedFilters] = useState({
    university: null,
    faculty: null,
    subject: null,
    level: null,
    difficulty: null,
    isPro: null,
    sortBy: 'popularity'
  });

  const [searchInput, setSearchInput] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [activeSort, setActiveSort] = useState('popularity');
  const [loading, setLoading] = useState(false);

  // Données pour les filtres
  const universities = [
    { id: 1, name: "Université Hassan II", count: 42 },
    { id: 2, name: "Université Mohammed V", count: 38 },
    { id: 3, name: "Université Cadi Ayyad", count: 35 },
    { id: 4, name: "Université Ibn Tofail", count: 28 },
    { id: 5, name: "Université Abdelmalek Essaâdi", count: 22 }
  ];

  const faculties = [
    { id: 1, name: "Faculté des Sciences (FS)", count: 56 },
    { id: 2, name: "Faculté des Sciences et Techniques (FST)", count: 48 },
    { id: 3, name: "École Nationale des Sciences Appliquées (ENSA)", count: 42 },
    { id: 4, name: "Faculté de Droit (FD)", count: 35 },
    { id: 5, name: "Faculté des Sciences Économiques (FSE)", count: 31 }
  ];

  const subjects = [
    { id: 1, name: "Mathématiques", icon: "📊", count: 42 },
    { id: 2, name: "Physique", icon: "⚛️", count: 38 },
    { id: 3, name: "Informatique", icon: "💻", count: 56 },
    { id: 4, name: "Économie", icon: "💰", count: 28 },
    { id: 5, name: "Droit", icon: "⚖️", count: 35 },
    { id: 6, name: "Sciences de la Vie", icon: "🔬", count: 24 },
    { id: 7, name: "Philosophie", icon: "🧠", count: 18 },
    { id: 8, name: "Culture Générale", icon: "🌍", count: 45 }
  ];

  const levels = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
  const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];

  const sortOptions = [
    { id: 'popularity', name: 'Popularité', icon: TrendingUp },
    { id: 'newest', name: 'Plus récents', icon: Clock },
    { id: 'rating', name: 'Meilleure note', icon: Star },
    { id: 'participants', name: 'Plus de participants', icon: Users }
  ];

  useEffect(() => {
    // Simulation de chargement
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedFilters, searchInput]);

  const handleSearch = (value) => {
    setSearchInput(value);
    setSearchQuery(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { 
      ...selectedFilters, 
      [key]: selectedFilters[key] === value ? null : value 
    };
    setSelectedFilters(newFilters);
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      university: null,
      faculty: null,
      subject: null,
      level: null,
      difficulty: null,
      isPro: null,
      sortBy: 'popularity'
    };
    setSelectedFilters(clearedFilters);
    setFilters(clearedFilters);
    setSearchInput('');
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).filter(
      value => value !== null && value !== 'popularity'
    ).length;
  };

  const renderFilterPill = (label, value, key) => (
    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm">
      <span>{label}: {value}</span>
      <button
        onClick={() => handleFilterChange(key, value)}
        className="text-blue-500 hover:text-blue-700"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Skeleton Loading */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-full mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Tous les Quiz
            </h1>
            <p className="text-gray-600">
              Découvrez nos {quizzes.length} quiz universitaires marocains
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {showFilters ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showFilters ? 'Masquer filtres' : 'Afficher filtres'}
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{quizzes.length}</div>
                <div className="text-sm text-gray-600">Quiz disponibles</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12,450</div>
                <div className="text-sm text-gray-600">Étudiants actifs</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                <Star className="h-5 w-5 fill-current" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.7</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">78%</div>
                <div className="text-sm text-gray-600">Taux de réussite</div>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            {/* Barre de recherche */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un quiz par titre, matière, université..."
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchInput && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filtres actifs */}
            {getActiveFilterCount() > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-700">
                    Filtres actifs ({getActiveFilterCount()})
                  </div>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Tout effacer
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.university && universities.find(u => u.id === selectedFilters.university) && 
                    renderFilterPill('Université', universities.find(u => u.id === selectedFilters.university).name, 'university')}
                  
                  {selectedFilters.faculty && faculties.find(f => f.id === selectedFilters.faculty) && 
                    renderFilterPill('Faculté', faculties.find(f => f.id === selectedFilters.faculty).name, 'faculty')}
                  
                  {selectedFilters.subject && subjects.find(s => s.id === selectedFilters.subject) && 
                    renderFilterPill('Matière', subjects.find(s => s.id === selectedFilters.subject).name, 'subject')}
                  
                  {selectedFilters.level && 
                    renderFilterPill('Niveau', selectedFilters.level, 'level')}
                  
                  {selectedFilters.difficulty && 
                    renderFilterPill('Difficulté', selectedFilters.difficulty, 'difficulty')}
                  
                  {selectedFilters.isPro !== null && 
                    renderFilterPill('Type', selectedFilters.isPro ? 'Premium' : 'Gratuit', 'isPro')}
                </div>
              </div>
            )}

            {/* Grille de filtres */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Universités */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Université
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {universities.map(uni => (
                    <button
                      key={uni.id}
                      onClick={() => handleFilterChange('university', uni.id)}
                      className={`w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors ${
                        selectedFilters.university === uni.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="truncate">{uni.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {uni.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Matières */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matières
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {subjects.map(subject => (
                    <button
                      key={subject.id}
                      onClick={() => handleFilterChange('subject', subject.id)}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                        selectedFilters.subject === subject.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{subject.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="text-sm truncate">{subject.name}</div>
                        <div className="text-xs text-gray-500">{subject.count}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Autres filtres */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Niveau
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {levels.map(level => (
                        <button
                          key={level}
                          onClick={() => handleFilterChange('level', level)}
                          className={`p-2 text-center rounded-lg transition-colors ${
                            selectedFilters.level === level
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleFilterChange('isPro', false)}
                        className={`w-full p-2 text-left rounded-lg transition-colors ${
                          selectedFilters.isPro === false
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span>Gratuit</span>
                        </div>
                      </button>
                      <button
                        onClick={() => handleFilterChange('isPro', true)}
                        className={`w-full p-2 text-left rounded-lg transition-colors ${
                          selectedFilters.isPro === true
                            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Premium</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* En-tête de liste et tri */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredQuizzes.length} quiz trouvé{filteredQuizzes.length !== 1 ? 's' : ''}
            </h2>
            {searchInput && (
              <p className="text-gray-600 text-sm">
                Résultats pour: "{searchInput}"
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Tri */}
            <div className="relative">
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    Trier par: {option.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Export */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span className="text-sm">Exporter</span>
            </button>
          </div>
        </div>

        {/* Liste des quiz */}
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun quiz trouvé
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Essayez de modifier vos critères de recherche ou d'effacer les filtres
            </p>
            <button
              onClick={clearAllFilters}
              className="btn-primary"
            >
              <RefreshCw className="h-4 w-4 inline mr-2" />
              Effacer tous les filtres
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuizzes.map(quiz => (
              <div key={quiz.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                      <BookOpen className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {quiz.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{quiz.university}</span>
                          <span>•</span>
                          <span>{quiz.subject}</span>
                          <span>•</span>
                          <span>Niveau {quiz.level}</span>
                        </div>
                      </div>
                      {quiz.isPro && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold rounded-full">
                          PREMIUM
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {quiz.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{quiz.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{quiz.participants}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{quiz.rating}</span>
                        </div>
                      </div>
                      <button className="btn-primary text-sm">
                        Voir le quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination (simplifiée) */}
        {filteredQuizzes.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Précédent
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                3
              </button>
              <span className="px-2">...</span>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* Catégories populaires */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Catégories populaires
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {subjects.slice(0, 8).map(subject => (
              <button
                key={subject.id}
                onClick={() => handleFilterChange('subject', subject.id)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{subject.icon}</div>
                <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                <div className="text-xs text-gray-500">{subject.count} quiz</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizList;