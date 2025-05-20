// src/context/CartContext.js

// This file provides a global context for managing the shopping cart using React Context API.
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the CartContext to allow components to consume cart state and functions
export const CartContext = createContext();

// CartProvider wraps around components and provides cart state and handlers
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // holds all items in the cart

  // Load cart items from AsyncStorage when the app starts
  useEffect(() => {
    loadCart();
  }, []);

  // Save cartItems to AsyncStorage every time they change
  useEffect(() => {
    AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

// Function to read cart data from AsyncStorage and set to state
const loadCart = async () => {
    try {
      const stored = await AsyncStorage.getItem('cartItems');
      if (stored) setCartItems(JSON.parse(stored));
    } catch (e) {
      console.log('Failed to load cart', e);
    }
  };

  // Add product to cart or increase its quantity if already added
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart by its ID
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update the quantity of a specific product in the cart
  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty > 0 ? qty : 1 } : item
      )
    );
  };

  // Provide cart state and action functions to children components
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
