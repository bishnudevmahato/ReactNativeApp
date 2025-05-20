
// Entry point of the application: wraps the entire app with cart context and navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './src/context/CartContext'; // Import CartProvider to manage cart state
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  // Provide cart state globally to all components
  <CartProvider>
    {/* Set up navigation container for navigating between screens */}
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </CartProvider>
);

export default App;
