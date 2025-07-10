import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { ImageBackground } from "react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import SignInWith from "@/components/SignInWith";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { router } from "expo-router";
const signInSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email"),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password should be at least 8 characters long"),
});

type SignInFields = z.infer<typeof signInSchema>;

const mapClerkErrorToFormField = (error: any) => {
  switch (error.meta?.paramName) {
    case "identifier":
      return "email";
    case "password":
      return "password";
    default:
      return "root";
  }
};

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFields>({
    resolver: zodResolver(signInSchema),
  });

  console.log("Errors: ", JSON.stringify(errors, null, 2));

  const { signIn, isLoaded, setActive } = useSignIn();

  const onSignIn = async (data: SignInFields) => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.log("Sign in failed");
        setError("root", { message: "Sign in could not be completed" });
      }
    } catch (err) {
      console.log("Sign in error: ", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        err.errors.forEach((error) => {
          const fieldName = mapClerkErrorToFormField(error);
          setError(fieldName, {
            message: error.longMessage,
          });
        });
      } else {
        setError("root", { message: "Unknown error" });
      }
    }

    console.log("Sign in: ", data.email, data.password);
  };

  return (
    <View style={{ backgroundColor: "#4DBB7B", flex: 1 }}>
      <Header />
      <ImageBackground
        source={{
          uri: "https://st2.depositphotos.com/1011158/8802/i/450/depositphotos_88025120-stock-photo-ripped-cocoa-fruit-hanging-from.jpg",
        }} // Cambia por tu imagen
        style={styles.bgImage}
        imageStyle={styles.bgImageStyle}
      >
        <View style={styles.overlay} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Text style={styles.title}>Iniciar Sesion</Text>

          <View style={styles.form}>
            <CustomInput
              control={control}
              name="email"
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="white"
              autoComplete="email"
            />

            <CustomInput
              control={control}
              name="password"
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
            />

            {errors.root && (
              <Text style={{ color: "crimson" }}>{errors.root.message}</Text>
            )}
          </View>

          <CustomButton
            text="Iniciar Sesion"
            onPress={handleSubmit(onSignIn)}
          />

          <Link href="/sign-up" style={styles.link}>
            No tienes una cuenta? Registrate
          </Link>

          <View
            style={{ flexDirection: "row", gap: 10, marginHorizontal: "auto" }}
          >
            <SignInWith strategy="oauth_google" />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    marginVertical: 12,
    marginHorizontal: 16, // separa la card de los costados
    padding: 14,
    borderRadius: 18, // borde redondeado
    backgroundColor: "rgba(0,0,0,0.35)",
    minHeight: 90,
    justifyContent: "center",
    overflow: "hidden",
  },
  bgImageStyle: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#107A23",
    opacity: 0.7, // Ajusta la opacidad para más o menos transparencia
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 20,
    zIndex: 2, // Asegura que el contenido esté sobre el overlay
  },
  form: {
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffff",
  },
  link: {
    color: "#ffff",
    fontWeight: "600",
  },
});
