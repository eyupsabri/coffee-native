import { useState, useEffect, useContext } from "react"
import { StyleSheet,View} from "react-native"
import { DrawerContentScrollView} from "@react-navigation/drawer"

import axios from "axios"
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuItem } from "../@types/Category"
import { ArrangedMenu } from "../@types/Category"
import Accordion from "./accordion.component"
import { DrawerIds } from "../@types/Drawer";
import { DrawerContext } from "../context/drawer.context";
import { DrawerContextType } from "../@types/Drawer";


const CustomDrawer = (props : any) => {
  const {navigation} = props;
  const {setDrawerId} = useContext(DrawerContext) as DrawerContextType

  const [menuItems, setMenuItems] = useState<ArrangedMenu[] | null>(null);

  const onPressNavigate = (title: string, Ids: DrawerIds) => {
    setDrawerId({...Ids})
    navigation.navigate("DummyTwoScreen", {title: title})
  }

  

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
      setMenuItems(Array.from(arranged.values()));   
    }
    inner();
  },[])



  return (
    <DrawerContentScrollView {...props}>
    <SafeAreaView style={styles.safeArea}>
     {/* <DrawerItemList {...props} />  */}
      
      {/* <View>
        <DrawerItem label={"cemre"} onPress={() => Alert.alert("zaaaa")}/>
      </View>
      <DrawerItem label={"cemre"} onPress={() => Alert.alert("zaaaa")}/> */}

      {menuItems?.map(m => 
        <View key={m.Id} style={styles.container}>    
          <Accordion menu={m} onPressHandler={onPressNavigate} />  
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
    </DrawerContentScrollView>
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