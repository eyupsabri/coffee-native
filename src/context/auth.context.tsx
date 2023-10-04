import { createContext, useState, ReactNode, useMemo } from "react";
import { AuthContextType, AuthState, UserLogin } from "../@types/User";
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from "axios";


interface Props {
  children?: ReactNode
  // any props that come into the component
}

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = new Date(value);
    else if (typeof value === "object") handleDates(value);
  }
}



export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthContextProvider = ({ children }: Props) => {

  const [authState, setAuthState] = useState<AuthState | null>(null);

  const setAuthStateHelper = async (authToken: string) => {
    switch (authToken) {
      case 'error':
        await EncryptedStorage.setItem("ACCESS_TOKEN_KEY", "");
        setAuthState({ token: "", authenticated: false })
        break
      default:
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        await EncryptedStorage.setItem("ACCESS_TOKEN_KEY", authToken);
        setAuthState({ token: authToken, authenticated: true });

    }

  }

  const register = async (user: UserLogin) => {   
    const res = await axios.post<string>('http://10.0.2.2:7198/api/Login/Login', user, {
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json'
      }
    });
    console.log("register" + res.data);
    setAuthStateHelper(res.data);
  }

  useMemo(() => {  
    const inner = async () => {

      axios.interceptors.response.use((response : any) => {
        // handleDates(response.data);
        return response;
      }, (error: any) => {   
        if(error.response.status === 401){
          //console.log("Interceptor " + error)      
          setAuthStateHelper('error')
          return Promise.resolve();
        }else{
          return Promise.reject(error);
        }        
      });

      const token = await EncryptedStorage.getItem("ACCESS_TOKEN_KEY");
      if (token?.length !== 0 && token) {
        console.log("sifirdan:" + token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        await axios.get<boolean>("http://10.0.2.2:7198/api/Login/isLoggedIn", {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        setAuthStateHelper(token);
      }   
    }
    
    inner();
    

    
  }, []);


  return (
    <AuthContext.Provider value={{ authState, register }}>
      {children}
    </AuthContext.Provider>
  );
}