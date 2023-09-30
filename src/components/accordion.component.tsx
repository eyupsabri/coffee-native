import { Text, Alert } from "react-native";
import { DrawerItem } from "@react-navigation/drawer"
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

import { LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { ArrangedMenu } from "../@types/Category";

type Props = {
  menu: ArrangedMenu;
}

const Accordion = (props: Props) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const {menu} = props;

  const toggleOpen = () => {
    console.log(menu)
    setIsOpen(!isOpen); 
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  // if(!isOpen){
  //   return <DrawerItem onPress= {() => toggleOpen} style = {styles.heading} 
  //        icon={() => <Icon name={isOpen ? "chevron-up-outline" : "chevron-down-outline"} color="black" size={18}/>}
  //        label={menu?.Title}
  //      /> 
  // }else {
  //   menu?.children.map(c => {
  //     <DrawerItem label= {c.Title} onPress={() => Alert.alert("cemre")}/>
  //   })
  // }



  // label={menu.Title}>
  // icon={() => <Icon name={!isOpen ? "chevron-up-outline" : "chevron-down-outline"} color="black" size={18}/>}


  return (
    <>
      <TouchableOpacity onPress= {() => toggleOpen()} style={[styles.heading, !isOpen ? {backgroundColor: "white"} : {backgroundColor: "#007FFF"}]} activeOpacity={0.3}>
          <Text>{menu.Title}</Text>
          <Icon name={isOpen ? "chevron-up-outline" : "chevron-down-outline"} color="black" size={18}/>
      </TouchableOpacity>
  
      {menu.children.map(c => (
        <DrawerItem key={c.Id} style={[styles.list, !isOpen ? styles.hidden : undefined]}  label= {c.Title} onPress={() => Alert.alert("cemre")} />
      ))}
      
    </>
    
  );
        
}



export default Accordion;

const styles = StyleSheet.create({
 
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  safeArea: {
    flex: 1,
  },
  heading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 1
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden'
  },
  sectionTitle: {
    fontSize: 16,
    height: 30,
    marginLeft: '5%',
  },
  sectionDescription: {
    fontSize: 12,
    height: 30,
    marginLeft: '5%',
  }

});

