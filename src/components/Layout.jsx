import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  BookOpen,
  Trophy,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
  BarChart3,
  PlusCircle,
  Users
} from 'lucide-react';
import { useState } from 'react';

const Layout = ({ children, showAdminSidebar = false }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Quiz', href: '/quizzes', icon: BookOpen },
    { name: 'Classement', href: '/leaderboard', icon: Trophy },
  ];

  const userNavigation = [
    { name: 'Profil', href: '/profile', icon: User },
    { name: 'Mes résultats', href: '/results', icon: BarChart3 },
    ...(user?.role === 'admin' ? [
      { name: 'Administration', href: '/admin', icon: Settings },
      { name: 'Créer un quiz', href: '/admin/quiz/create', icon: PlusCircle },
    ] : []),
  ];

  const adminNavigation = [
    { name: 'Tableau de bord', href: '/admin', icon: Home },
    { name: 'Quiz', href: '/admin/quizzes', icon: BookOpen },
    { name: 'Créer un quiz', href: '/admin/quiz/create', icon: PlusCircle },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Statistiques', href: '/admin/stats', icon: BarChart3 },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation mobile */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white pt-5 pb-4">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center px-4">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">QuizApp</span>
              </Link>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    } group flex items-center px-3 py-2 text-base font-medium rounded-md`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              {isAuthenticated && (
                <>
                  <div className="mt-8 px-3">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Mon compte
                    </div>
                  </div>
                  <nav className="mt-1 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-base font-medium rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="mr-4 h-6 w-6" />
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-base font-medium rounded-md"
                    >
                      <LogOut className="mr-4 h-6 w-6" />
                      Déconnexion
                    </button>
                  </nav>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation desktop */}
      {showAdminSidebar ? (
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-indigo-700 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link to="/admin" className="flex items-center">
                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                  <Settings className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="ml-3 text-xl font-bold text-white">Administration</span>
              </Link>
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {adminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-indigo-800 text-white'
                        : 'text-indigo-100 hover:bg-indigo-600'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto px-3 py-4">
                <div className="border-t border-indigo-600 pt-4">
                  <Link
                    to="/"
                    className="text-indigo-200 hover:text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <Home className="mr-3 h-5 w-5" />
                    Retour au site
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">QuizApp</span>
              </Link>
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-r-md`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              {isAuthenticated && (
                <>
                  <div className="mt-8 px-3">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Mon compte
                    </div>
                  </div>
                  <nav className="mt-1 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Déconnexion
                    </button>
                  </nav>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className={showAdminSidebar ? "lg:pl-64" : "lg:pl-64"}>
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between px-4">
            <div className="flex-1 flex items-center">
              {!showAdminSidebar && (
                <div className="max-w-lg w-full">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="search"
                      placeholder="Rechercher un quiz..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="ml-4 flex items-center lg:ml-6">
              {isAuthenticated ? (
                <>
                  <button
                    type="button"
                    className="p-1 text-gray-400 hover:text-gray-500 relative"
                    onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
                  >
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                  </button>

                  <div className="ml-3 relative">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user?.role === 'admin' ? 'Administrateur' : 'Étudiant'}
                        </div>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenu */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Menu de notifications */}
      {notificationMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setNotificationMenuOpen(false)}>
          <div className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            </div>
            <div className="p-4">
              <div className="text-center text-gray-500 py-8">
                <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p>Aucune notification</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;