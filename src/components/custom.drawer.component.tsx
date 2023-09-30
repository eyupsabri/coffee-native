import { useState, useEffect } from "react"
import { StyleSheet,View, Text, Alert } from "react-native"
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



import { MenuItem } from "../@types/Category"
import { ArrangedMenu } from "../@types/Category"
import Accordion from "./accordion.component"

import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerStackParamList } from "../navigation/drawer.stack"

type DrawerProps = DrawerScreenProps<DrawerStackParamList, "DummyScreen">

const CustomDrawer = (props : any) => {
  const navigation = useNavigation<DrawerProps>().navigation;

  const [menuItems, setMenuItems] = useState<ArrangedMenu[] | null>(null);

  useEffect(() => {
    console.log("drawer stack effect")
    const inner = async() => {

      const res = await axios.get<MenuItem[]>("http://10.0.2.2:7198/api/Categories/dummycategories",{
        headers: {
          Accept: 'application/json',
        },
      },);     
       
       
      let children : MenuItem[] = new Array;
      let arranged  = new Map<number, ArrangedMenu>();

      res.data.forEach(m => {
        if(m.ParentMenuItemId)
          children.push(m)
        else  
        arranged.set(m.Id,{Id: m.Id, Title: m.Title, children: new Array})
      })
           
      children.map(c => {        
        if(c.ParentMenuItemId)
          arranged.get(c.ParentMenuItemId)?.children.push(c);
      })
      const cemo = Array.from(arranged.values());
      cemo.map(c => {
        console.log()
        console.log(c)
        
        console.log(c.children)
        console.log()
      })
      
      setMenuItems(Array.from(arranged.values()));
      
    }
    inner();
  },[])



  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.safeArea}>
     {/* <DrawerItemList {...props} />  */}
      
      {/* <View>
        <DrawerItem label={"cemre"} onPress={() => Alert.alert("zaaaa")}/>
      </View>
      <DrawerItem label={"cemre"} onPress={() => Alert.alert("zaaaa")}/> */}

      {menuItems?.map(m => 
        <View key={m.Id} style={styles.container}>    
          <Accordion menu={m}/>  
          <View style={{alignItems: 'center'}} >
            <View style={styles.divider} />
          </View>
        </View>
      )}


      {/* <Accordion
        label="Help"
        // onPress={() => navigation.navigate("DummyScreen")}
        menu={menuItems?.get(1)}
      /> */}
    </SafeAreaView>
    </SafeAreaProvider>
  )
  



}

export default CustomDrawer

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
})