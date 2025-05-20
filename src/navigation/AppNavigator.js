// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import { CartContext } from '../context/CartContext';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProductStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Products" component={ProductListScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ProductStack} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cartItems.length > 0 ? cartItems.length : null,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
