import { UserLogin } from "../@types/User";
import axios from "axios";
import { Product, ProductUpdateReq } from "../@types/Product";

export const login = async<T>(url: string, userLogin: UserLogin): Promise<T> => {

  const response = await fetch(url, { method: "POST", headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',
  },
  body: JSON.stringify(userLogin)
  })
  const cemre = await response.json();
 
  return cemre;

}

export const updateProduct = async(product: Product): Promise<Product> => {

  const res = await axios.post<Product>('http://10.0.2.2:7198/api/Products/update', product, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      }});

  return res.data;

}