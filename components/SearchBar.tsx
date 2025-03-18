import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    placeholder: string;
    onPress?: () => void;
    value: string;
    onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View
      className='flex-row items-center bg-primaryDark rounded-full px-5 py-4'
    >
        <Image
            source={icons.search}
            className='w-5 h-5'
            resizeMode='contain'
            tintColor={'#f0c760'}
        />
        <TextInput
            onPress={onPress}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#f0c760"
            className='flex-1 ml-2 text-white'
        />
    </View>
  )
}

export default SearchBar