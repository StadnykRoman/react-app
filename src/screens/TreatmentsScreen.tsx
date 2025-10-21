import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Screen, Card, Button } from '../components';
import { theme } from '../constants';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: 'fue' | 'fut' | 'prp' | 'mesotherapy';
  available: boolean;
}

const ServiceItem: React.FC<{ 
  service: Service; 
  onBook: (service: Service) => void;
}> = ({ service, onBook }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fue': return 'leaf';
      case 'fut': return 'scissors-cutting';
      case 'prp': return 'water';
      case 'mesotherapy': return 'pill';
      default: return 'hospital';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'fue': return 'FUE';
      case 'fut': return 'FUT';
      case 'prp': return 'PRP';
      case 'mesotherapy': return 'Mesotherapy';
      default: return 'Other';
    }
  };

  return (
    <Card style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <View style={styles.serviceIcon}>
          <IconButton
            icon={getCategoryIcon(service.category)}
            size={24}
            iconColor={theme.colors.primary}
            style={styles.categoryIconButton}
          />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.serviceCategory}>{getCategoryName(service.category)}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </View>
        <View style={styles.servicePrice}>
          <Text style={styles.priceText}>{service.price}₴</Text>
          <Text style={styles.durationText}>{service.duration}</Text>
        </View>
      </View>
      
      <View style={styles.serviceFooter}>
        <View style={styles.serviceDetails}>
          <Text style={styles.detailText}>Duration: {service.duration}</Text>
          <Text style={styles.detailText}>
            Status: {service.available ? 'Available' : 'Unavailable'}
          </Text>
        </View>
        <Button 
          title="Book Now" 
          onPress={() => onBook(service)} 
          size="small" 
          style={[
            styles.bookButton,
            !service.available && styles.bookButtonDisabled
          ]}
          disabled={!service.available}
        />
      </View>
    </Card>
  );
};

export const TreatmentsScreen: React.FC = () => {
  const [services] = useState<Service[]>([
    {
      id: 1,
      name: 'FUE Hair Transplant',
      description: 'Minimally invasive hair transplant technique',
      price: 15000,
      duration: '4-6 hours',
      category: 'fue',
      available: true,
    },
    {
      id: 2,
      name: 'FUT Hair Transplant',
      description: 'Classic technique using strip method',
      price: 12000,
      duration: '6-8 hours',
      category: 'fut',
      available: true,
    },
    {
      id: 3,
      name: 'PRP Therapy',
      description: 'Plasma therapy for hair growth stimulation',
      price: 3000,
      duration: '1 hour',
      category: 'prp',
      available: true,
    },
    {
      id: 4,
      name: 'Hair Mesotherapy',
      description: 'Vitamin and mineral injections into scalp',
      price: 2500,
      duration: '45 minutes',
      category: 'mesotherapy',
      available: false,
    },
  ]);

  const handleBookService = (service: Service) => {
    Alert.alert(
      'Book Procedure',
      `Do you want to book "${service.name}"?\n\nPrice: ${service.price}₴\nDuration: ${service.duration}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => {
            Alert.alert(
              'Booking Confirmed',
              'Your booking will be confirmed by administrator within 24 hours. You will receive notification with details.',
              [{ text: 'OK' }]
            );
          }
        },
      ]
    );
  };

  const renderService = ({ item }: { item: Service }) => (
    <ServiceItem service={item} onBook={handleBookService} />
  );

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          <Text style={styles.sectionSubtitle}>Choose a procedure and book an appointment</Text>
        </View>
        
        <FlatList
          data={services}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderService}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  listContainer: {
    paddingBottom: theme.spacing.xl,
  },
  serviceCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  categoryIconButton: {
    margin: 0,
  },
  serviceInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  serviceCategory: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  serviceDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  servicePrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  durationText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  serviceDetails: {
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
  },
  bookButtonDisabled: {
    backgroundColor: theme.colors.border,
    opacity: 0.6,
  },
});
