/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Alert, BackHandler } from 'react-native';
import { LoginScreen } from './src/auth/LoginScreen';
import { EmailLoginScreen } from './src/auth/EmailLoginScreen';
import { PhoneLoginScreen } from './src/auth/PhoneLoginScreen';
import { ForgotPasswordScreen } from './src/auth/ForgotPasswordScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ItemDetailScreen } from './src/screens/ItemDetailScreen';
import { SelectCategoryScreen } from './src/screens/SelectCategoryScreen';
import { CreateAdScreen } from './src/screens/CreateAdScreen';
import { MyAdsScreen } from './src/screens/MyAdsScreen';
import { AccountScreen } from './src/screens/AccountScreen';

type Screen = 'Login' | 'EmailLogin' | 'PhoneLogin' | 'ForgotPassword';
type SellScreen = 'SelectCategory' | 'CreateAd';
type AuthenticatedScreen = 'Home' | 'Chat' | 'MyAds' | 'Account';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<Screen>('Login');
  const [userInfo, setUserInfo] = useState<{ email?: string; phone?: string }>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [sellFlowScreen, setSellFlowScreen] = useState<SellScreen | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userAds, setUserAds] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<AuthenticatedScreen>('Home');

  //back handler hook
  useEffect(() => {
    const backAction = () => {
      if (sellFlowScreen === 'CreateAd') {
        setSellFlowScreen('SelectCategory');
        return true;
      }
      if (sellFlowScreen === 'SelectCategory') {
        setSellFlowScreen(null);
        return true;
      }
      if (selectedItem) {
        handleBack();
        return true;
      }
      if (activeTab !== 'Home') {
        setActiveTab('Home');
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [selectedItem, sellFlowScreen, activeTab]);


  //auth handlers
  const handleLogin = (email: string, password: string) => {
    // Simulate successful login
    setUserInfo({ email });
    setIsAuthenticated(true);
    // Alert.alert('Success', 'Login successful!');
  };

  const handlePhoneLogin = (phone: string, code: string) => {
    // Simulate successful phone login
    setUserInfo({ phone });
    setIsAuthenticated(true);
    Alert.alert('Success', 'Phone verification successful!');
  };

  const handleResetSent = (email: string) => {
    console.log('Password reset sent to:', email);
  };

  const handleLogout = () => {
    setUserInfo({});
    setIsAuthenticated(false);
    setCurrentScreen('Login');
    Alert.alert('Logged Out', 'You have been successfully logged out.');
  };

  const handleSelectItem = (item: any, isMyAd: boolean = false) => {
    setSelectedItem({ ...item, isMyAd });
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  const handleSellPress = () => {
    setSellFlowScreen('SelectCategory');
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSellFlowScreen('CreateAd');
  };

  const handleAdSubmit = (adDetails: any) => {
    const newAd = {
      ...adDetails,
      id: `ad_${new Date().getTime()}`,
      location: 'Your Location', 
    };
    setUserAds(prevAds => [...prevAds, newAd]);
    setSellFlowScreen(null);
    setSelectedCategory(null);
    setActiveTab('MyAds');
    Alert.alert('Success', 'Your ad has been submitted!');
  };

  const handleDeleteAd = (adId: string) => {
    setUserAds(prevAds => prevAds.filter(ad => ad.id !== adId));
    setSelectedItem(null);
    Alert.alert('Deleted', 'Your ad has been successfully deleted.');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderContent = () => {
    if (isAuthenticated) {
      if (sellFlowScreen === 'SelectCategory') {
        return <SelectCategoryScreen onSelectCategory={handleSelectCategory} onNavigateBack={() => setSellFlowScreen(null)} />;
      }
    
      if (sellFlowScreen === 'CreateAd' && selectedCategory) {
        return <CreateAdScreen category={selectedCategory} onNavigateBack={() => setSellFlowScreen('SelectCategory')} onSubmit={handleAdSubmit} />;
      }
    
      if (selectedItem) {
        return (
          <ItemDetailScreen
            route={{ params: { item: selectedItem } }}
            navigation={{ goBack: handleBack }}
            onDelete={selectedItem.isMyAd ? handleDeleteAd : undefined}
          />
        );
      }
    
      switch (activeTab) {
        case 'Home':
          return <HomeScreen onSelectItem={(item) => handleSelectItem(item, false)} onSellPress={handleSellPress} onNavigateTab={setActiveTab} />;
        case 'MyAds':
          return <MyAdsScreen ads={userAds} onNavigateBack={() => setActiveTab('Home')} onSelectItem={(item) => handleSelectItem(item, true)} />;
        case 'Account':
          return <AccountScreen userInfo={userInfo} onLogout={handleLogout} onNavigateTab={setActiveTab} onSellPress={handleSellPress} />;
        default:
          return <HomeScreen onSelectItem={(item) => handleSelectItem(item, false)} onSellPress={handleSellPress} onNavigateTab={setActiveTab} />;
      }
    }

    switch (currentScreen) {
      case 'Login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onEmailLoginPress={() => navigateTo('EmailLogin')}
            onPhoneLoginPress={() => navigateTo('PhoneLogin')}
          />
        );
      case 'EmailLogin':
        return (
          <EmailLoginScreen
            onLogin={handleLogin}
            onBack={() => navigateTo('Login')}
            onForgotPassword={() => navigateTo('ForgotPassword')}
          />
        );
      case 'PhoneLogin':
        return (
          <PhoneLoginScreen
            onLogin={handlePhoneLogin}
            onBack={() => navigateTo('Login')}
          />
        );
      case 'ForgotPassword':
        return (
          <ForgotPasswordScreen
            onBack={() => navigateTo('EmailLogin')}
            onResetSent={handleResetSent}
          />
        );
      default:
        return (
          <LoginScreen
            onLogin={handleLogin}
            onEmailLoginPress={() => navigateTo('EmailLogin')}
            onPhoneLoginPress={() => navigateTo('PhoneLogin')}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
