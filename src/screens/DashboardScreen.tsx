import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Screen, Card, Button } from '../components';
import { theme } from '../constants';
import { useRecovery } from '../contexts/RecoveryContext';

const HeaderCard: React.FC<{ 
  userName: string; 
  notifications: number;
  progress: number;
  days: number;
  stages: { completed: number; total: number };
}> = ({ userName, notifications, progress, days, stages }) => (
  <View style={styles.headerCard}>
    <View style={styles.headerTop}>
      <View>
        <Text style={styles.headerGreetingSmall}>Good day,</Text>
        <Text style={styles.headerGreeting}>{userName}</Text>
      </View>
      <View style={styles.notificationButton}>
        <IconButton
          icon="bell"
          size={24}
          iconColor="#FFFFFF"
          style={styles.bellIcon}
        />
        {notifications > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>{notifications}</Text>
          </View>
        )}
      </View>
    </View>
    
    <View style={styles.progressCard}>
      <Text style={styles.progressTitle}>Recovery progress</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressDays}>Day {days}</Text>
      </View>
      <Text style={styles.progressDetails}>
        {progress}% completed • {stages.completed} of {stages.total} stages
      </Text>
    </View>
  </View>
);

const MetricCard: React.FC<{ 
  value: string; 
  label: string;
}> = ({ value, label }) => (
  <Card style={styles.metricCard}>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </Card>
);

const ReminderItem: React.FC<{ 
  title: string; 
  time: string; 
  type: 'medication' | 'care' | 'consultation' | 'vitamins';
  completed?: boolean;
  onComplete?: () => void;
}> = ({ title, time, type, completed, onComplete }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication': return 'pill';
      case 'care': return 'water';
      case 'consultation': return 'calendar-clock';
      case 'vitamins': return 'pill';
      default: return 'calendar-clock';
    }
  };

  return (
    <Card style={[styles.reminderCard, completed && styles.reminderCompleted]}>
      <View style={styles.reminderIcon}>
        <IconButton
          icon={getTypeIcon(type)}
          size={20}
          iconColor="#6B7280"
          style={styles.reminderIconButton}
        />
      </View>
      <View style={styles.reminderContent}>
        <Text style={[styles.reminderTitle, completed && styles.reminderTitleCompleted]}>
          {title}
        </Text>
        <Text style={styles.reminderTime}>{time}</Text>
      </View>
      {!completed && onComplete && (
        <TouchableOpacity style={styles.doneButton} onPress={onComplete}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      )}
    </Card>
  );
};

export const DashboardScreen: React.FC<{ onNavigate: (screen: string) => void; onLogout: () => void }> = ({ onNavigate, onLogout }) => {
  const { progress } = useRecovery();
  const recoveryProgress = progress;

  const handleReminderComplete = (title: string) => {
    Alert.alert('Reminder Completed', `${title} marked as completed`);
  };

  const handleViewAllReminders = () => {
    Alert.alert('All Reminders', 'View all reminders feature coming soon');
  };

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HeaderCard
          userName="Roman Stadnyk"
          notifications={3}
          progress={35}
          days={14}
          stages={{ completed: 2, total: 6 }}
        />

        <View style={styles.metricsContainer}>
          <MetricCard value="14" label="Days post-op" />
          <MetricCard value="2800" label="Grafts" />
          <MetricCard value="98%" label="Survival rate" />
        </View>

        <View style={styles.remindersSection}>
          <View style={styles.remindersHeader}>
            <Text style={styles.remindersTitle}>Today's reminders</Text>
            <TouchableOpacity onPress={handleViewAllReminders}>
              <Text style={styles.viewAllLink}>All</Text>
            </TouchableOpacity>
          </View>
          
          <ReminderItem
            title="Take Finasteride"
            time="09:00"
            type="medication"
            completed={true}
          />
          <ReminderItem
            title="Apply serum"
            time="12:00"
            type="care"
            onComplete={() => handleReminderComplete('Apply serum')}
          />
          <ReminderItem
            title="Doctor consultation"
            time="14:30"
            type="consultation"
            onComplete={() => handleReminderComplete('Doctor consultation')}
          />
          <ReminderItem
            title="B-complex vitamins"
            time="20:00"
            type="vitamins"
            onComplete={() => handleReminderComplete('B-complex vitamins')}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerCard: {
    backgroundColor: theme.colors.primary,
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl * 1.5,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  headerGreetingSmall: {
    fontSize: 14,
    color: '#CCFBF1',
    marginBottom: 2,
  },
  headerGreeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationButton: {
    position: 'relative',
  },
  bellIcon: {
    margin: 0,
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressCard: {
    backgroundColor: theme.colors.medical,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: theme.spacing.sm,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginRight: theme.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressDays: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressDetails: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  metricCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  metricLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  remindersSection: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  remindersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  remindersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  viewAllLink: {
    fontSize: 16,
    color: theme.colors.secondary,
    fontWeight: '600',
  },
  reminderCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  reminderCompleted: {
    opacity: 0.6,
  },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  reminderIconButton: {
    margin: 0,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  reminderTitleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  reminderTime: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  doneButton: {
    backgroundColor: '#E8F5E8',
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  doneButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
});

