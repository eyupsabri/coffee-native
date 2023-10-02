import { useState, useEffect } from "react"
import { StyleSheet,View} from "react-native"
import { DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer"

import axios from "axios"
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuItem } from "../@types/Category"
import { ArrangedMenu } from "../@types/Category"
import Accordion from "./accordion.component"
import { DrawerIds } from "../@types/Drawer";




const CustomDrawer = (props : any) => {
  
  const {navigation} = props;
  // const {setDrawerId, isHomePage} = useContext(DrawerContext) as DrawerContextType
  const [Ids, setIds] = useState<DrawerIds | null>(null)
  const [isHomePage, setIsHomePage] = useState(true);

  const [menuItems, setMenuItems] = useState<ArrangedMenu[] | null>(null);

  const onPressNavigate = (title: string, Ids: DrawerIds) => {
    setIsHomePage(false);
    setIds({...Ids})
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

      {isHomePage ? 
        <DrawerItem label={"Home Page"} focused onPress={() => {
          setIds(null)
          setIsHomePage(true);     
          navigation.navigate("DummyScreen")}}
        /> : 
        <DrawerItem label={"Home Page"}  onPress={() => {     
          setIds(null) 
          setIsHomePage(true);   
          navigation.navigate("DummyScreen")}} />
      } 
           
      {menuItems?.map(m => 
        <View key={m.Id} style={styles.container}>    
          <Accordion menu={m} onPressHandler={onPressNavigate} Ids={Ids} isHomePage={isHomePage}/>  
          <View style={{alignItems: 'center'}} >
            <View style={styles.divider} />
          </View>
        </View>
      )}
  
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