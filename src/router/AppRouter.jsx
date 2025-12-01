import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Lazy loading des pages pour améliorer les performances
const Home = lazy(() => import('../pages/Home'));
const QuizList = lazy(() => import('../pages/QuizList'));
const QuizDetail = lazy(() => import('../pages/QuizDetail'));
const QuizPlay = lazy(() => import('../pages/QuizPlay'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Profile = lazy(() => import('../pages/Profile'));
const Leaderboard = lazy(() => import('../pages/Leaderboard'));
const Result = lazy(() => import('../pages/Result'));
const ResultsHistory = lazy(() => import('../pages/ResultsHistory'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const QuizCreate = lazy(() => import('../pages/admin/QuizCreate'));
const QuizEdit = lazy(() => import('../pages/admin/QuizEdit'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Composant pour les routes protégées
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }
  
  // Vérification des rôles si spécifiés
  if (roles.length > 0 && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Composant pour les routes publiques uniquement (redirige si déjà connecté)
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Layouts différents pour différentes parties de l'application
const MainLayout = ({ children }) => (
  <Layout>
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  </Layout>
);

const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  </div>
);

const AdminLayout = ({ children }) => (
  <Layout showAdminSidebar={true}>
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  </Layout>
);

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Routes publiques avec layout principal */}
        <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />
        
        <Route path="/quizzes" element={
          <MainLayout>
            <QuizList />
          </MainLayout>
        } />
        
        <Route path="/quiz/:id" element={
          <MainLayout>
            <QuizDetail />
          </MainLayout>
        } />
        
        <Route path="/leaderboard" element={
          <MainLayout>
            <Leaderboard />
          </MainLayout>
        } />
        
        {/* Routes d'authentification (layout minimal) */}
        <Route path="/login" element={
          <PublicOnlyRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicOnlyRoute>
        } />
        
        <Route path="/register" element={
          <PublicOnlyRoute>
            <AuthLayout>
              <Register />
            </AuthLayout>
          </PublicOnlyRoute>
        } />
        
        {/* Routes protégées - utilisateur connecté */}
        <Route path="/quiz/:id/play" element={
          <ProtectedRoute>
            <MainLayout>
              <QuizPlay />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/result/:attemptId?" element={
          <ProtectedRoute>
            <MainLayout>
              <Result />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/results" element={
          <ProtectedRoute>
            <MainLayout>
              <ResultsHistory />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* Routes admin - nécessitent le rôle admin */}
        <Route path="/admin" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/quiz/create" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <QuizCreate />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/quiz/:id/edit" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <QuizEdit />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* Route 404 */}
        <Route path="*" element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;