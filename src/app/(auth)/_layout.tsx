import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native";
export default function AuthLayout() {
  console.log("Auth layout");
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: true,
          title: "Sign in",
          headerStyle: { backgroundColor: "#4DBB7B" }, // Color de fondo del header
          headerTintColor: "#fff", // Color de la flecha y el texto
          headerTitleStyle: { color: "#fff" },
          headerBackVisible: true,
          animation:'fade',
          
          
          // Personaliza el comportamiento del botón de retroceso:
          headerLeft: ({ canGoBack }) => (
            <Link href="/" asChild style={{ marginLeft: 10 }}>
              <Button title="←" color="#fff" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign up",
          headerStyle: { backgroundColor: "#4DBB7B" }, // Color de fondo del header
          headerTintColor: "#fff", // Color de la flecha y el texto
          headerTitleStyle: { color: "#fff" },
        }}
      />
    </Stack>
  );
}
