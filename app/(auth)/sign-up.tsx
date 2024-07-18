import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import AuthButton from '@/components/AuthButton'
import { Link, router } from 'expo-router'

const SignUp = () => {
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const submit = () => {
    router.replace('/dashboard')
  }

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
              Sign Up
            </Text>

            <FormField
              title="First Name"
              value={form.firstName}
              handleChangeText={(e) => setForm({ ...form, firstName: e })}
              otherStyles='mt-3'
              placeholder={'First Name'}
            />
            <FormField
              title="Last Name"
              value={form.lastName}
              handleChangeText={(e) => setForm({ ...form, lastName: e })}
              otherStyles='mt-3'
              placeholder={'Last Name'}
            />
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
            <FormField
              title="Confirm Password"
              value={form.confirmPassword}
              handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
              otherStyles='mt-3'
              placeholder={'Confirm Password'}
            />
            
            <AuthButton 
              title={'Sign Up'} 
              handlePress={submit}
              containerStyles='w-full mt-6 shadow-lg'
              textStyles='text-xl font-bsregular'
              isLoading={isSubmitting}
            />

            <View className='justify-center pt-3 flex-row gap-2'>
              <Text className='text-gray-200 font-bsregular text-base'>
                Already have an account?
              </Text>
              <Link href="/log-in" className='font-bsregular text-base text-greenSecondary underline'>Log In</Link>
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SignUp