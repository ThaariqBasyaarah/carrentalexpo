import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '@/redux/reducers/auth/loginSlice'
import { router } from 'expo-router';

export default function profile() {
  const { data, isLogin } = useSelector(selectUser)
  const dispatch = useDispatch()

   return (
    <View style={{flex:1, justifyContent:'center'}}>
      {
        data?.access_token ? 
        <Button title={"logout"} onPress={() => {
          dispatch(logout())
          router.replace('../(auth)')
        }} />
        : 
        <Button title={"register"} onPress={() => 
            router.navigate('../(auth)/register')
          }/>
      }
    </View>
  )
}