import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants';

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  props: any;
}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }: FormFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false)
  
  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-bsregular'>{title}:</Text>
      <View className='border-2 border-greenBase w-full h-14 px-4 bg-[#235347] rounded-md focus:border-blue-300 items-center flex-row'>
        <TextInput
          className='w-full flex-1 text-white font-bsregular text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#235347"
          onChangeText={handleChangeText}
          secureTextEntry={(title === 'Password' && !showPassword) || (title === 'Confirm Password' && !showPassword)}
        />

        {(title === 'Password' || title === 'Confirm Password') && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eye_hide}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField