import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Screen, Card, Button } from '../components';
import { AuthUser } from '../types';
import { theme } from '../constants';

const ProfileItem: React.FC<{ title: string; value: string; onPress?: () => void }> = ({
  title,
  value,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} disabled={!onPress}>
    <Card style={StyleSheet.flatten([styles.profileItem, !onPress ? styles.profileItemDisabled : null])}>
      <View style={styles.profileContent}>
        <Text style={styles.profileTitle}>{title}</Text>
        <Text style={styles.profileValue}>{value}</Text>
      </View>
      {onPress && <Text style={styles.profileArrow}>›</Text>}
    </Card>
  </TouchableOpacity>
);

export const ProfileScreen: React.FC<{ onLogout: () => void; user: AuthUser | null }> = ({ onLogout, user }) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: onLogout },
      ]
    );
  };

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <ProfileItem
            title="Full Name"
            value={user?.name || 'Not specified'}
          />
          <ProfileItem
            title="Email"
            value={user?.email || 'Not specified'}
          />
        </View>

        <View>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="danger"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  profileItemDisabled: {
    opacity: 0.7,
  },
  profileIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
    width: 30,
    textAlign: 'center',
  },
  profileContent: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  profileValue: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  profileArrow: {
    fontSize: 20,
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginHorizontal: theme.spacing.md,
    width: '100%',
    alignSelf: 'center',
  },
});
