import { Text } from "react-native";
import { DrawerItem } from "@react-navigation/drawer"
import { useState, useContext, useEffect } from "react";


import { LayoutAnimation, StyleSheet, TouchableOpacity, UIManager } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { ArrangedMenu } from "../@types/Category";
import { DrawerIds, DrawerContextType } from "../@types/Drawer";
import { DrawerContext } from "../context/drawer.context";

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


type Props = {
  menu: ArrangedMenu;
  onPressHandler: (title: string, Ids: DrawerIds) => void
  
}

const Accordion = (props: Props) => {
  const {Ids} = useContext(DrawerContext) as DrawerContextType
  const [isOpen, setIsOpen] = useState(false);
  const {menu, onPressHandler} = props;

  const toggleOpen = () => {
    console.log(menu)
    LayoutAnimation.configureNext(LayoutAnimation.create(400, 'easeInEaseOut', 'opacity'));
    setIsOpen(!isOpen); 
  }

  useEffect(() => {
    if(Ids?.parentId === menu.Id)
      setIsOpen(true)
    else
      setIsOpen(false)
  },[Ids])

  return (
    <>
      <TouchableOpacity onPress= {() => toggleOpen()} style={[styles.heading, !isOpen ? {backgroundColor: "white"} : {backgroundColor: "#007FFF"}]} activeOpacity={0.3}>
          <Text>{menu.Title}</Text>
          <Icon name={isOpen ? "chevron-up-outline" : "chevron-down-outline"} color="black" size={18}/>
      </TouchableOpacity>
  
      {/* {menu.children.map(c => (
        <DrawerItem key={c.Id} style={[styles.list, !isOpen ? styles.hidden : undefined]}  label= {c.Title} onPress={() => onPressHandler(c.Title, {parentId: menu.Id, childId: c.Id})} />
      ))} */}
      {isOpen && menu.children.map(c => {
        if(Ids?.childId === c.Id)
          return <DrawerItem key={c.Id} style={styles.selected}  label= {c.Title} onPress={() => onPressHandler(c.Title, {parentId: menu.Id, childId: c.Id})} />
        return <DrawerItem key={c.Id}  label= {c.Title} onPress={() => onPressHandler(c.Title, {parentId: menu.Id, childId: c.Id})} />
        }  
      )}
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
  selected: {
    backgroundColor: "#007FFF"
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

