import { StatusBar } from 'expo-status-bar'
import { ScrollView, View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import AuthButton from '@/components/AuthButton'
import { Redirect, router } from 'expo-router'
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '@/context/GlobalProvider'

const InitScreen = () => {
  const {loading, isLogged} = useGlobalContext();

  if(!loading && isLogged) return <Redirect href='/dashboard' />

  return (
    <LinearGradient 
    colors={['#4EB99E', '#235347']}
    style={{ height: '100%'}}
    start={{ x: 0, y: 0 }}  // change direction/angle of gradient
    end={{ x: 1, y: 1 }}
    >
      <SafeAreaView>
          <ScrollView contentContainerStyle={{height: '100%'}}>
            <View className='absolute top-0 left-0 right-0 items-center'>
              <Image
                  source={require('../assets/images/logo-text.png')}
                  className='w-[227px]'
                  resizeMode='contain'
                />
            </View>

            <View className='flex-1 justify-center items-center relative mt-24'>
              <Text className='text-white text-5xl z-20 font-bsregular'>
                Are You Ready To
              </Text>
              <Text className='text-6xl'>
                <Text className='text-greenSecondary font-bsregular'>
                  BudgIt
                </Text>
                <Text className='text-white font-bsregular'>
                  ?
                </Text>
              </Text>
              <Image
                source={require('../assets/images/surround.png')}
                className='absolute w-[250px] h-[160px] top-[185] right-[72] z-10 rotate-3'
                resizeMode='contain'
              /> 
            </View>
            <View className='items-center mb-28'>
            <AuthButton
                title='Continue with Email'
                handlePress={() => router.push('/(auth)/sign-up') }
                containerStyles='w-[325px] shadow-lg'
                textStyles='font-bsregular'
              />
            </View>
          </ScrollView>
          <StatusBar
            style='light'
          />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default InitScreen