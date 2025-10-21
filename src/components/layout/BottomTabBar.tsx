import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
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
  { key: 'Dashboard', label: 'Home', icon: 'home' },
  { key: 'Treatments', label: 'Services', icon: 'hospital' },
];

const rightTabs: TabItem[] = [
  { key: 'Support', label: 'FAQ', icon: 'help-circle' },
  { key: 'Profile', label: 'Profile', icon: 'account' },
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
              <IconButton
                icon={tab.icon}
                size={activeTab === tab.key ? 24 : 22}
                iconColor={activeTab === tab.key ? theme.colors.primary : theme.colors.textSecondary}
                style={styles.iconButton}
              />
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
            <IconButton
              icon="leaf"
              size={32}
              iconColor="#FFFFFF"
              style={styles.centerIconButton}
            />
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
              <IconButton
                icon={tab.icon}
                size={activeTab === tab.key ? 24 : 22}
                iconColor={activeTab === tab.key ? theme.colors.primary : theme.colors.textSecondary}
                style={styles.iconButton}
              />
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
    borderTopWidth: 0,
    paddingBottom: 0,
    paddingTop: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  leftTabs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    gap: theme.spacing.sm,
  },
  rightTabs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    minHeight: 60,
    minWidth: 60,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#E8F5E8',
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconButton: {
    margin: 0,
    marginBottom: theme.spacing.xs,
  },
  label: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  centerButton: {
    position: 'absolute',
    top: -30,
    left: screenWidth / 2 - 35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  centerButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: theme.colors.surface,
  },
  centerIconButton: {
    margin: 0,
  },
});
