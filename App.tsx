import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as AuthSession from 'expo-auth-session';
import { User, AuthUser, LoginCredentials } from './src/types';
import { authService } from './src/services/auth';
import { storage } from './src/utils';
import { STORAGE_KEYS, theme } from './src/constants';
import { BottomTabBar } from './src/components/layout';
import { DashboardScreen, RecoveryTrackingScreen, SupportScreen, TreatmentsScreen, ProfileScreen } from './src/screens';
import { RecoveryProvider } from './src/contexts/RecoveryContext';
import { TodosProvider } from './src/contexts/TodosContext';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('Dashboard');

  // Initialize auth
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const savedUser = await storage.getItem<AuthUser>(STORAGE_KEYS.USER_DATA);
      if (savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setIsLoading(true);
    try {
      const authUser = await authService.loginWithCredentials({ email, password });
      if (authUser) {
        setUser(authUser);
        setIsAuthenticated(true);
        await storage.setItem(STORAGE_KEYS.USER_DATA, authUser);
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const authUser = await authService.loginWithGoogle();
      if (authUser) {
        setUser(authUser);
        setIsAuthenticated(true);
        await storage.setItem(STORAGE_KEYS.USER_DATA, authUser);
      } else {
        Alert.alert('Error', 'Google login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    await storage.removeItem(STORAGE_KEYS.USER_DATA);
    setActiveTab('Dashboard');
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardScreen onNavigate={setActiveTab} onLogout={handleLogout} />;
      case 'Recovery':
        return <RecoveryTrackingScreen />;
      case 'Support':
        return <SupportScreen />;
      case 'Treatments':
        return <TreatmentsScreen />;
      case 'Profile':
        return <ProfileScreen onLogout={handleLogout} user={user} />;
      default:
        return <DashboardScreen onNavigate={setActiveTab} onLogout={handleLogout} />;
    }
  };

  if (isAuthenticated) {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={MD3LightTheme}>
          <RecoveryProvider>
            <TodosProvider>
              <SafeAreaView style={styles.appContainer} edges={['top', 'left', 'right']}>
                <StatusBar style="auto" />
                <View style={styles.content}>
                  {renderActiveScreen()}
                </View>
                <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
              </SafeAreaView>
            </TodosProvider>
          </RecoveryProvider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.loginContainer}>
        <StatusBar style="auto" />
        
        <View style={styles.loginContent}>
          <View style={styles.logoSection}>
            <Text style={styles.logoIcon}>🌱</Text>
            <Text style={styles.logoTitle}>Hair Clinic</Text>
            <Text style={styles.logoSubtitle}>Hair Transplant Clinic</Text>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.formTitle}>Sign In</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={theme.colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={theme.colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <TouchableOpacity
              style={[styles.googleButton, isLoading && styles.buttonDisabled]}
              onPress={handleGoogleLogin}
              disabled={isLoading}
            >
              <Text style={styles.googleButtonText}>
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loginContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl * 2,
  },
  logoIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  logoTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  logoSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: theme.spacing.xl,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    fontSize: 16,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  googleButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  googleButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: theme.colors.border,
    opacity: 0.6,
  }
});