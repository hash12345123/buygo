import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { CategoryCard } from '../components/CategoryCard';
import { HeaderCard } from '../components/HeaderCard';
import { ItemCard } from '../components/ItemCard';

type AuthenticatedScreen = 'Home' | 'Chat' | 'MyAds' | 'Account';

interface HomeScreenProps {
  onSelectItem: (item: any) => void;
  onSellPress: () => void;
  onNavigateTab: (tab: AuthenticatedScreen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectItem, onSellPress, onNavigateTab }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const placeholders = [
    "Search for bike",
    "Search for car", 
    "Search for property"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCardPress = (category: string) => {
    console.log(`Pressed ${category} card`);
    // Add navigation logic here
  };

  const headerCategories = [
    { icon: '🛒', title: 'BuyGo' },
    { icon: '🚗', title: 'Motors' },
    { icon: '🏠', title: 'Property' },
  ];

  const allCategories = [
    { icon: '📱', title: 'Mobiles' },
    { icon: '🚗', title: 'Vehicles' },
    { icon: '🏠', title: 'Property for sale' },
    { icon: '🏘️', title: 'Property for rent' },
    { icon: '💻', title: 'Electronics' },
    { icon: '🐕', title: 'Animals' },
    { icon: '🪑', title: 'Furniture' },
    { icon: '👕', title: 'Fashion' },
    { icon: '🎮', title: 'Gaming' },
    { icon: '📚', title: 'Books' },
    { icon: '🏃', title: 'Sports' },
    { icon: '💼', title: 'Jobs' },
  ];

  const midIndex = Math.ceil(allCategories.length / 2);
  const categoriesRow1 = allCategories.slice(0, midIndex);
  const categoriesRow2 = allCategories.slice(midIndex);

  const recommendedItems = {
    bikes: [
      { id: 'b1', title: 'Mountain Bike', price: '$500', location: 'New York', description: 'A sturdy bike for all terrains.' },
      { id: 'b2', title: 'Road Bike', price: '$750', location: 'Los Angeles', description: 'Light and fast for road racing.' },
      { id: 'b3', title: 'BMX Bike', price: '$300', location: 'Austin', description: 'Perfect for tricks and street riding.' },
      { id: 'b4', title: 'Hybrid Bike', price: '$450', location: 'Seattle', description: 'A versatile bike for commuting and leisure.' },
    ],
    cars: [
      { id: 'c1', title: 'Honda Civic', price: '$20,000', location: 'Chicago', description: 'A reliable and fuel-efficient car.' },
      { id: 'c2', title: 'Ford Mustang', price: '$35,000', location: 'Miami', description: 'An iconic American muscle car.' },
      { id: 'c3', title: 'Toyota Camry', price: '$25,000', location: 'Dallas', description: 'A comfortable and spacious sedan.' },
      { id: 'c4', title: 'Tesla Model 3', price: '$45,000', location: 'San Francisco', description: 'A stylish and high-tech electric car.' },
    ],
    tablets: [
      { id: 't1', title: 'iPad Pro', price: '$999', location: 'San Francisco', description: 'A powerful and versatile tablet for professionals.' },
      { id: 't2', title: 'Samsung Galaxy Tab', price: '$650', location: 'Boston', description: 'A great tablet for media consumption.' },
      { id: 't3', title: 'Microsoft Surface', price: '$800', location: 'Denver', description: 'A 2-in-1 tablet for productivity.' },
      { id: 't4', title: 'Amazon Fire HD', price: '$150', location: 'Phoenix', description: 'An affordable tablet for entertainment.' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerCards}>
          {headerCategories.map((category, index) => (
            <HeaderCard
              key={index}
              icon={category.icon}
              title={category.title}
              onPress={() => handleCardPress(category.title)}
            />
          ))}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder={placeholders[placeholderIndex]}
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity style={styles.heartButton}>
              <Text style={styles.heartIcon}>♡</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.additionalCardsContainer}>
            

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScrollView}>
              <View>
                <View style={styles.categoryRow}>
                  {categoriesRow1.map((category, index) => (
                    <CategoryCard
                      key={index}
                      icon={category.icon}
                      title={category.title}
                      onPress={() => handleCardPress(category.title)}
                    />
                  ))}
                </View>

                <View style={styles.categoryRow}>
                  {categoriesRow2.map((category, index) => (
                    <CategoryCard
                      key={index}
                      icon={category.icon}
                      title={category.title}
                      onPress={() => handleCardPress(category.title)}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.recommendationsContainer}>
            <View style={styles.recommendationHeader}>
              <Text style={styles.recommendationTitle}>Bikes</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemsScrollView}>
              {recommendedItems.bikes.map((item, index) => (
                <ItemCard key={index} {...item} onPress={() => onSelectItem(item)} />
              ))}
            </ScrollView>

            <View style={styles.recommendationHeader}>
              <Text style={styles.recommendationTitle}>Cars</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemsScrollView}>
              {recommendedItems.cars.map((item, index) => (
                <ItemCard key={index} {...item} onPress={() => onSelectItem(item)} />
              ))}
            </ScrollView>

            <View style={styles.recommendationHeader}>
              <Text style={styles.recommendationTitle}>Tablets</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemsScrollView}>
              {recommendedItems.tablets.map((item, index) => (
                <ItemCard key={index} {...item} onPress={() => onSelectItem(item)} />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => onNavigateTab('Home')}>
          <Text style={styles.footerIcon}>🏠</Text>
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => onNavigateTab('Chat')}>
          <Text style={styles.footerIcon}>💬</Text>
          <Text style={styles.footerText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sellButton} onPress={onSellPress}>
          <Text style={styles.sellButtonIcon}>➕</Text>
          <Text style={styles.sellButtonText}>Sell</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => onNavigateTab('MyAds')}>
          <Text style={styles.footerIcon}>📋</Text>
          <Text style={styles.footerText}>My Ads</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => onNavigateTab('Account')}>
          <Text style={styles.footerIcon}>👤</Text>
          <Text style={styles.footerText}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 10,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 15,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: 48,
  },
  heartButton: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heartIcon: {
    fontSize: 26,
    color: '#666',
  },
  additionalCardsContainer: {
    flex: 1,
  },
  horizontalScrollView: {
    marginBottom: 15,
  },
  categoryRow: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
  recommendationsContainer: {
    marginTop: 20,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  itemsScrollView: {
    paddingHorizontal: 12,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
    paddingBottom: 50,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 1,
  },
  footerIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  sellButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  sellButtonIcon: {
    fontSize: 20,
    color: 'white',
    marginBottom: 4,
  },
  sellButtonText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
}); 
