import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface CategoryCardProps {
  icon: string;
  title: string;
  onPress?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  width?: number;
  height?: number;
  textColor?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  onPress,
  backgroundColor = 'rgba(128, 128, 128, 0.2)',
  borderColor = 'rgb(219, 226, 221)',
  width = 70,
  height = 70,
  textColor = 'black',
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor,
            borderColor,
            width,
            height,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.7}>
        <Text style={styles.icon}>{icon}</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: textColor, width }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  icon: {
    fontSize: 29,
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
}); 





