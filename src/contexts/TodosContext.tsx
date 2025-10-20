import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../constants';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodosContextType = {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(API_ENDPOINTS.TODOS);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Todo[] = await res.json();
      setTodos(data.slice(0, 12));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <TodosContext.Provider value={{ todos, isLoading, error, refresh }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = (): TodosContextType => {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error('useTodos must be used within TodosProvider');
  return ctx;
};


