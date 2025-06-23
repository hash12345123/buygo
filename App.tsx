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

  const handleLogin = (email: string, password: string) => {
    // Simulate successful login
    setUserInfo({ email });
    setIsAuthenticated(true);
    Alert.alert('Success', 'Login successful!');
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

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
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

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

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
        />
      );
    }
  
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onSelectItem={handleSelectItem} onSellPress={handleSellPress} onNavigateTab={setActiveTab} />;
      case 'MyAds':
        return <MyAdsScreen ads={userAds} onNavigateBack={() => setActiveTab('Home')} onSelectItem={handleSelectItem} />;
      default:
        return <HomeScreen onSelectItem={handleSelectItem} onSellPress={handleSellPress} onNavigateTab={setActiveTab} />;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
