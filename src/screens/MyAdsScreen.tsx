import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import { ItemCard } from '../components/ItemCard';

interface Ad {
  id: string;
  title: string;
  price: string;
  location: string;
  [key: string]: any; 
}

interface MyAdsScreenProps {
  ads: Ad[];
  onNavigateBack: () => void;
  onSelectItem: (item: Ad) => void;
}

export const MyAdsScreen: React.FC<MyAdsScreenProps> = ({
  ads,
  onNavigateBack,
  onSelectItem,
}) => {
  const renderItem = ({ item }: { item: Ad }) => (
    <View style={styles.cardContainer}>
      <ItemCard
        title={item.title}
        price={item.price}
        location={item.location || "Unknown Location"}
        onPress={() => onSelectItem(item)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Ads</Text>
        <View style={{ width: 40 }} />
      </View>

      {ads.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't posted any ads yet.</Text>
          <Text style={styles.emptySubText}>Click on the "Sell" button to post your first ad!</Text>
        </View>
      ) : (
        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 30,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  cardContainer: {
    flex: 1 / 2,
    alignItems: 'center',
    marginBottom: 20,
  },
}); 