import {useState, useEffect} from 'react';
import { View, ScrollView, Image, Text, Button, StyleSheet,TextInput, Alert } from 'react-native';

import { ProductsStackParamList } from './first.component';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { updateProduct } from '../utils/data.utils';
import { Product, ProductUpdateReq } from '../@types/Product';

type ProductPageProps = NativeStackScreenProps<ProductsStackParamList, "ProductDetailView">

const ProductDetailView = ({route}:ProductPageProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);
  useEffect(() => {
    const pr = route.params.product;
    setUpdatedProduct(pr)
  },[])
  
  const [description, setDescription] = useState("");
  
  const onPressHandler = async () => {
    if(updatedProduct){
      updatedProduct.ProductDescription = description;
      //const updateReq : ProductUpdateReq = {product: updatedProduct, image : `http://10.0.2.2:7198/assets/products/${updatedProduct?.ImageGuid}.jpg`}
      console.log(updatedProduct)
      try{
        const newProduct = await updateProduct(updatedProduct)
        setUpdatedProduct(newProduct);
        Alert.alert("Updated")
      }catch(e){
        console.log(e);
      }    
    }  
  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: `http://10.0.2.2:7198/assets/products/${updatedProduct?.ImageGuid}.jpg` }} />
      <View style={styles.info}>
        <Text style={styles.name}>{updatedProduct?.ProductName}</Text>
        <Text style={styles.price}>${updatedProduct?.ProductPrice}</Text>
        <TextInput
          style={styles.description}
          defaultValue= {updatedProduct?.ProductDescription}
          // placeholderTextColor="#003f5c"
          secureTextEntry={false}
          onChangeText={(dsc) => setDescription(dsc)}
        />
      </View>
      <Button title="Update" onPress={onPressHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#999',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default ProductDetailView;
