import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import Button from "../../components/Button";
import { useCallback, useEffect, useState } from "react";
import ModalPopup from "../../components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, selectUser, closeModal } from '@/redux/reducers/auth/loginSlice';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton  } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
});

export default function Login() {
  const dispatch = useDispatch();
  const {errorMessage, isModalVisible, isError} = useSelector(selectUser);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
  };

  const handleSubmit = useCallback(() => {
    console.log("test submit", formData);
    dispatch(postLogin(formData))
  }, [formData]);

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
    const { data: { idToken } } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(idToken, googleCredential)
    return auth().signInWithCredential(googleCredential);
  }

  function onAuthStateChanged(user) {
    console.log(user)
    // if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  useEffect(() => {
    if(isModalVisible) {
      setTimeout(() => {
        dispatch(closeModal())
        if(!isError) router.replace('../(tabs)')
      }, 2000)
    }
  }, [isModalVisible])

  return (
    <View>
      <Image source={require("@/assets/images/logo-tmmin.png")} />
      <Text style={styles.heading}>Welcome Back!</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          onChangeText={(text) => handleChange("email", text)}
          style={styles.formInput}
          placeholder="johndee@gmail.com"
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          onChangeText={(text) => handleChange("password", text)}
          style={styles.formInput}
          secureTextEntry={true}
          placeholder="password"
        />
      </View>
      <View style={styles.formContainer}>
        <Button
          onPress={() => handleSubmit()}
          color="#3D7B3F"
          title="Sign In"
        />
        <Text style={styles.textRegister}>
          Don't have an account?{` `}
          <Link style={styles.linkRegister} href="/register">
            Sign up for free
          </Link>
        </Text>
      </View>
      <View>
        <Text>Or</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
          // disabled={isInProgress}
        />
      </View>
      <ModalPopup visible={isModalVisible}>
        <View style={styles.modalBackground}>
        { errorMessage !== null ?
            <>
              <Ionicons size={32} name={'close-circle'} />
              <Text>{errorMessage}</Text>
            </>
            : 
            <>
              <Ionicons size={32} name={'checkmark-circle'} />
              <Text>Berhasil Login!</Text>
            </>
          }
        </View>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    marginVertical: 40,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  formLabel: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
  },
  textRegister: {
    marginTop: 10,
    textAlign: "center",
  },
  linkRegister: {
    color: "#0D28A6",
    textDecorationLine: "underline",
  },
  modalBackground: {
    width:'90%',
    backgroundColor: '#fff',
    elevation: 20,
    borderRadius: 4,
    padding:20
  }

});
