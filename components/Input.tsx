import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native'
import React from 'react'

const Input: React.FC<TextInputProps> = ({style, ...props}) => {
  return  <TextInput style={[styles.input, style]} {...props} />;
  
}

export default Input

const styles = StyleSheet.create({
    input: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        

    }
})