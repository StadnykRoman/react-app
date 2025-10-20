import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../../constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'small',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const mode = variant === 'outline' ? 'outlined' : 'contained';
  const compact = size === 'small';
  const buttonColor = mode === 'contained'
    ? (variant === 'danger'
        ? theme.colors.error
        : variant === 'secondary'
          ? theme.colors.accent
          : theme.colors.secondary)
    : undefined;
  const textColor = mode === 'contained' ? '#FFFFFF' : theme.colors.text;
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[styles.button, style]}
      contentStyle={compact ? styles.compactContent : undefined}
      labelStyle={[styles.label, textStyle]}
      buttonColor={buttonColor}
      textColor={textColor}
    >
      {title}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  compactContent: {
    height: 36,
  },
  label: {
    fontWeight: '600',
  },
});
