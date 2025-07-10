// Header.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

const Header = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://your-image-url.com/cacao-header.jpg' }}  // Reemplaza con la URL de la imagen de cacao que desees
      style={styles.container}
      imageStyle={styles.imageStyle}
    >
      <Text style={styles.title}>Proyecto sobre el Cacao</Text>
      <Text style={styles.subtitle}>Enterate mas del Cacao</Text>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#4DBB7B',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  imageStyle: {
    opacity: 0.3,  // Opacidad para que el texto sea legible
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#D9E5B3',
    marginTop: 10,
  },
});

export default Header;
