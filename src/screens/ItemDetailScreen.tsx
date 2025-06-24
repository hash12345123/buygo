import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Asset } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

// This is a placeholder for the navigation prop type
// In a real app, you would use types from your navigation library
interface ItemDetailScreenProps {
  route: {
    params: {
      item: {
        id: string;
        image?: any;
        title: string;
        price: string;
        location: string;
        description?: string;
        seller?: {
          name: string;
          avatar?: any;
        };
        images?: Asset[];
      };
    };
  };
  navigation: any;
  onDelete?: (adId: string) => void;
}

export const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({ route, navigation, onDelete }) => {
  const { item } = route.params;

  // Placeholder data if not passed
  const displayItem = {
    images: item.images || [],
    title: item.title || 'Item Title',
    price: item.price || '$0',
    location: item.location || 'Unknown Location',
    description: item.description || 'No description available. This is a placeholder text to show how a longer description would look on the item detail screen.',
    seller: item.seller || { name: 'John Doe' },
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{displayItem.title}</Text>
          <View style={{ width: 40 }} />
        </View>

        {displayItem.images.length > 0 ? (
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {displayItem.images.map((img, index) => (
              <Image key={index} source={{ uri: img.uri }} style={styles.image} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.imagePlaceholder} />
        )}


        <View style={styles.detailsContainer}>
          <Text style={styles.price}>{displayItem.price}</Text>
          <Text style={styles.title}>{displayItem.title}</Text>
          <Text style={styles.location}>{displayItem.location}</Text>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{displayItem.description}</Text>

          <View style={styles.separator} />

          <View style={styles.sellerContainer}>
            {displayItem.seller.avatar ? (
              <Image source={displayItem.seller.avatar} style={styles.sellerAvatar} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
            <View>
              <Text style={styles.sellerName}>{displayItem.seller.name}</Text>
              {/* <Text style={styles.sellerInfo}>Member since 2023</Text> */}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.footerButton, styles.chatButton]}>
          <Text style={styles.footerButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerButton, styles.callButton]}>
          <Text style={styles.footerButtonText}>Call</Text>
        </TouchableOpacity>
      </View>
      {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
          <Text style={styles.deleteButtonText}>Delete Ad</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  image: {
    width: width,
    height: width * 0.75, // Aspect ratio 4:3
  },
  imagePlaceholder: {
    width: width,
    height: width * 0.75,
    backgroundColor: '#e0e0e0',
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    color: '#444',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#e0e0e0',
  },
  sellerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sellerInfo: {
    fontSize: 14,
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 10,
    paddingBottom: 50,
  },
  footerButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButton: {
    backgroundColor: '#007AFF',
    marginRight: 5,
  },
  callButton: {
    backgroundColor: '#34C759',
    marginLeft: 5,
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 