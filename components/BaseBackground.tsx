import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BaseBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <View>
      <View className='h-72'>
        <LinearGradient 
        colors={['#4EB99E', '#235347']}
        style={{ height: '100%'}}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
        </LinearGradient>
      </View>
      <View className="bg-greenBase h-screen">
      </View>
      <View className="absolute top-0 left-0 right-0 bottom-1/3">
        {children}
      </View>
    </View>
  );
};

export default BaseBackground;