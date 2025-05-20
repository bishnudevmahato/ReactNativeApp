// src/screens/CartScreen.js

// This screen displays the products added to the cart, with quantity controls and total calculation.
import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { CartContext } from '../context/CartContext';

const CartScreen = () => {
  // Access cart data and functions from context
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  // Render each product in the cart with quantity controls and image
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>Price: ₹{item.price}</Text>

          {/* Quantity input to allow user to manually set quantity */}
          <Text>Quantity:</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={item.quantity.toString()}
            onChangeText={(val) => updateQuantity(item.id, parseInt(val) || 1)}
          />

          {/* Button to remove item from cart */}
          <Button title="Remove" onPress={() => removeFromCart(item.id)} />
        </View>

        {/* Product image shown to the right */}
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </View>
  );

  // Calculate total cost of all items in the cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      {/* List of cart items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Your cart is empty.</Text>}
      />

      {/* Display total cart value */}
      <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default CartScreen;
