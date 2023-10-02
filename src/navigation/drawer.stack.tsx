import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

import FirstPage from '../screens/first.component';
import DummyScreen from '../screens/dummy.screen';
import { Category } from '../@types/Category';
import CustomDrawer from '../components/custom.drawer.component';
import { MenuItem } from '../@types/Category';
import DummyTwoScreen from '../screens/dummy2.screen';



export type DrawerStackParamList = {
  DummyScreen: undefined;
  DummyTwoScreen: {title: string};
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();


const MyDrawer = () => {


  return (
  <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
    
    <Drawer.Screen name="DummyScreen" component={DummyScreen} />
    <Drawer.Screen name="DummyTwoScreen" component={DummyTwoScreen} initialParams={{title: "DA DA DA DUM"}}/>
   
        
  </Drawer.Navigator>)
}

export default MyDrawer