
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

export default function ProductItem({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ margin: 10, padding: 10, borderWidth: 1 }}>
      <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
      <Text>{item.title}</Text>
      <Text>₹{item.price}</Text>
    </Pressable>
  );
}
