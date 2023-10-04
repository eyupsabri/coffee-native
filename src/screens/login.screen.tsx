
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthContext } from "../context/auth.context";
import { AuthContextType } from "../@types/User";
import { RootStackParamList } from "../navigation/login.stack";

type LoginProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">


export default function LoginScreen({}: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register} = useContext(AuthContext) as AuthContextType

  const onPress = async () => {   
    console.log(username);
    console.log(password);
    await register({username, password});
           
  }

  return (
   
    <View style={styles.container}>
      
      <Image style={styles.image} resizeMethod="resize" source={require("../../assets/logo_black.png")} /> 
      
      
      <StatusBar barStyle="dark-content" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setUsername(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 

      <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 
    </View> 
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: 150,
    height: 150
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  loginText: {
    fontWeight: "bold"
  }
});