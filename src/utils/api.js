import axios from 'axios';

// Base URL can be provided via Vite env: VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token from localStorage automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('quiz_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

/**
 * Attempt to refresh access token using the refresh token in localStorage.
 * If successful, updates localStorage and axios auth header.
 */
export async function refreshAuthToken() {
  try {
    const refreshToken = localStorage.getItem('quiz_refresh_token');
    if (!refreshToken) return { success: false, error: 'No refresh token' };

    const res = await api.post('/auth/refresh', { refreshToken });
    const { token, refreshToken: newRefresh } = res.data;
    if (token) {
      localStorage.setItem('quiz_token', token);
      if (newRefresh) localStorage.setItem('quiz_refresh_token', newRefresh);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      return { success: true, token };
    }

    return { success: false, error: 'Invalid refresh response' };
  } catch (err) {
    return { success: false, error: err?.response?.data || err.message };
  }
}

// --- Auth ---
export async function login(email, password) {
  try {
    const res = await api.post('/auth/login', { email, password });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function register(userData) {
  try {
    const res = await api.post('/auth/register', userData);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function logout() {
  try {
    // call API if available
    await api.post('/auth/logout');
  } catch (err) {
    // ignore
  } finally {
    localStorage.removeItem('quiz_token');
    localStorage.removeItem('quiz_refresh_token');
    delete api.defaults.headers.common.Authorization;
  }
}

// --- Quizzes ---
export async function getQuizzes(params = {}) {
  try {
    const res = await api.get('/quizzes', { params });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function getQuiz(quizId) {
  try {
    const res = await api.get(`/quizzes/${quizId}`);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function getQuestions(quizId) {
  try {
    const res = await api.get(`/quizzes/${quizId}/questions`);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function submitAttempt(quizId, attemptPayload) {
  try {
    const res = await api.post(`/quizzes/${quizId}/attempts`, attemptPayload);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function getLeaderboard(quizId) {
  try {
    const res = await api.get(`/quizzes/${quizId}/leaderboard`);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err?.response?.data || err.message };
  }
}

// --- Profile ---
export async function getProfile() {
  try {
    const res = await api.get('/me');
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function updateProfile(profileData) {
  try {
    const res = await api.put('/me', profileData);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err?.response?.data || err.message };
  }
}

export default api;
