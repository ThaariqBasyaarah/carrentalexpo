import { View, Text, Image, TextInput, 
    Button, StyleSheet } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';

export default function Login() {
  return (
    <View>
      <Image source={require('@/assets/images/logo-tmmin.png')} />
      <Text style={styles.heading}>Welcome Back!</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput 
            style={styles.formInput}
            placeholder='johndee@gmail.com' />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput 
            style={styles.formInput}
            secureTextEntry={true}
            placeholder='password' 
            />
      </View>
      <View style={styles.formContainer}>
        <Button 
            onPress={() => router.navigate('../(tabs)')}
            color='#3D7B3F'
            title="Sign In"/>
        <Text style={styles.textRegister}>
            Don't have an account?{` `}
            <Link 
                style={styles.linkRegister} href="./Register">Sign up for free</Link></Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 40,
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
        marginVertical: 40
    },
    formContainer: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    formLabel: {
        fontFamily: 'PoppinsBold',
        fontSize: 14,
    },
    formInput: {
        borderWidth: 1,
        padding: 10,
    }, 
    textRegister: {
        marginTop: 10,
        textAlign: 'center'
    },
    linkRegister:{
        color: '#0D28A6',
        textDecorationLine: 'underline'
    }
})