import {  Alert } from "react-native";
import React from "react";
import {
 Menu,
 MenuOptions,
 MenuOption,
 MenuTrigger,
} from "react-native-popup-menu";
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleSheet } from "react-native"; 
import { Product } from "../@types/Product";

type Props = {
  onPressDetailsHandler: (pr: Product) => void;
  product: Product;
  // any props that come into the component
}

const SimpleMenu = ({onPressDetailsHandler, product}: Props) => {
  

 return (
     <Menu style= {styles.container}>
       <MenuTrigger>
        <Entypo name="dots-three-vertical" size={24} color="black" />
       </MenuTrigger>
       <MenuOptions>
         <MenuOption onSelect={() => onPressDetailsHandler(product)} text="Details" />
         <MenuOption onSelect={() => Alert.alert(`Delete`)} text="Delete" />
       </MenuOptions>
     </Menu> 
 );
};

export default SimpleMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "column",
  },
 });