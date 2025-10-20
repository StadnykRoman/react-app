import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Screen, Card, Button } from '../components';
import { RecoveryMilestone, RecoveryTask } from '../types';
import { useRecovery } from '../contexts/RecoveryContext';
import { theme } from '../constants';
import { recoveryService } from '../services';

const TaskItem: React.FC<{ 
  task: RecoveryTask; 
  onToggle: (taskId: string) => void;
}> = ({ task, onToggle }) => {
  const getCategoryIcon = (_category: string) => '';

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medication': return theme.colors.primary;
      case 'care': return theme.colors.medical;
      case 'photo': return theme.colors.secondary;
      case 'checkup': return theme.colors.warning;
      case 'lifestyle': return theme.colors.accent;
      default: return theme.colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.taskItem,
        task.isCompleted && styles.taskCompleted
      ]}
      onPress={() => onToggle(task.id)}
    >
      <View style={styles.taskHeader}>
        <View style={styles.taskIconSpacer} />
        <View style={styles.taskContent}>
          <Text style={[
            styles.taskTitle,
            task.isCompleted && styles.taskTitleCompleted
          ]}>
            {task.title}
          </Text>
          <Text style={[
            styles.taskDescription,
            task.isCompleted && styles.taskDescriptionCompleted
          ]}>
            {task.description}
          </Text>
        </View>
        <View style={[
          styles.checkbox,
          task.isCompleted && styles.checkboxCompleted
        ]}>
          {task.isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MilestoneCard: React.FC<{ 
  milestone: RecoveryMilestone; 
  onTaskToggle: (taskId: string) => void;
}> = ({ milestone, onTaskToggle }) => {
  const completedTasks = milestone.tasks.filter(task => task.isCompleted).length;
  const totalTasks = milestone.tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <Card style={styles.milestoneCard}>
      <View style={styles.milestoneHeader}>
        <View style={styles.milestoneInfo}>
          <Text style={styles.milestoneTitle}>{milestone.title}</Text>
          <Text style={styles.milestoneTimeframe}>{milestone.timeframe}</Text>
          <Text style={styles.milestoneDescription}>{milestone.description}</Text>
        </View>
        <View style={[
          styles.milestoneStatus,
          milestone.isCompleted && styles.milestoneStatusCompleted
        ]}>
          <Text style={[
            styles.milestoneStatusText,
            milestone.isCompleted && styles.milestoneStatusTextCompleted
          ]}>
            {milestone.isCompleted ? '✓' : `${completedTasks}/${totalTasks}`}
          </Text>
        </View>
      </View>
      
      <View style={styles.progressBar}>
        <View style={[
          styles.progressFill,
          { width: `${progressPercentage}%` }
        ]} />
      </View>
      
      <View style={styles.tasksContainer}>
        {milestone.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onTaskToggle}
          />
        ))}
      </View>
    </Card>
  );
};

export const RecoveryTrackingScreen: React.FC = () => {
  const { milestones, toggleTask, progress } = useRecovery();

  const handleTaskToggle = (taskId: string) => toggleTask(taskId);

  const overallProgress = progress.percentage;

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Recovery Progress</Text>
          <Text style={styles.sectionSubtitle}>Track your hair transplant recovery journey</Text>
          
          <View style={styles.overallProgress}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>Overall Progress</Text>
              <Text style={styles.progressPercentage}>{Math.round(overallProgress)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${overallProgress}%` }
              ]} />
            </View>
          </View>
        </View>
        
        <View style={styles.milestonesContainer}>
          {milestones.map((milestone) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              onTaskToggle={handleTaskToggle}
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  headerSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  overallProgress: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  milestonesContainer: {
    paddingBottom: theme.spacing.xl,
  },
  milestoneCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  milestoneInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  milestoneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  milestoneTimeframe: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  milestoneDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  milestoneStatus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneStatusCompleted: {
    backgroundColor: theme.colors.success,
  },
  milestoneStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
  },
  milestoneStatusTextCompleted: {
    color: '#FFFFFF',
  },
  tasksContainer: {
    marginTop: theme.spacing.md,
  },
  taskItem: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  taskCompleted: {
    backgroundColor: '#F0F9F0',
    borderColor: theme.colors.success,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    fontSize: 0,
    marginRight: 0,
    width: 0,
    textAlign: 'left',
  },
  taskIconSpacer: {
    width: 0,
    marginRight: 0,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  taskDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  taskDescriptionCompleted: {
    color: theme.colors.textSecondary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.md,
  },
  checkboxCompleted: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
