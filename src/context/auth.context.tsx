import { createContext, useState, ReactNode, useMemo } from "react";
import { AuthContextType, AuthState, UserLogin } from "../@types/User";
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from "axios";


interface Props {
  children?: ReactNode
  // any props that come into the component
}


export const AuthContext = createContext<AuthContextType | null>(null);




export const AuthContextProvider = ({ children }: Props) => {

  const [authState, setAuthState] = useState<AuthState | null>(null);

  const setAuthStateHelper = async (authToken: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    await EncryptedStorage.setItem("ACCESS_TOKEN_KEY", authToken);
    setAuthState({token: authToken, authenticated: true});
  }

  const register = async (user: UserLogin) => {
    try{
      const res = await axios.post<string>('http://10.0.2.2:7198/api/Login/Login', user, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      }});
      console.log(res.data);
      setAuthStateHelper(res.data);
    }catch(err ){
      console.log(err)
    }
  }

  useMemo(
    async() => {
      try{       
        const token = await EncryptedStorage.getItem("ACCESS_TOKEN_KEY");
        console.log("sifirdan:" + token)
        if(token){         
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          await axios.get<boolean>("http://10.0.2.2:7198/api/Login/isLoggedIn", {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
          }});
         
          setAuthStateHelper(token);
        }
        
      }catch(e){

        console.log("pls log in");
      }     
    },[]);


  return (
      <AuthContext.Provider value={{ authState, setAuthStateHelper, register }}>
          {children}
      </AuthContext.Provider>
  );
}