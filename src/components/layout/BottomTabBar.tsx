import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../constants';

const { width: screenWidth } = Dimensions.get('window');

interface TabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

interface TabItem {
  key: string;
  label: string;
  icon: string;
}

const leftTabs: TabItem[] = [
  { key: 'Dashboard', label: 'Home', icon: '' },
  { key: 'Treatments', label: 'Services', icon: '' },
];

const rightTabs: TabItem[] = [
  { key: 'Support', label: 'FAQ', icon: '' },
  { key: 'Profile', label: 'Profile', icon: '' },
];

export const BottomTabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  const handleCenterButtonPress = () => {
    onTabPress('Recovery');
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {/* Left tabs */}
        <View style={styles.leftTabs}>
          {leftTabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.activeTab,
              ]}
              onPress={() => onTabPress(tab.key)}
            >
              <Text style={[
                styles.label,
                activeTab === tab.key && styles.activeLabel,
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Center button */}
        <TouchableOpacity
          style={styles.centerButton}
          onPress={handleCenterButtonPress}
        >
          <View style={styles.centerButtonInner}>
            <Text style={styles.centerButtonIcon}>✚</Text>
          </View>
        </TouchableOpacity>

        {/* Right tabs */}
        <View style={styles.rightTabs}>
          {rightTabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.activeTab,
              ]}
              onPress={() => onTabPress(tab.key)}
            >
              <Text style={[
                styles.label,
                activeTab === tab.key && styles.activeLabel,
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 0,
    paddingTop: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  leftTabs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
  rightTabs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    minHeight: 70,
  },
  activeTab: {
    backgroundColor: theme.colors.background,
  },
  icon: {
    fontSize: 0,
    marginBottom: 0,
  },
  activeIcon: {
    fontSize: 0,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  centerButton: {
    position: 'absolute',
    top: -25,
    left: screenWidth / 2 - 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  centerButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.surface,
  },
  centerButtonIcon: {
    fontSize: 28,
    color: '#FFFFFF',
  },
});
