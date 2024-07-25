import { View, Text, Button, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import BaseBackground from '@/components/BaseBackground';
import PlaidLink from '@/components/PlaidLink';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getAccounts, getAccount } from '@/lib/actions/bank.actions';

const DashboardScreen = () => {
  const { user } = useGlobalContext();
  const[account, setAccount] = useState<{ data: any } | null>(null);
  const[accounts, setAccounts] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const accounts = await getAccounts({ userId: user.$id });

        if (!accounts) {
          console.error('Error fetching accounts');
          return};

        const accountsData = accounts?.data;
        const appwriteItemId = (user.$id as string) || accountsData[0]?.appwriteItemId;

        const accountData = await getAccount({ appwriteItemId });
        setAccount(accountData);
        setAccounts(accounts);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    fetchAccountData();
  }, [user, user.$id]);

  console.log("Account", account);
  console.log("Accounts", accounts);
  return (
    <BaseBackground>
    <View className='flex-1 items-center justify-center gap-4'>
      <View className='bg-green-500 h-36 w-96 px-6 rounded justify-center'>
        <Text className='text-center'>${accounts?.totalCurrentBalance}</Text>
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
          onSuccess={(success) => {
            console.log(success);
            toggleModal();
          }}
          />
        </View>
      </Modal>
    </BaseBackground>
  )
}

export default DashboardScreen