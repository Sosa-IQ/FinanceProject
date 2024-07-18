import { View, Text } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import BaseBackground from '@/components/BaseBackground';

const TransactionsScreen = () => {
  return (
    <BaseBackground>
      <View>
        <Text>Transactions</Text>
      </View>
    </BaseBackground>
  )
}

export default TransactionsScreen