import { View, Text, TextBase } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View className='flex-1 items-center justify-center gap-4'>
      <View className='bg-green-500 h-36 w-96 px-6 rounded justify-center'>
        <Text className='text-center'>$(Balance)</Text>
      </View>
      <View className=' bg-gray-400 h-56 w-96 px-6 items-center rounded'>
        <Text>Recent Transactions</Text>
      </View>
    </View>
  )
}

export default HomeScreen