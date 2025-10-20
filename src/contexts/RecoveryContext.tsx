import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { RecoveryMilestone, RecoveryTask } from '../types';
import { recoveryService } from '../services';
import { storage } from '../utils';
import { STORAGE_KEYS } from '../constants';

type RecoveryContextType = {
  milestones: RecoveryMilestone[];
  toggleTask: (taskId: string) => void;
  progress: {
    completedTasks: number;
    totalTasks: number;
    completedMilestones: number;
    totalMilestones: number;
    percentage: number;
  };
};

const RecoveryContext = createContext<RecoveryContextType | undefined>(undefined);

export const RecoveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [milestones, setMilestones] = useState<RecoveryMilestone[]>([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const saved = await storage.getItem<RecoveryMilestone[]>(STORAGE_KEYS.RECOVERY_DATA);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      setMilestones(saved);
    } else {
      setMilestones(recoveryService.getMilestones());
    }
  };

  const persist = async (data: RecoveryMilestone[]) => {
    setMilestones(data);
    await storage.setItem(STORAGE_KEYS.RECOVERY_DATA, data);
  };

  const toggleTask = (taskId: string) => {
    const updated = milestones.map(m => {
      const tasks = m.tasks.map(t => t.id === taskId ? {
        ...t,
        isCompleted: !t.isCompleted,
        completedAt: !t.isCompleted ? new Date().toISOString().split('T')[0] : undefined,
      } : t);
      const isCompleted = tasks.every(t => t.isCompleted);
      return { ...m, tasks, isCompleted };
    });
    persist(updated);
  };

  const progress = useMemo(() => {
    const totalMilestones = milestones.length;
    const completedMilestones = milestones.filter(m => m.isCompleted).length;
    const allTasks: RecoveryTask[] = milestones.flatMap(m => m.tasks);
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(t => t.isCompleted).length;
    const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    return { completedTasks, totalTasks, completedMilestones, totalMilestones, percentage };
  }, [milestones]);

  return (
    <RecoveryContext.Provider value={{ milestones, toggleTask, progress }}>
      {children}
    </RecoveryContext.Provider>
  );
};

export const useRecovery = (): RecoveryContextType => {
  const ctx = useContext(RecoveryContext);
  if (!ctx) throw new Error('useRecovery must be used within RecoveryProvider');
  return ctx;
};


