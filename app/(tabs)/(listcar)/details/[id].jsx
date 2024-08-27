import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getCarDetails, selectCarDetails } from '@/redux/reducers/car/carDetailsSlice'

export default function details() {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useSelector(selectCarDetails)
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal;  // UseEffect cleanup

    dispatch(getCarDetails({id, signal}))

    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <View style={style.container}>
      <ScrollView>
        <Text>{data.name}</Text>
        <Image 
          source={{uri: data.image}}
          height={100}
          width={100}
        />
      </ScrollView>
      <View style={style.footer}>
        <Text style={style.price}>{data.price}</Text>
        <Button
          color='#3D7B3F'
          title="Lanjutkan Pembayaran"
        />
      </View>
    </View>
  )
}

const style= StyleSheet.create({
  container:{
    paddingTop: 100, 
    flex:1,
    backgroundColor: '#ffffff'
  },
  price:{
    fontFamily: 'PoppinsBold',
    fontSize: 16,
    marginBottom: 10
  },
  footer:{
    backgroundColor: '#eeeeee',
    position: 'fixed',
    bottom:0,
    padding:20,
  }
})