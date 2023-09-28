import React from "react";


import { AuthContextProvider } from "./context/auth.context";
import NavContainer from "./navigation/nav.container";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  
  return (
    <AuthContextProvider>
      <MenuProvider >
        <NavContainer>      
        </NavContainer>
      </MenuProvider>
    </AuthContextProvider>
    
  );
}

