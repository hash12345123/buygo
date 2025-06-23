import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface ItemCardProps {
  image?: any;
  title: string;
  price: string;
  location: string;
  onPress?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  image,
  title,
  price,
  location,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {image ? (
        <Image source={image} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Text style={styles.favoriteIcon}>♡</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    width: 230,
    height: 250,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  imagePlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#e0e0e0',
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  infoContainer: {
    padding: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#888',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    padding: 6,
  },
  favoriteIcon: {
    fontSize: 18,
    color: '#333',
  },
}); 