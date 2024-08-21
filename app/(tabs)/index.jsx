import { Image, StyleSheet, View, Text, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Constants from "expo-constants";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Hi, Nama</Text>
            <Text style={styles.titleText}>Location</Text>
          </View>
          <View>
            <Image
              style={styles.imageProfile}
              source={require("@/assets/images/img_photo.png")}
            />
          </View>
        </View>
      }
    >
      <View style={styles.banner}>
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>Sewa Mobil Berkualitas di kawasanmu</Text>
            <Button 
              color='#3D7B3F'
              title="Sewa Mobil"/>
          </View>
          <View>
            <Image
              source={require("@/assets/images/img_car.png")}
            />
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  titleText: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
  },
  imageProfile: {
    height: 35,
    width: 35,
  },
  banner: {
    backgroundColor: "#AF392F",
    marginTop: -140,
    overflow:'hidden',
    paddingTop: 20,
    borderRadius:5
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerTextContainer:{
    width: '45%',
    padding:10,
    paddingBottom: 25
  },
  bannerText: {
    color: "#ffffff",
    fontFamily: "Poppins",
    fontSize:16
  },
});
