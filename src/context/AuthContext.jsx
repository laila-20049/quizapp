import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Lightweight in-file JWT payload decoder to avoid an external dependency during development.
// If you prefer, install `jwt-decode` and remove this helper: `npm install jwt-decode`.
const decodeJwt = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    return null;
  }
};

// Installation requise : npm install jwt-decode

// États possibles de l'authentification
const AuthState = {
  IDLE: 'idle',
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated'
};

// Types d'actions
const AuthActionTypes = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  REFRESH_TOKEN: 'REFRESH_TOKEN'
};

// State initial
const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  status: AuthState.IDLE,
  error: null,
  isLoading: false
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        status: AuthState.AUTHENTICATED,
        error: null,
        isLoading: false
      };

    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        status: AuthState.UNAUTHENTICATED,
        error: action.payload,
        isLoading: false
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...initialState,
        status: AuthState.UNAUTHENTICATED
      };

    case AuthActionTypes.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    case AuthActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AuthActionTypes.REFRESH_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken
      };

    default:
      return state;
  }
};

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Vérifier si le token est expiré
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = decodeJwt(token);
      return decoded?.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  // Décoder le token pour obtenir les infos utilisateur
  const decodeUserFromToken = (token) => {
    try {
      const decoded = decodeJwt(token);
      return {
        id: decoded.sub || decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        role: decoded.role || 'student',
        university: decoded.university,
        faculty: decoded.faculty,
        level: decoded.level,
        avatar: decoded.avatar,
        isPro: decoded.isPro || false,
        subscription: decoded.subscription,
        exp: decoded.exp
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Initialiser l'authentification au chargement de l'app
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });

        const token = localStorage.getItem('quiz_token');
        const refreshToken = localStorage.getItem('quiz_refresh_token');

        if (token && !isTokenExpired(token)) {
          const user = decodeUserFromToken(token);
          if (user) {
            dispatch({
              type: AuthActionTypes.LOGIN_SUCCESS,
              payload: { user, token, refreshToken }
            });
          } else {
            await handleLogout();
          }
        } else if (refreshToken) {
          // Tentative de refresh token
          await refreshAuthToken();
        } else {
          dispatch({ type: AuthActionTypes.LOGOUT });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await handleLogout();
      } finally {
        dispatch({ type: AuthActionTypes.SET_LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Fonction de login
  const login = async (email, password) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      dispatch({ type: AuthActionTypes.CLEAR_ERROR });

      // Simulation d'appel API - Remplacer par votre vrai endpoint
      const response = await mockLoginAPI(email, password);

      if (response.success) {
        const { user, token, refreshToken } = response.data;

        // Stocker les tokens
        localStorage.setItem('quiz_token', token);
        localStorage.setItem('quiz_refresh_token', refreshToken);

        dispatch({
          type: AuthActionTypes.LOGIN_SUCCESS,
          payload: { user, token, refreshToken }
        });

        return { success: true };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error.message || 'Erreur de connexion';
      dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Fonction d'inscription
  const register = async (userData) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      dispatch({ type: AuthActionTypes.CLEAR_ERROR });

      // Simulation d'appel API
      const response = await mockRegisterAPI(userData);

      if (response.success) {
        // Auto-login après inscription
        return await login(userData.email, userData.password);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error.message || "Erreur d'inscription";
      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Fonction de logout
  const handleLogout = async () => {
    try {
      // Appel API de logout si nécessaire
      await mockLogoutAPI();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Nettoyer le localStorage
      localStorage.removeItem('quiz_token');
      localStorage.removeItem('quiz_refresh_token');
      
      dispatch({ type: AuthActionTypes.LOGOUT });
    }
  };

  // Refresh token
  const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem('quiz_refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await mockRefreshTokenAPI(refreshToken);

      if (response.success) {
        const { token, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem('quiz_token', token);
        localStorage.setItem('quiz_refresh_token', newRefreshToken);

        dispatch({
          type: AuthActionTypes.REFRESH_TOKEN,
          payload: { token, refreshToken: newRefreshToken }
        });

        return true;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await handleLogout();
      return false;
    }
  };

  // Mettre à jour le profil utilisateur
  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });

      const response = await mockUpdateProfileAPI(state.token, profileData);

      if (response.success) {
        dispatch({
          type: AuthActionTypes.UPDATE_USER,
          payload: response.data.user
        });
        return { success: true };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error.message || 'Erreur de mise à jour';
      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: false });
    }
  };

  // Changer le mot de passe
  const changePassword = async (currentPassword, newPassword) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });

      const response = await mockChangePasswordAPI(
        state.token, 
        currentPassword, 
        newPassword
      );

      if (response.success) {
        return { success: true };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error.message || 'Erreur de changement de mot de passe';
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: false });
    }
  };

  // Vérifier les permissions
  const hasRole = (role) => {
    return state.user?.role === role;
  };

  const hasPermission = (permission) => {
    const userPermissions = state.user?.permissions || [];
    return userPermissions.includes(permission);
  };

  // Vérifier si l'utilisateur est pro
  const isProUser = () => {
    return state.user?.isPro === true;
  };

  // Effacer les erreurs
  const clearError = () => {
    dispatch({ type: AuthActionTypes.CLEAR_ERROR });
  };

  // Intercepteur pour les requêtes API (à utiliser avec axios)
  const authInterceptor = (config) => {
    if (state.token) {
      config.headers.Authorization = `Bearer ${state.token}`;
    }
    return config;
  };

  // Valeur du contexte
  const contextValue = {
    // State
    ...state,
    
    // Méthodes d'authentification
    login,
    register,
    logout: handleLogout,
    refreshToken: refreshAuthToken,
    
    // Méthodes de profil
    updateProfile,
    changePassword,
    
    // Méthodes de vérification
    hasRole,
    hasPermission,
    isProUser,
    isAuthenticated: state.status === AuthState.AUTHENTICATED,
    
    // Utilitaires
    clearError,
    authInterceptor
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock APIs - À remplacer par vos vraies APIs
const mockLoginAPI = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler latence réseau

  // Simulation de validation
  if (email === 'admin@quiz.ma' && password === 'password') {
    const user = {
      id: 1,
      email: 'admin@quiz.ma',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      university: 'Université Hassan II',
      faculty: 'Faculté des Sciences',
      level: 'S6',
      avatar: null,
      isPro: true,
      subscription: 'premium',
      permissions: ['create_quiz', 'manage_users', 'view_analytics']
    };

    const token = 'mock_jwt_token_here';
    const refreshToken = 'mock_refresh_token_here';

    return { success: true, data: { user, token, refreshToken } };
  }

  if (email === 'etudiant@quiz.ma' && password === 'password') {
    const user = {
      id: 2,
      email: 'etudiant@quiz.ma',
      firstName: 'Étudiant',
      lastName: 'Marocain',
      role: 'student',
      university: 'Université Mohammed V',
      faculty: 'FST',
      level: 'S3',
      avatar: null,
      isPro: false,
      subscription: 'free',
      permissions: ['take_quiz', 'view_profile']
    };

    const token = 'mock_jwt_token_student';
    const refreshToken = 'mock_refresh_token_student';

    return { success: true, data: { user, token, refreshToken } };
  }

  return { success: false, message: 'Email ou mot de passe incorrect' };
};

const mockRegisterAPI = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulation d'inscription réussie
  return { success: true, message: 'Inscription réussie' };
};

const mockLogoutAPI = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

const mockRefreshTokenAPI = async (refreshToken) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulation de refresh token réussi
  const newToken = 'new_mock_jwt_token';
  const newRefreshToken = 'new_mock_refresh_token';
  
  return { success: true, data: { token: newToken, refreshToken: newRefreshToken } };
};

const mockUpdateProfileAPI = async (token, profileData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulation de mise à jour réussie
  const updatedUser = {
    ...profileData,
    updatedAt: new Date().toISOString()
  };
  
  return { success: true, data: { user: updatedUser } };
};

const mockChangePasswordAPI = async (token, currentPassword, newPassword) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulation de changement réussi
  return { success: true, message: 'Mot de passe changé avec succès' };
};

export default AuthContext;