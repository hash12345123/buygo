import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

interface SelectCategoryScreenProps {
  onSelectCategory: (category: string) => void;
  onNavigateBack: () => void;
}

const categories = [
  'Mobiles', 'Vehicles', 'Property for sale', 'Property for rent',
  'Electronics', 'Animals', 'Furniture', 'Fashion',
  'Gaming', 'Books', 'Sports', 'Jobs', 'Other'
];

export const SelectCategoryScreen: React.FC<SelectCategoryScreenProps> = ({
  onSelectCategory,
  onNavigateBack,
}) => {
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => onSelectCategory(item)}>
      <Text style={styles.categoryText}>{item}</Text>
      <Text style={styles.arrowText}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select a Category</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  backButton: {
    marginTop: 15,
    padding: 5,
  },
  backButtonText: {
    fontSize: 30,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  arrowText: {
    fontSize: 20,
    color: '#ccc',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 20,
  },
}); 