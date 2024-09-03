import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getCarDetails,
  selectCarDetails,
  closeDetails,
} from "@/redux/reducers/car/carDetailsSlice";
import Markdown from "react-native-markdown-display";
import Button from "@/components/Button";
import { Row, Col } from "@/components/Grid";
import Ionicons from "@expo/vector-icons/Ionicons";
import { normalize } from "@/utils/normalize";
import { setCarId, resetState } from "@/redux/reducers/order/orderSlice";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const md = `## Include

- Apa saja yang termasuk dalam paket misal durasi max 12 jam
- Sudah termasuk bensin selama 12 jam
- Sudah termasuk Tiket Wisata
- Sudah termasuk pajak


## Exclude

- Tidak termasuk biaya makan sopir Rp 75.000/hari
- Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
- Tidak termasuk akomodasi penginapan`;

export default function details() {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useSelector(selectCarDetails);
  const dispatch = useDispatch();
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);

  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
      const signal = controller.signal; // UseEffect cleanup

      dispatch(getCarDetails({ id, signal }));
      dispatch(setCarId(id))

      return () => {
        controller.abort();
        // dispatch(closeDetails());
      };
    }, [id])
  );

  // if(isLoading) return <ActivityIndicator/>

  return (
    <View style={styles.container}>
      <Button style={styles.backButton} onPress={() => {
        dispatch(closeDetails())
        router.back()
      }}>
        <Ionicons size={32} name={"arrow-back"} color={"#00000"} />
      </Button>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heading}>
          <Text style={styles.title}>{data.name}</Text>
          <Row style={styles.iconWrapper} gap={5}>
            <Col style={styles.textIcon}>
              <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
              <Text style={styles.capacityText}>{7}</Text>
            </Col>
            <Col style={styles.textIcon}>
              <Ionicons size={14} name={"bag-outline"} color={"#8A8A8A"} />
              <Text style={styles.capacityText}>{4}</Text>
            </Col>
          </Row>
          <Image
            style={styles.image}
            source={{ uri: data.image }}
            height={200}
            width={200}
          />
        </View>
        <Markdown style={styles.details}>{md}</Markdown>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatIDR(data.price || 0)}</Text>
        <Button
          color="#3D7B3F"
          onPress={() => {
            dispatch(setCarId(id))
            dispatch(resetState())
            router.navigate("(order)")
          }}
          title="Lanjutkan Pembayaran"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    paddingTop: 30,
    padding: normalize(20),
  },
  heading: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  image: {
    marginBottom: 20,
  },
  details: {
    body: {
      fontSize: normalize(16),
      marginBottom: 10,
    },
    bullet_list: {
      marginBottom: 10,
    },
    heading2: { marginBottom: 10, fontSize: normalize(18), fontFamily: "PoppinsBold" },
  },
  price: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#eeeeee",
    position: "fixed",
    bottom: 0,
    padding: 20,
  },
  backButton: {
    alignItems: "flex-start",
    position: "fixed",
    backgroundColor: "transparent",
    top: 40,
    left: 10,
    zIndex: 9,
    flex:0,
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
