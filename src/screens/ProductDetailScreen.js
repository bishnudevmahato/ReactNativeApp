// src/screens/ProductDetailScreen.js

// Import React and required hooks and components
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CartContext } from '../context/CartContext';

// ProductDetailScreen displays a product's detailed info and allows adding/removing from cart
const ProductDetailScreen = ({ route }) => {
  const { product } = route.params; // get product details passed from the product list
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [inCart, setInCart] = useState(null); // local state to track if product is in cart

  // Check if this product is already in the cart and update local state accordingly
  useEffect(() => {
    const existing = cartItems.find((item) => item.id === product.id);
    setInCart(existing || null);
  }, [cartItems]);

  // Increase quantity or add to cart if not already there
  const increment = () => {
    if (inCart) {
      updateQuantity(product.id, inCart.quantity + 1);
    } else {
      addToCart(product);
    }
  };

  // Decrease quantity, and remove from cart if quantity reaches 0
  const decrement = () => {
    if (inCart && inCart.quantity > 1) {
      updateQuantity(product.id, inCart.quantity - 1);
    } else if (inCart && inCart.quantity === 1) {
      removeFromCart(product.id);
    }
  };

  return (
    // Scrollable layout for product details
    <ScrollView contentContainerStyle={styles.container}>
        {/* Product image, title, price, rating, and description */}
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₹ {product.price}</Text>
      <Text style={styles.rating}>⭐ {product.rating.rate} ({product.rating.count}) ratings</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* Show add/remove quantity buttons if item is in cart, else show Add to Cart */}
      <View style={styles.cartActionContainer}>
        {inCart ? (
          <View style={styles.counterContainer}>
            {/* Decrease quantity button */}
            <TouchableOpacity style={styles.counterButton} onPress={decrement}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            {/* Current quantity */}
            <Text style={styles.counterValue}>{inCart.quantity}</Text>
            {/* Increase quantity button */}
            <TouchableOpacity style={styles.counterButton} onPress={increment}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Add to cart button if not yet added
          <TouchableOpacity style={styles.addButton} onPress={increment}>
            <Text style={styles.addButtonText}>ADD TO CART</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

// Styling for the product detail page
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 20,
  },
  cartActionContainer: {
    marginTop: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  counterText: {
    color: '#fff',
    fontSize: 18,
  },
  counterValue: {
    fontSize: 18,
    marginHorizontal: 15,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;