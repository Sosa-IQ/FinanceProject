import { View, Text, Button, Modal } from 'react-native'
import React, { useState } from 'react'
import { createLinkToken } from '@/lib/actions/user.actions';
import BaseBackground from '@/components/BaseBackground';
import PlaidLink from '@/components/PlaidLink';

const DashboardScreen = () => {
  const user: User = {
    $id: "01234",
    email: "johndoe@example.com",
    userId: "12345",
    dwollaCustomerUrl: "https://api-sandbox.dwolla.com/customers/12345",
    dwollaCustomerId: "12345",
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    address1: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    dateOfBirth: "1990-01-01",
    ssn: "123-45-6789",
  };

  const handleCreateLinkToken = () => {
    const linkToken = createLinkToken(user);
    console.log(linkToken);
  };

  const [modalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <BaseBackground>
    <View className='flex-1 items-center justify-center gap-4'>
      <View className='bg-green-500 h-36 w-96 px-6 rounded justify-center'>
        <Text className='text-center'>$(Balance)</Text>
      </View>
      <View className=' bg-gray-400 h-56 w-96 px-6 items-center rounded'>
        <Text>Recent Transactions</Text>
      </View>
      <View className='bg-greenSecondary rounded-xl'>
      <Button title="Connect Bank" onPress={toggleModal} />
      </View>
    </View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
      >
        <View className='flex-1 mt-24'>
          <PlaidLink
          // linkToken={String(linkToken)}
          onEvent={(event) => console.log(event)}
          onExit={(exit) => {
            console.log(exit);
            toggleModal();
          }}
          onSuccess={(success) => console.log(success)}
          />
        </View>
      </Modal>
    </BaseBackground>
  )
}

export default DashboardScreen