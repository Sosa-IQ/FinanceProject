import {View, Text} from 'react-native'
import React from 'react'
import PlaidLink from '@/components/PlaidLink'
import { createLinkToken } from '@/lib/actions/user.actions';

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
// const linkToken = createLinkToken(user);
// console.log(String(linkToken));

const BudgetScreen = () => {
  return (
    <View className='w-screen h-screen'>
      <PlaidLink
      // linkToken={String(linkToken)}
      onEvent={(event) => console.log(event)}
      onExit={(exit) => console.log(exit)}
      onSuccess={(success) => console.log(success)}
      />
    </View>


  )
}

export default BudgetScreen