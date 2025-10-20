import { useEffect } from 'react';
import { useAuthLogic } from './useAuthLogic';

export const useAuth = () => {
  const auth = useAuthLogic();
  useEffect(() => {
    auth.initializeAuth();
  }, [auth.initializeAuth]);

  return {
    isAuthenticated: Boolean(auth.isAuthenticated),
    user: auth.user,
    isLoading: Boolean(auth.isLoading),
    error: auth.error,
    login: auth.login,
    loginWithGoogle: auth.loginWithGoogle,
    logout: auth.logout,
    clearError: auth.clearError,
  };
};