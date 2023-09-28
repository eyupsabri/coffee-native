import { useEffect,useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerStackParamList } from "../navigation/drawer.stack";
import { Product, Paging } from "../@types/Product";
import ProductsScreen from "./products.screen";
import ProductDetailView from "./product.screen";


//Uber salakca oldu dynamically olması lazım
export type ProductsStackParamList = {
  ProductsScreen: { categoryId: string ; categoryName: string};
  ProductDetailView: {product: Product}
};
const Stack = createNativeStackNavigator<ProductsStackParamList>();


// type FirstPageProps = DrawerScreenProps<DrawerStackParamList, "FirstPage">



const FirstPage = ({navigation,route} : any ) => {

  const categoryName = route.params?.categoryName;
  
  const categoryId = route.params?.categoryId;
  
  return(
  <Stack.Navigator initialRouteName="ProductsScreen" >
    {/* {categoryId ? <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{title: "Products"}} initialParams={{ categoryId: categoryId }}/> :
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{title: "Products"}} />}     */}
    <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{title: "Products"}} initialParams={{ categoryId: categoryId, categoryName: categoryName }}/>   
    <Stack.Screen name={"ProductDetailView"} component={ProductDetailView} />     
  </Stack.Navigator>
  )
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     width: 60,
//     height: 60,
//   },
//   body: {
//     backgroundColor: '#E6E6FA',
//   },
//   box: {
//     marginHorizontal: 20,
//     marginTop: 5,
//     marginBottom: 5,
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     shadowColor: 'black',
//     shadowOpacity: 0.2,
//     shadowOffset: {
//       height: 1,
//       width: -2,
//     },
//     elevation: 2,
//   },
//   username: {
//     color: '#20B2AA',
//     fontSize: 22,
//     alignSelf: 'center',
//     marginLeft: 10,
//   },
//   iconContent: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#40E0D0',
//     marginLeft: 'auto',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

// })

export default FirstPage;