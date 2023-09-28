
import React, { ReactNode, useContext}  from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// import { AuthContext } from "../context/auth.context";
// import { AuthContextType } from "../@types/User";
import LoginScreen from "../screens/login.component";
import FirstPage from "../screens/first.component";



export type RootStackParamList = {
  LoginScreen: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const LoginStack = () => {
  // const {authState} = useContext(AuthContext) as AuthContextType
  return(   
    <Stack.Navigator initialRouteName="LoginScreen">    
        <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{title: "Login"}}/>              
    </Stack.Navigator>  
  )
}

export default LoginStack