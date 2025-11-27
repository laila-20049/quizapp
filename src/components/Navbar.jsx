import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  User, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  Home,
  Search,
  Bell
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Fermer les dropdowns quand on clique ailleurs
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const universities = [
    'Université Hassan II',
    'Université Mohammed V',
    'Université Cadi Ayyad',
    'Université Ibn Tofail',
    'Université Abdelmalek Essaâdi'
  ];

  const faculties = [
    'Faculté des Sciences (FS)',
    'Faculté des Sciences et Techniques (FST)',
    'École Supérieure de Technologie (EST)',
    'École Nationale des Sciences Appliquées (ENSA)',
    'Faculté des Sciences Économiques (FSE)',
    'Faculté de Droit (FD)'
  ];

  const subjects = [
    'Physique',
    'Mathématiques',
    'Sciences de la Vie',
    'Économie',
    'Droit',
    'Informatique',
    'Philosophie',
    'Culture Générale'
  ];

  const levels = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo et navigation principale */}
          <div className="flex items-center gap-8">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-green-400" />
              <div className="text-white">
                <div className="text-xl font-bold">Moroccan<span className="text-green-400">Quiz</span></div>
                <div className="text-xs text-blue-200">University App</div>
              </div>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center gap-1">
              
              <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors">
                <Home className="h-4 w-4" />
                Accueil
              </a>

              {/* Universités Dropdown */}
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('universities');
                  }}
                  className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors"
                >
                  Universités
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {activeDropdown === 'universities' && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {universities.map((uni, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {uni}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Facultés Dropdown */}
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('faculties');
                  }}
                  className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors"
                >
                  Facultés
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {activeDropdown === 'faculties' && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {faculties.map((faculty, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {faculty}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Matières Dropdown */}
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('subjects');
                  }}
                  className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors"
                >
                  Matières
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {activeDropdown === 'subjects' && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {subjects.map((subject, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {subject}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors">
                <BookOpen className="h-4 w-4" />
                Quiz
              </a>

              <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors">
                <Trophy className="h-4 w-4" />
                Classement
              </a>
            </div>
          </div>

          {/* Côté droit - Actions utilisateur */}
          <div className="flex items-center gap-4">
            
            {/* Barre de recherche */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg bg-blue-500 text-white placeholder-blue-200 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-blue-200 hover:text-white hover:bg-blue-500 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profil utilisateur */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('user');
                }}
                className="flex items-center gap-2 text-blue-200 hover:text-white p-2 rounded-lg transition-colors"
              >
                <User className="h-6 w-6" />
                <span className="hidden md:block">Mon Profil</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {activeDropdown === 'user' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <User className="h-4 w-4" />
                    Mon Profil
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <BookOpen className="h-4 w-4" />
                    Mes Quiz
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Trophy className="h-4 w-4" />
                    Mes Scores
                  </a>
                  <hr className="my-2" />
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </a>
                </div>
              )}
            </div>

            {/* Menu mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-blue-200 hover:text-white hover:bg-blue-500 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-700 border-t border-blue-500">
            <div className="px-2 pt-2 pb-3 space-y-1">
              
              <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors">
                <Home className="h-4 w-4" />
                Accueil
              </a>

              <div className="border-t border-blue-500 pt-2">
                <div className="text-blue-200 px-3 py-2 text-sm font-medium">Universités</div>
                {universities.slice(0, 3).map((uni, index) => (
                  <a key={index} href="#" className="block px-6 py-2 text-sm text-white hover:bg-blue-500 rounded-lg transition-colors">
                    {uni}
                  </a>
                ))}
              </div>

              <div className="border-t border-blue-500 pt-2">
                <div className="text-blue-200 px-3 py-2 text-sm font-medium">Facultés</div>
                {faculties.slice(0, 3).map((faculty, index) => (
                  <a key={index} href="#" className="block px-6 py-2 text-sm text-white hover:bg-blue-500 rounded-lg transition-colors">
                    {faculty}
                  </a>
                ))}
              </div>

              <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors border-t border-blue-500">
                <BookOpen className="h-4 w-4" />
                Quiz
              </a>

              <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors">
                <Trophy className="h-4 w-4" />
                Classement
              </a>

              <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors border-t border-blue-500">
                <User className="h-4 w-4" />
                Mon Profil
              </a>

              <a href="#" className="flex items-center gap-2 text-red-300 hover:bg-red-500 hover:text-white px-3 py-2 rounded-lg transition-colors">
                <LogOut className="h-4 w-4" />
                Déconnexion
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;