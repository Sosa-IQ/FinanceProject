import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#DAF1DE'}
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarShowLabel: true,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/navbar/dashboard.png')}
              style={{width: 24, height: 24, tintColor: color}}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: 'Budgets',
          tabBarShowLabel: true,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/navbar/budget.png')}
              style={{width: 24, height: 24, tintColor: color}}
            />
          ),
        }}
        />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarShowLabel: true,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/navbar/transactions.png')}
              style={{width: 24, height: 24, tintColor: color}}
            />
          ),
        }}
        />
        <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarShowLabel: true,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/navbar/settings.png')}
              style={{width: 24, height: 24, tintColor: color}}
            />
          ),
        }}
        />
      </Tabs>
  )
}