import { View, Text, TextInput, StyleSheet } from "react-native";
import {useCallback} from "react";
import { useSelector } from "react-redux";
import { selectOrder } from "@/redux/reducers/order/orderSlice";
import { selectCarDetails } from "@/redux/reducers/car/carDetailsSlice";
import CarList from "@/components/CarList";
import Button from "@/components/Button";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function step1({setActiveStep}) {
  const { carId } = useSelector(selectOrder);
  const { data } = useSelector(selectCarDetails);
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);
  return (
    <View style={styles.container}>
      <CarList
        image={{ uri: data.image }}
        carName={data.name}
        passengers={5}
        baggage={4}
        price={data.price}
      />
      <Text style={styles.textBold}>Pilih Bank Transfer</Text>
      <Text style={styles.textBold}>
        Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
        Mobile Banking
      </Text>
      <View>
        <Button style={styles.paymentMethod}>
          <Text style={styles.paymentBox}>BCA</Text>
          <Text style={styles.paymentText}>BCA Transfer</Text>
        </Button>
        <Button>
          <Text>BNI</Text>
          <Text>BNI Transfer</Text>
        </Button>
        <Button>
          <Text>Mandiri</Text>
          <Text>Mandiri Transfer</Text>
        </Button>
      </View>
      <View>
        <Text>% Pakai Kode Promo</Text>
        <View>
          <TextInput placeholder="Tulis promomu disini" />
          <Button title={"Terapkan"} />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatIDR(data.price || 0)}</Text>
        <Button
          disabled={true}
          color="#3D7B3F"
          onPress={() => {
            setActiveStep(1)
          }}
          title="Lanjutkan Pembayaran"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20
    },
    textBold:{
        fontFamily: 'PoppinsBold',
        fontSize: 16,
        marginBottom: 10
    },
    paymentMethod:{
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 20,
        borderWidthBottom: 1,
        borderColorBottom: '#D0D0D0'
    },
    paymentBox: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: '#D0D0D0'
    }
});
