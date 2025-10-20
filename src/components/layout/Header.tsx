import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants';

interface HeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  rightComponent,
  leftComponent,
  style,
}) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.leftSection}>
        {leftComponent}
      </View>
      
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      
      <View style={styles.rightSection}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    flex: 2,
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
