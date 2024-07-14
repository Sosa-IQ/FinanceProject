import { View, Text, TextBase, Button } from 'react-native'
import React from 'react'
import { createLinkToken } from '@/lib/actions/user.actions';

const HomeScreen = () => {
  // const user: User = {
  //   $id: "01234",
  //   email: "johndoe@example.com",
  //   userId: "12345",
  //   dwollaCustomerUrl: "https://api-sandbox.dwolla.com/customers/12345",
  //   dwollaCustomerId: "12345",
  //   firstName: "John",
  //   lastName: "Doe",
  //   name: "John Doe",
  //   address1: "123 Main St",
  //   city: "New York",
  //   state: "NY",
  //   postalCode: "10001",
  //   dateOfBirth: "1990-01-01",
  //   ssn: "123-45-6789",
  // };

  // const handleCreateLinkToken = () => {
  //   const linkToken = createLinkToken(user);
  //   console.log(linkToken);
  // };
  return (
    <View className='flex-1 items-center justify-center gap-4'>
      <View className='bg-green-500 h-36 w-96 px-6 rounded justify-center'>
        <Text className='text-center'>$(Balance)</Text>
      </View>
      <View className=' bg-gray-400 h-56 w-96 px-6 items-center rounded'>
        <Text>Recent Transactions</Text>
      </View>
      {/* <Button title="Create Link Token" onPress={handleCreateLinkToken} /> */}
    </View>
  )
}

export default HomeScreen