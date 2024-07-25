import { View, Text, Button } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import BaseBackground from '@/components/BaseBackground';
import { useGlobalContext } from '@/context/GlobalProvider';
import { router } from 'expo-router';
import { signOut } from '@/lib/actions/user.actions';

const SettingsScreen = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/log-in");
  };
  
  return (
    <BaseBackground>
      <View className='flex-1 justify-center items-center'>
        <View className='bg-greenSecondary rounded-xl'>
          <Button title="Log Out" onPress={logout} />
        </View>
      </View>
    </BaseBackground>
  )
}

export default SettingsScreen