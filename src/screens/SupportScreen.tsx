import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Screen, Card } from '../components';
import { theme } from '../constants';

const FAQItem: React.FC<{ 
  question: string; 
  answer: string; 
  isExpanded: boolean; 
  onToggle: () => void;
}> = ({ question, answer, isExpanded, onToggle }) => (
  <TouchableOpacity onPress={onToggle}>
    <Card style={styles.faqItem}>
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{question}</Text>
        <Text style={styles.faqToggle}>{isExpanded ? '−' : '+'}</Text>
      </View>
      {isExpanded && (
        <Text style={styles.faqAnswer}>{answer}</Text>
      )}
    </Card>
  </TouchableOpacity>
);

export const SupportScreen: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const faqData = [
    {
      id: '1',
      question: 'How long does the recovery process take?',
      answer: 'The complete recovery process typically takes 12-18 months. The first 10 days are critical for healing, followed by gradual hair growth over the following months.'
    },
    {
      id: '2',
      question: 'When can I wash my hair after the procedure?',
      answer: 'You can start gentle hair washing after 48 hours using the recommended shampoo. Avoid rubbing or scratching the transplanted area.'
    },
    {
      id: '3',
      question: 'What medications should I take?',
      answer: 'Follow your doctor\'s prescription for antibiotics and pain medication. You may also be prescribed hair growth supplements like biotin.'
    },
    {
      id: '4',
      question: 'When will I see results?',
      answer: 'Initial hair growth begins around 3-4 months, with significant results visible at 6-8 months. Full results are typically seen at 12-18 months.'
    },
    {
      id: '5',
      question: 'Can I exercise after the procedure?',
      answer: 'Light activities are allowed after 1 week. Avoid heavy exercise, swimming, or activities that cause sweating for the first 2 weeks.'
    },
    {
      id: '6',
      question: 'What should I avoid after the procedure?',
      answer: 'Avoid smoking, alcohol, direct sun exposure, and swimming for at least 2 weeks. Also avoid touching or scratching the transplanted area.'
    },
    {
      id: '7',
      question: 'How many grafts will I need?',
      answer: 'The number of grafts depends on your hair loss pattern and desired density. Your doctor will determine the optimal number during consultation.'
    },
    {
      id: '8',
      question: 'Is the procedure painful?',
      answer: 'The procedure is performed under local anesthesia, so you should not feel pain during the surgery. Some discomfort may occur during the recovery period.'
    }
  ];

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <Text style={styles.sectionSubtitle}>Find answers to common questions about hair transplant recovery</Text>
        </View>

        <View style={styles.faqSection}>
          {faqData.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isExpanded={expandedFAQ === faq.id}
              onToggle={() => handleFAQToggle(faq.id)}
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  headerSection: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  faqSection: {
    marginBottom: theme.spacing.xl,
  },
  faqItem: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  faqToggle: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  faqAnswer: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginTop: theme.spacing.md,
  },
});
