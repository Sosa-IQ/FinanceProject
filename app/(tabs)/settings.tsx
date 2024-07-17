import { View, Text } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import BaseBackground from '@/components/BaseBackground';

const SettingsScreen = () => {
  return (
    <BaseBackground>
      <View>
        <Text>Settings</Text>
      </View>
    </BaseBackground>
  )
}

export default SettingsScreen