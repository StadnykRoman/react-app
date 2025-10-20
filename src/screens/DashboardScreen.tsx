import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Screen, Card, Button } from '../components';
import { theme } from '../constants';
import { useRecovery } from '../contexts/RecoveryContext';

const ProgressCard: React.FC<{ 
  title: string; 
  progress: number; 
  total: number; 
  description: string;
}> = ({ title, progress, total, description }) => {
  const percentage = (progress / total) * 100;
  
  return (
    <Card style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>{title}</Text>
        <Text style={styles.progressValue}>{progress}/{total}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.progressDescription}>{description}</Text>
    </Card>
  );
};

export const DashboardScreen: React.FC<{ onNavigate: (screen: string) => void; onLogout: () => void }> = ({ onNavigate, onLogout }) => {
  const { progress } = useRecovery();
  const recoveryProgress = progress;

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.subtitle}>Your recovery at a glance</Text>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Recovery</Text>
          <ProgressCard
            title="Recovery Tasks"
            progress={recoveryProgress.completedTasks}
            total={recoveryProgress.totalTasks}
            description="Complete daily recovery tasks for optimal results"
          />
          <ProgressCard
            title="Milestones"
            progress={recoveryProgress.completedMilestones}
            total={recoveryProgress.totalMilestones}
            description="Track your recovery milestones over time"
          />
        </View>

        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <Card style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>Follow-up Consultation</Text>
                <Text style={styles.eventDate}>December 20, 2024 at 2:00 PM</Text>
              </View>
              <Button title="View" onPress={() => {}} size="small" style={styles.eventButton} />
            </View>
          </Card>
          
          <Card style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>Medication Reminder</Text>
                <Text style={styles.eventDate}>Take antibiotics - Next dose in 4 hours</Text>
              </View>
              <Button title="Remind" onPress={() => {}} size="small" style={styles.eventButton} />
            </View>
          </Card>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  progressSection: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  progressCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  upcomingSection: {
    marginBottom: theme.spacing.xl,
  },
  eventCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  eventDate: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  eventButton: {
    backgroundColor: theme.colors.primary,
  },
});

