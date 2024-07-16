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
        start={{ x: 0.1, y: 0 }}  // change direction/angle of gradient
        end={{ x: 1, y: 1 }}
        locations={[0, 0.6]}  // changes the start and end locations of the gradient
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