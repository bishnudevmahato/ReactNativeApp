// src/screens/ProductListScreen.js

// This screen fetches and displays a grid of product items from an external API
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]); // holds the list of products
  const [loading, setLoading] = useState(true); // controls loading spinner visibility

  // Fetch product list on initial load
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // Render each product as a card
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}>

      {/* Product image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Product title (truncated to 2 lines) */}
      <Text numberOfLines={2} style={styles.title}>{item.title}</Text>

      {/* Product price */}
      <Text style={styles.price}>₹ {item.price}</Text>

      {/* Product rating and count */}
      <Text style={styles.rating}>⭐ {item.rating.rate} ({item.rating.count})</Text>
    </TouchableOpacity>
  );

  // Show loading indicator while fetching products
  if (loading) {
    return (
      <View style={styles.loader}><ActivityIndicator size="large" color="#000" /></View>
    );
  }

  // Display the grid of products
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // Display 2 items per row
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 2 - 40,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 14,
    marginTop: 5,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  rating: {
    color: 'green',
    marginTop: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductListScreen;
