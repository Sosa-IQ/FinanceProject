import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import AuthButton from '@/components/AuthButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '@/lib/actions/user.actions'
import { useGlobalContext } from '@/context/GlobalProvider'

const LogIn = () => {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      console.log('Logged in');
      router.replace("/dashboard");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient 
    colors={['#4EB99E', '#235347']}
    style={{ height: '100%'}}
    start={{ x: 1, y: 0 }}  // change direction/angle of gradient
    end={{ x: 0, y: 1 }}
    >
      <SafeAreaView className="h-full">
      <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className='flex-1'
            >
        <ScrollView>
          <View className='w-full justify-center h-full px-4 my-4'>
            
            <Image source={images.logo_text}
            resizeMode='contain' className='w-[227px] h-[64px]'
            />
            
            <Text className='text-white text-3xl font-bsregular mt-2'>
              Log In
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles='mt-3'
              placeholder={'Email Address'}
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles='mt-3'
              placeholder={'Password'}
            />
            
            <AuthButton 
              title={'Log In'} 
              handlePress={submit}
              containerStyles='w-full mt-6 shadow-lg'
              textStyles='text-xl font-bsregular'
              isLoading={isSubmitting}
            />

            <View className='justify-center pt-3 flex-row gap-2'>
              <Text className='text-gray-200 font-bsregular text-base'>
                Don't have an account?
              </Text>
              <Link href="/sign-up" className='font-bsregular text-base text-greenSecondary underline'>Sign Up</Link>
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default LogIn