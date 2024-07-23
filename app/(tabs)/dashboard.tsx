import { View, Text, Button, Modal } from 'react-native'
import React, { useState } from 'react'
import { createLinkToken } from '@/lib/actions/user.actions';
import BaseBackground from '@/components/BaseBackground';
import PlaidLink from '@/components/PlaidLink';
import { useGlobalContext } from '@/context/GlobalProvider';

const DashboardScreen = () => {
  const { user } = useGlobalContext();

  // const handleCreateLinkToken = () => {
  //   const linkToken = createLinkToken(user);
  //   console.log(linkToken);
  // };

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
          user={user}
          onEvent={(event) => console.log(event)}
          onExit={(exit) => {
            console.log(exit);
            toggleModal();
          }}
          onSuccess={(success) => 
            console.log(success)
          }
          />
        </View>
      </Modal>
    </BaseBackground>
  )
}

export default DashboardScreen