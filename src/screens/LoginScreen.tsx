import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Screen, Header, LoginForm, Button } from '../components';
import { useAuth } from '../hooks/useAuth';
import { LoginCredentials, NavigationParamList } from '../types';
import { theme } from '../constants';

type LoginScreenNavigationProp = StackNavigationProp<NavigationParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, loginWithGoogle, isLoading } = useAuth();

  const handleLogin = async (credentials: LoginCredentials): Promise<boolean> => {
    const success = await login(credentials);
    if (success) {
      navigation.navigate('Home');
    }
    return success;
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Google login failed');
    }
  };

  return (
    <Screen>
      <Header title="Welcome" />
      
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Sign in to continue</Text>
          
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <Button
            title="Continue with Google"
            onPress={handleGoogleLogin}
            variant="outline"
            loading={isLoading}
            disabled={isLoading}
            style={styles.googleButton}
          />
          
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  content: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.text,
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
    marginTop: theme.spacing.sm,
  },
  note: {
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
});
