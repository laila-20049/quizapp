import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'lucide-react';

const ProtectedRoute = ({ children, requiredRole, requiredPermission }) => {
  const { isAuthenticated, user, isLoading, hasRole, hasPermission } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <div>Veuillez vous connecter pour accéder à cette page.</div>;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <div>Accès non autorisé. Rôle requis: {requiredRole}</div>;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <div>Permission insuffisante.</div>;
  }

  return children;
};

export default ProtectedRoute;