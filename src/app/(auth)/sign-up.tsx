import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  ImageBackground
} from 'react-native';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';

import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo';
import SignInWith from '@/components/SignInWith';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const signUpSchema = z.object({
  email: z.string({ message: 'Email is required' }).email('Invalid email'),
  password: z
    .string({ message: 'Password is required' })
    .min(8, 'Password should be at least 8 characters long'),
});

type SignUpFields = z.infer<typeof signUpSchema>;

const mapClerkErrorToFormField = (error: any) => {
  switch (error.meta?.paramName) {
    case 'email_address':
      return 'email';
    case 'password':
      return 'password';
    default:
      return 'root';
  }
};

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
  });

  const { signUp, isLoaded } = useSignUp();

  const onSignUp = async (data: SignUpFields) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareVerification({ strategy: 'email_code' });

      router.push('/verify');
    } catch (err) {
      console.log('Sign up error: ', err);
      if (isClerkAPIResponseError(err)) {
        err.errors.forEach((error) => {
          console.log('Error: ', JSON.stringify(error, null, 2));
          const fieldName = mapClerkErrorToFormField(error);
          console.log('Field name: ', fieldName);
          setError(fieldName, {
            message: error.longMessage,
          });
        });
      } else {
        setError('root', { message: 'Unknown error' });
      }
    }
  };

  return (
    <View style={{backgroundColor:'#4DBB7B',flex:1}}>
    <Header />
          <ImageBackground
            source={{ uri: 'https://st2.depositphotos.com/1011158/8802/i/450/depositphotos_88025120-stock-photo-ripped-cocoa-fruit-hanging-from.jpg' }} // Cambia por tu imagen
            style={styles.bgImage}
            imageStyle={styles.bgImageStyle}
          >
            <View style={styles.overlay} />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}
            >
      <Text style={styles.title}>Create una cuenta</Text>

      <View style={styles.form}>
        <CustomInput
          control={control}
          name='email'
          placeholder='Email'
          autoCapitalize='none'
          keyboardType='email-address'
          autoComplete='email'
          placeholderTextColor='white'
        />

        <CustomInput
          control={control}
          name='password'
          placeholder='Password'
          secureTextEntry
          placeholderTextColor='white'
        />
        {errors.root && (
          <Text style={{ color: 'crimson' }}>{errors.root.message}</Text>
        )}
      </View>

      <CustomButton text='Registrarse' onPress={handleSubmit(onSignUp)} />
      <Link href='/sign-in' style={styles.link}>
        Ya tienes una cuenta?, inicia sesion
      </Link>

      <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 'auto' }}>
        <SignInWith strategy='oauth_google' />
      </View>
    </KeyboardAvoidingView>
          </ImageBackground>
          <Footer/>
          </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    marginVertical: 12,
  marginHorizontal: 16, // separa la card de los costados
  padding: 14,
  borderRadius: 18,     // borde redondeado
  backgroundColor: "rgba(0,0,0,0.35)",
  minHeight: 90,
  justifyContent: "center",
  overflow: "hidden",
    
    
  },
  bgImageStyle: {
    
    borderRadius:20
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#107A23',
    opacity: 0.7, // Ajusta la opacidad para más o menos transparencia
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 20,
    zIndex: 2, // Asegura que el contenido esté sobre el overlay
  },
  form: {
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color:'white'
  },
  link: {
    color: 'white',
    fontWeight: '600',
  },
});
