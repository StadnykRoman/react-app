import React from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Screen, Card, Button } from '../components';
import { theme } from '../constants';
import { useTodos } from '../contexts/TodosContext';

const TodoItem: React.FC<{ id: number; title: string; completed: boolean }> = ({ id, title, completed }) => (
  <Card style={styles.treatmentCard}>
    <View style={styles.treatmentHeader}>
      <View style={styles.treatmentInfo}>
        <Text style={styles.treatmentName}>{title}</Text>
        <Text style={styles.treatmentCategory}>{completed ? 'Completed' : 'Pending'}</Text>
      </View>
      <Button title="Details" onPress={() => {}} size="small" style={styles.bookButton} />
    </View>
  </Card>
);

export const TreatmentsScreen: React.FC = () => {
  const { todos, isLoading, error, refresh } = useTodos();

  const renderTodo = ({ item }: { item: { id: number; title: string; completed: boolean } }) => (
    <TodoItem id={item.id} title={item.title} completed={item.completed} />
  );

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Todos</Text>
          <Text style={styles.sectionSubtitle}>Pull to refresh</Text>
          {error ? (
            <Card style={styles.treatmentCard}>
              <Text style={styles.treatmentCategory}>{error}</Text>
            </Card>
          ) : null}
        </View>
        
        <FlatList
          data={todos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderTodo}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
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
  treatmentCard: {
    marginBottom: theme.spacing.md,
  },
  treatmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  treatmentCategory: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  treatmentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  treatmentDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  treatmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  treatmentDuration: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
  },
});
