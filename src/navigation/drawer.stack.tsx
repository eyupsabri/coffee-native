import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

import FirstPage from '../screens/first.component';
import DummyScreen from '../screens/dummy.screen';
import { Category } from '../@types/Category';
import CustomDrawer from '../components/custom.drawer.component';
import { MenuItem } from '../@types/Category';



export type DrawerStackParamList = {
  DummyScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();


const MyDrawer = () => {

  // const [categories, setCategories] = useState<Category[] | null>(null);
  // useEffect(() => {
  //   console.log("drawer stack effect")
  //   const inner = async() => {

  //     const res = await axios.get<Category[]>("http://10.0.2.2:7198/api/Categories",{
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     },);     
  //     setCategories(res.data);   
  //     console.log(res.data[0])   
  //   }
  //   inner();
  // },[])

 

  return (
  <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
    {/* {categories ? categories.map(cat => (
      <Drawer.Screen key={cat.CategoryId} name={cat.CategoryName} component={FirstPage} initialParams={{ categoryId: cat.CategoryId }} />  
    )) :<Drawer.Screen name="DummyScreen" component={DummyScreen} /> }     options={{unmountOnBlur:true}} */}

    {/* {categories ? categories.map(cat => 
      <Drawer.Screen key={cat.CategoryId} name={cat.CategoryName} component={FirstPage} initialParams={{ categoryId: cat.CategoryId, categoryName: cat.CategoryName }} options={{unmountOnBlur:true}} /> ) :
      <Drawer.Screen name="DummyScreen" component={DummyScreen} />
    } */}
    <Drawer.Screen name="DummyScreen" component={DummyScreen} />
   
        
  </Drawer.Navigator>)
}

export default MyDrawer