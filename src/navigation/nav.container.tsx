import { useContext, ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";

import LoginStack from "./login.stack";
import MyDrawer from "./drawer.stack";

import { AuthContext } from "../context/auth.context";
import { AuthContextType } from "../@types/User";
import { DrawerContextProvider } from "../context/drawer.context";

interface Props {
  children?: ReactNode
  // any props that come into the component
}

export default function NavContainer({ }: Props) {
  const { authState } = useContext(AuthContext) as AuthContextType
  return (
    <NavigationContainer>
      {(authState?.authenticated) ? (
        <DrawerContextProvider>
          <MyDrawer />
        </DrawerContextProvider>) : <LoginStack />}
    </NavigationContainer>
  );
}