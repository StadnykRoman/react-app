import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Screen, Card, Button } from '../components';
import { AuthUser } from '../types';
import { theme } from '../constants';

interface Payment {
  id: string;
  date: string;
  amount: number;
  service: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Document {
  id: string;
  name: string;
  type: 'medical' | 'contract' | 'invoice' | 'certificate';
  date: string;
  size: string;
}

const ProfileItem: React.FC<{ 
  title: string; 
  value: string; 
  onPress?: () => void;
  icon?: string;
}> = ({ title, value, onPress, icon }) => (
  <TouchableOpacity onPress={onPress} disabled={!onPress}>
    <Card style={StyleSheet.flatten([styles.profileItem, !onPress ? styles.profileItemDisabled : null])}>
      <View style={styles.profileContent}>
        {icon && (
          <IconButton
            icon={icon}
            size={20}
            iconColor={theme.colors.textSecondary}
            style={styles.profileIconButton}
          />
        )}
        <View style={styles.profileText}>
          <Text style={styles.profileTitle}>{title}</Text>
          <Text style={styles.profileValue}>{value}</Text>
        </View>
      </View>
      {onPress && <Text style={styles.profileArrow}>›</Text>}
    </Card>
  </TouchableOpacity>
);

const PaymentItem: React.FC<{ payment: Payment }> = ({ payment }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return theme.colors.success;
      case 'pending': return theme.colors.warning;
      case 'failed': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Paid';
      case 'pending': return 'Pending';
      case 'failed': return 'Failed';
      default: return status;
    }
  };

  return (
    <Card style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentService}>{payment.service}</Text>
          <Text style={styles.paymentDate}>{payment.date}</Text>
        </View>
        <View style={styles.paymentAmount}>
          <Text style={styles.paymentValue}>{payment.amount}₴</Text>
          <Text style={[styles.paymentStatus, { color: getStatusColor(payment.status) }]}>
            {getStatusText(payment.status)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const DocumentItem: React.FC<{ document: Document }> = ({ document }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medical': return '🏥';
      case 'contract': return '📄';
      case 'invoice': return '🧾';
      case 'certificate': return '📜';
      default: return '📁';
    }
  };

  return (
    <Card style={styles.documentCard}>
      <View style={styles.documentHeader}>
        <Text style={styles.documentIcon}>{getTypeIcon(document.type)}</Text>
        <View style={styles.documentInfo}>
          <Text style={styles.documentName}>{document.name}</Text>
          <Text style={styles.documentMeta}>{document.date} • {document.size}</Text>
        </View>
        <TouchableOpacity style={styles.downloadButton}>
          <IconButton
            icon="download"
            size={20}
            iconColor={theme.colors.primary}
            style={styles.downloadIconButton}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export const ProfileScreen: React.FC<{ onLogout: () => void; user: AuthUser | null }> = ({ onLogout, user }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'payments' | 'documents'>('info');

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

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature will be available in the next version');
  };

  const paymentsData: Payment[] = [
    {
      id: '1',
      date: 'December 15, 2024',
      amount: 15000,
      service: 'FUE Hair Transplant',
      status: 'completed',
    },
    {
      id: '2',
      date: 'December 10, 2024',
      amount: 500,
      service: 'Consultation',
      status: 'completed',
    },
    {
      id: '3',
      date: 'December 20, 2024',
      amount: 3000,
      service: 'PRP Therapy',
      status: 'pending',
    },
  ];

  const documentsData: Document[] = [
    {
      id: '1',
      name: 'Medical Certificate',
      type: 'medical',
      date: 'December 15, 2024',
      size: '2.3 MB',
    },
    {
      id: '2',
      name: 'Service Contract',
      type: 'contract',
      date: 'December 10, 2024',
      size: '1.8 MB',
    },
    {
      id: '3',
      name: 'Invoice',
      type: 'invoice',
      date: 'December 15, 2024',
      size: '0.5 MB',
    },
    {
      id: '4',
      name: 'Quality Certificate',
      type: 'certificate',
      date: 'December 12, 2024',
      size: '1.2 MB',
    },
  ];

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>User Profile</Text>
        </View>

        <View style={styles.tabSection}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
              Information
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'payments' && styles.activeTab]}
            onPress={() => setActiveTab('payments')}
          >
            <Text style={[styles.tabText, activeTab === 'payments' && styles.activeTabText]}>
              Payments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'documents' && styles.activeTab]}
            onPress={() => setActiveTab('documents')}
          >
            <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>
              Documents
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'info' && (
          <View style={styles.infoSection}>
            <Text style={styles.subsectionTitle}>Personal Information</Text>
            <ProfileItem
              title="Full Name"
              value={user?.name || 'Not specified'}
              icon="account"
            />
            <ProfileItem
              title="Email"
              value={user?.email || 'Not specified'}
              icon="email"
            />
            <ProfileItem
              title="Date of Birth"
              value="March 15, 1985"
              icon="cake"
              onPress={() => Alert.alert('Edit', 'Edit feature will be available later')}
            />
            <ProfileItem
              title="Phone"
              value="+380 50 123 45 67"
              icon="phone"
              onPress={() => Alert.alert('Edit', 'Edit feature will be available later')}
            />

            <Text style={styles.subsectionTitle}>Medical Information</Text>
            <ProfileItem
              title="Hair Condition"
              value="Androgenic Alopecia"
              icon="leaf"
              onPress={() => Alert.alert('Medical History', 'Detailed medical history will be available later')}
            />
            <ProfileItem
              title="Procedure Date"
              value="December 1, 2024"
              icon="calendar"
            />
            <ProfileItem
              title="Number of Grafts"
              value="2500 grafts"
              icon="numeric"
            />
            <ProfileItem
              title="Doctor"
              value="Dr. Ivan Petrenko"
              icon="doctor"
            />

            <View style={styles.editSection}>
              <Button
                title="Edit Profile"
                onPress={handleEditProfile}
                style={styles.editButton}
              />
            </View>
          </View>
        )}

        {activeTab === 'payments' && (
          <View style={styles.paymentsSection}>
            <Text style={styles.subsectionTitle}>Payment History</Text>
            {paymentsData.map((payment) => (
              <PaymentItem key={payment.id} payment={payment} />
            ))}
          </View>
        )}

        {activeTab === 'documents' && (
          <View style={styles.documentsSection}>
            <Text style={styles.subsectionTitle}>Signed Documents</Text>
            {documentsData.map((document) => (
              <DocumentItem key={document.id} document={document} />
            ))}
          </View>
        )}

        <View style={styles.logoutSection}>
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
  headerSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  tabSection: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  activeTab: {
    backgroundColor: theme.colors.surface,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: theme.spacing.xl,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  profileItemDisabled: {
    opacity: 0.7,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileIconButton: {
    margin: 0,
    marginRight: theme.spacing.md,
  },
  profileText: {
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
  editSection: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
  },
  paymentsSection: {
    marginBottom: theme.spacing.xl,
  },
  paymentCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentService: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  paymentDate: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  paymentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  paymentStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  documentsSection: {
    marginBottom: theme.spacing.xl,
  },
  documentCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  documentMeta: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  downloadButton: {
    padding: theme.spacing.sm,
  },
  downloadIconButton: {
    margin: 0,
  },
  logoutSection: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
  },
});
