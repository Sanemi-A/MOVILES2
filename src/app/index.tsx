import { Text, StyleSheet, View, Button } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import Header from '@/components/Header';
import Content from '@/components/Content';
import Footer from '@/components/Footer';
import { Redirect } from 'expo-router';

export default function WelcomeScreen() {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return <Redirect href="/(protected)" />;
  }

  

  return (
    
      <View style={styles.container}>
      < Header/>
      <Content/>
      <Footer/>
      </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#4DBB7B',
    flex:1,
    padding:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
