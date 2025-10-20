import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        setError(response.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUsers = useCallback(async () => {
    await fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    error,
    refreshUsers,
    fetchUsers,
  };
};
