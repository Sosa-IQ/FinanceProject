import {View, Text} from 'react-native'
import React from 'react'
import PlaidLink from '@/lib/PlaidLink'


const HistoryScreen = () => {
  return (
    <PlaidLink
      linkToken={"link-sandbox-..."}
      onEvent={(event) => console.log(event)}
      onExit={(exit) => console.log(exit)}
      onSuccess={(success) => console.log(success)}
    />
  )
}

export default HistoryScreen