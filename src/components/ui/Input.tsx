import React from 'react';
import { View, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import { theme } from '../../constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        mode="outlined"
        style={style}
        error={Boolean(error)}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  input: {},
  inputError: {},
  errorText: {
    fontSize: 14,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
});
