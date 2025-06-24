import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

interface AccountScreenProps {
  userInfo: { email?: string; phone?: string };
  onLogout: () => void;
  onNavigateTab: (tab: 'Home' | 'Chat' | 'MyAds' | 'Account') => void;
  onSellPress: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ 
  userInfo, 
  onLogout, 
  onNavigateTab,
  onSellPress
}) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: onLogout,
        },
      ]
    );
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings screen will be implemented soon!');
  };

  const handleHelpSupport = () => {
    Alert.alert('Help & Support', 'Help & Support screen will be implemented soon!');
  };

  const handleProfile = () => {
    Alert.alert('Profile', 'Profile screen will be implemented soon!');
  };

  const handleFavorites = () => {
    Alert.alert('Favorites', 'Favorites screen will be implemented soon!');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'Notifications screen will be implemented soon!');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacy Policy', 'Privacy Policy screen will be implemented soon!');
  };

  const handleTerms = () => {
    Alert.alert('Terms of Service', 'Terms of Service screen will be implemented soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <Text style={styles.profileIcon}>👤</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {userInfo.email ? userInfo.email.split('@')[0] : 'User'}
              </Text>
              <Text style={styles.profileEmail}>
                {userInfo.email || userInfo.phone || 'user@example.com'}
              </Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleProfile}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Main Menu Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>⚙️</Text>
                <Text style={styles.menuText}>Settings</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleFavorites}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>❤️</Text>
                <Text style={styles.menuText}>Favorites</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleNotifications}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>🔔</Text>
                <Text style={styles.menuText}>Notifications</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleHelpSupport}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>❓</Text>
                <Text style={styles.menuText}>Help & Support</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Legal Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal</Text>
            
            <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>🔒</Text>
                <Text style={styles.menuText}>Privacy Policy</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleTerms}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>📄</Text>
                <Text style={styles.menuText}>Terms of Service</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutSection}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* App Version */}
          <View style={styles.versionSection}>
            <Text style={styles.versionText}>BuyGo v1.0.0</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
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

        <TouchableOpacity style={[styles.footerButton, styles.activeTab]} onPress={() => onNavigateTab('Account')}>
          <Text style={[styles.footerIcon, styles.activeTabIcon]}>👤</Text>
          <Text style={[styles.footerText, styles.activeTabText]}>Account</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 70,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileIcon: {
    fontSize: 30,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 18,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#ccc',
    fontWeight: 'bold',
  },
  logoutSection: {
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 15,
    padding: 18,
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
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#999',
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
  activeTab: {
    // Active tab styling
  },
  activeTabIcon: {
    color: '#007AFF',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
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