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
import { useIsFocused,useFocusEffect } from '@react-navigation/native';

import { Product, Paging } from "../@types/Product";
import SimpleMenu from "../components/simple.menu.component";


import { ProductsStackParamList } from "./first.component";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


type ProductsPageProps = NativeStackScreenProps<ProductsStackParamList, "ProductsScreen">


const ProductsScreen = ({navigation, route}: ProductsPageProps) => {

  const isFocused = useIsFocused();
  // const catId = route.params?.categoryId ? route.params.categoryId : "1" ;
  const catId = route.params.categoryId;
  const catName = route.params.categoryName;

  const onPressDetailsHandler = (pr: Product) => {
    navigation.navigate("ProductDetailView", {product: pr})
  } 

  // navigation.replace("ProductsScreen",{categoryId: catId, categoryName: catName});
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    
    const inner = async() => {
      const res = await axios.get<Paging>("http://10.0.2.2:7198/api/Products/products?categoryId=" + catId,{
        headers: {
          Accept: 'application/json',
        },
      },);     
      setProducts(res.data.dtos);   
      console.log("products screen useEffect" )   
      console.log(res.data.dtos?.at(0))
    }
    isFocused && inner();
  },[isFocused])

  // useFocusEffect(() => {
  //   const inner = async() => {
  //     const res = await axios.get<Paging>("http://10.0.2.2:7198/api/Products/products?categoryId=" + catId,{
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     },);     
  //     setProducts(res.data.dtos);   
  //     console.log("products screen useEffect" )   
  //     console.log(res.data.dtos?.at(0))
  //   }
  //   inner();
  // })

  return(
  
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          // enableEmptySections={true}
          data={products}
          keyExtractor={pr => "" + pr.ProductId}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View style={styles.box}>
                  <Image style={styles.image} source={{ uri: `http://10.0.2.2:7198/assets/products/${item.ImageGuid}.jpg` }} />
                  <Text style={styles.username}>{item.ProductName}</Text>           
                  <View style={styles.iconContent}>
                    <SimpleMenu onPressDetailsHandler={onPressDetailsHandler} product={item}/>
                  </View>
                </View>           
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
  },
  body: {
    backgroundColor: '#E6E6FA',
  },
  box: {
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
  iconContent: {
    width: 60,
    height: 60,
    backgroundColor: '#40E0D0',
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },

})

export default ProductsScreen;