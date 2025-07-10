// Footer.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Footer = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://your-image-url.com/cacao-footer.jpg' }}  // Reemplaza con la URL de la imagen de cacao
      style={styles.container}
      imageStyle={styles.imageStyle}
    >
      <Text style={styles.text}>© 2025 Todo sobre el Cacao. Todos los derechos reservados.</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    
    backgroundColor:'#4DBB7B',
  },
  imageStyle: {
    
    opacity: 0.3,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Footer;
