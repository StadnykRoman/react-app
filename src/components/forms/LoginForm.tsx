import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LoginCredentials } from '../../types';
import { validateEmail } from '../../utils';
import { theme } from '../../constants';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<boolean>;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const success = await onSubmit({ email, password });
    if (!success) {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={errors.email}
      />
      
      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        error={errors.password}
      />
      
      <Button
        title="Login"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.md,
  },
});
