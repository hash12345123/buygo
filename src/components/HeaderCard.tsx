import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderCardProps {
  icon: string;
  title: string;
  onPress?: () => void;
}

export const HeaderCard: React.FC<HeaderCardProps> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 45,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(238, 238, 238, 1)',
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
}); 