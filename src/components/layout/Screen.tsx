import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({ children, style, safeArea = true }) => {
  const Container = safeArea ? SafeAreaView : View;
  
  return (
    <Container style={[styles.screen, style]} edges={safeArea ? ['bottom', 'left', 'right'] : undefined}>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
