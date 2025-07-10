import React from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";

const Content = () => {
  return (
    <ImageBackground
      source={{ uri: "https://st2.depositphotos.com/1011158/8802/i/450/depositphotos_88025120-stock-photo-ripped-cocoa-fruit-hanging-from.jpg" }} // Cambia por tu imagen
      style={styles.bgImage}
      imageStyle={styles.bgImageStyle}
    >
      <View style={styles.overlay} />
      <View style={styles.containerG}>
        <View style={styles.linkContainer}>
          <Link href="/sign-in" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </Pressable>
          </Link>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <ImageBackground
            source={{ uri: "https://www.agrosavia.co/media/eovdgnm1/figura-3e-y-4.jpg" }}
            style={styles.contentBackground}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.heading}>¿Qué es el Cacao?</Text>
            <Text style={styles.text}>
              El cacao es una planta originaria de América Central y América del
              Sur. Es la base para la creación de productos como el chocolate, y
              se cultiva principalmente en regiones tropicales.
            </Text>
          </ImageBackground>

          <ImageBackground
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK93Et7NuBakPj-2C0YnIiQyCi__iB8Jd_xg&s" }}
            style={styles.contentBackground}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.heading}>Propiedades del Cacao</Text>
            <Text style={styles.text}>
              El cacao es muy rico en antioxidantes, especialmente los
              flavonoides, que ayudan a reducir la presión arterial y mejorar la
              circulación. También es una fuente excelente de magnesio, hierro,
              y otros minerales esenciales.
            </Text>
          </ImageBackground>

          <ImageBackground
            source={{ uri: "https://www.carbonell-law.org/NuevoDiseno/consumo/revista132/imagenes/Cacao.jpg" }}
            style={styles.contentBackground}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.heading}>Usos del Cacao</Text>
            <Text style={styles.text}>
              Además de ser la base del chocolate, el cacao se utiliza en la
              industria cosmética y farmacéutica, ya que tiene propiedades
              hidratantes y antioxidantes. En la medicina tradicional, también
              se utiliza para mejorar el ánimo y la energía.
            </Text>
          </ImageBackground>

          <ImageBackground
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/01/Cacao-pod-k4636-14.jpg" }}
            style={styles.contentBackground}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.heading}>El Cacao y el Medio Ambiente</Text>
            <Text style={styles.text}>
              El cultivo de cacao puede ser sostenible cuando se realiza de
              manera responsable, fomentando prácticas ecológicas y promoviendo
              la biodiversidad en las zonas productoras.
            </Text>
          </ImageBackground>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    width:'100%'
  },
  bgImageStyle: {
    resizeMode: 'cover',
    width:'100%'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#58D68D',
    opacity: 0.85, // Ajusta la opacidad para ver más o menos la imagen de fondo
    zIndex: 1,
  },
  containerG: {
    flex: 1,
    
    alignSelf: 'stretch',
    marginTop: 5,
    marginBottom: 40,
    borderRadius: 20,
    zIndex: 2, // Asegura que el contenido esté sobre el overlay
  },
  linkContainer: {
    alignItems: "flex-end",
    padding: 10,
  },
  button: {
    backgroundColor: "#2c6b47",
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 25,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  container: {
    padding: 20,
    marginBottom: 20,
  },
  contentBackground: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.35)", // Más oscuro
    minHeight: 90,
    justifyContent: "center",
  },
  imageStyle: {
    borderRadius: 10,
    opacity: 0.4,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111", // Marrón oscuro, puedes usar "#111" para casi negro
    marginVertical: 6,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    color: "#111", // Marrón oscuro, puedes usar "#222" o "#111" para más contraste
    marginBottom: 8,
  },
});

export default Content;
