import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Screen, Card } from '../components';
import { theme } from '../constants';

interface Article {
  id: string;
  title: string;
  content: string;
  category: 'care' | 'procedure' | 'recovery' | 'general';
  type: 'article' | 'video';
  isFavorite?: boolean;
}

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

const ArticleItem: React.FC<{ 
  article: Article; 
  onToggleFavorite: (id: string) => void;
}> = ({ article, onToggleFavorite }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'care': return '🧴';
      case 'procedure': return '🏥';
      case 'recovery': return '🌱';
      case 'general': return '📖';
      default: return '📄';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'video' ? '🎥' : '📄';
  };

  return (
    <Card style={styles.articleCard}>
      <View style={styles.articleHeader}>
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <View style={styles.articleMeta}>
            <Text style={styles.articleCategory}>{getCategoryIcon(article.category)}</Text>
            <Text style={styles.articleType}>{getTypeIcon(article.type)}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(article.id)}
        >
          <Text style={styles.favoriteIcon}>
            {article.isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.articleContent} numberOfLines={3}>
        {article.content}
      </Text>
    </Card>
  );
};

export const SupportScreen: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'faq' | 'articles'>('faq');

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleToggleFavorite = (articleId: string) => {
    Alert.alert('Added to Favorites', 'Article added to your saved materials');
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
      answer: 'Gentle hair washing can begin after 48 hours using the recommended shampoo. Avoid rubbing or scratching the transplanted area.'
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
      answer: 'Light physical activities are allowed after 1 week. Avoid heavy exercise, swimming, or activities that cause sweating for the first 2 weeks.'
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

  const articlesData: Article[] = [
    {
      id: '1',
      title: 'Hair Care After Transplant',
      content: 'Proper hair care after transplant is critically important for successful results. In the first days after the procedure, it is important to follow all doctor\'s recommendations...',
      category: 'care',
      type: 'article',
    },
    {
      id: '2',
      title: 'Video: FUE Procedure',
      content: 'Detailed video about FUE (Follicular Unit Extraction) procedure - modern hair transplant technique with minimal intervention...',
      category: 'procedure',
      type: 'video',
    },
    {
      id: '3',
      title: 'Recovery Stages',
      content: 'Detailed description of all recovery stages after hair transplant, including what to expect at each stage...',
      category: 'recovery',
      type: 'article',
    },
    {
      id: '4',
      title: 'Common Patient Mistakes',
      content: 'Overview of the most common mistakes to avoid during recovery after hair transplant...',
      category: 'general',
      type: 'article',
    },
  ];

  const filteredArticles = articlesData.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Information Section</Text>
          <Text style={styles.sectionSubtitle}>FAQ, articles and useful materials</Text>
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search articles and FAQ..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabSection}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
            onPress={() => setActiveTab('faq')}
          >
            <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>
              FAQ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'articles' && styles.activeTab]}
            onPress={() => setActiveTab('articles')}
          >
            <Text style={[styles.tabText, activeTab === 'articles' && styles.activeTabText]}>
              Articles
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'faq' && (
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
        )}

        {activeTab === 'articles' && (
          <View style={styles.articlesSection}>
            {filteredArticles.map((article) => (
              <ArticleItem
                key={article.id}
                article={article}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </View>
        )}
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
    marginBottom: theme.spacing.lg,
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
  searchSection: {
    marginBottom: theme.spacing.lg,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: 16,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
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
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '600',
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
  articlesSection: {
    marginBottom: theme.spacing.xl,
  },
  articleCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  articleInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleCategory: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  articleType: {
    fontSize: 16,
  },
  favoriteButton: {
    padding: theme.spacing.xs,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  articleContent: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});
