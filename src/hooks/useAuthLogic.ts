import { useState, useCallback } from 'react';
import { AuthUser, LoginCredentials } from '../types';
import { authService } from '../services/auth';
import { storage } from '../utils';
import { STORAGE_KEYS } from '../constants';

export const useAuthLogic = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const authUser = await authService.loginWithCredentials(credentials);
      if (authUser) {
        setUser(authUser);
        setIsAuthenticated(true);
        await storage.setItem(STORAGE_KEYS.USER_DATA, authUser);
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const authUser = await authService.loginWithGoogle();
      if (authUser) {
        setUser(authUser);
        setIsAuthenticated(true);
        await storage.setItem(STORAGE_KEYS.USER_DATA, authUser);
        return true;
      } else {
        setError('Google login failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      await storage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const initializeAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const savedUser = await storage.getItem<AuthUser>(STORAGE_KEYS.USER_DATA);
      if (savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Failed to initialize auth:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    loginWithGoogle,
    logout,
    clearError,
    initializeAuth,
  };
};
