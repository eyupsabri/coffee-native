import {  Text,StyleSheet, TouchableOpacity, ScrollView, View, Alert } from "react-native"
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerStackParamList } from "../navigation/drawer.stack";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getData } from "../utils/data.utils";
import { useBackHandler } from "@react-native-community/hooks";
import { SortingType } from "../@types/Person";

import { DummyPerson } from "../@types/Person";

import Icon from 'react-native-vector-icons/Ionicons';


import { Table, Row } from 'react-native-reanimated-table';

type Dummy2ScreenProps = DrawerScreenProps<DrawerStackParamList, "DummyTwoScreen">

const DummyTwoScreen = ({navigation, route} : Dummy2ScreenProps) => {

  const isFocused = useIsFocused();
  const title = route.params.title;
  const {setIds, setIsHomePage} = route.params;
  const [people, setPeople] = useState<DummyPerson[] |null>(null);
  const [peopleArray, setPeopleArray] = useState<string[][] | null>(null)
  const [sortAsc, setSortAsc] = useState<SortingType>({LastSort: "Id", SortAsc: true});

  const tableHead= ['Id', 'Name', 'SirName', 'Address', 'Departman', 'Overtime', 'BirthDate', 'PlaceOfBirth', 'DateOfRecruitment'];
  const widthArr= [40, 100, 120, 200, 100, 50, 120, 100, 120];

  const mySorter = (sortBy: string) => {
    if(peopleArray){
      const temp: string[][] = new Array(peopleArray.length).fill(0).map(() => new Array(9).fill(0));
      for (let i = 0; i < peopleArray.length; i++) {      
        temp[i] = [...peopleArray[i]]
      }
      if(sortAsc.LastSort === sortBy){
        const newSort = !sortAsc.SortAsc
        console.log("yeni sort " + newSort)
        if(newSort){
          switch(sortBy){
            case "Id":
              temp.sort((a,b) => +a[0] - +b[0]);
              
              break
            case "Name":
              temp.sort((a, b) => {
                if (a[1] > b[1]) {
                    return 1;
                }
            
                if (a[1] < b[1]) {
                    return -1;
                }
                return 0;
              });  
              break
            case "SirName":
              temp.sort((a, b) => {
                if (a[2] > b[2]) {
                    return 1;
                }
            
                if (a[2] < b[2]) {
                    return -1;
                }
                return 0;
              });
              break
            case "Address":
              temp.sort((a, b) => {
                if (a[3] > b[3]) {
                    return 1;
                }
            
                if (a[3] < b[3]) {
                    return -1;
                }
                return 0;
              });           
              break
            case "Departman":
              temp.sort((a, b) => {
                if (a[4] > b[4]) {
                    return 1;
                }
            
                if (a[4] < b[4]) {
                    return -1;
                }
                return 0;
              });
              break       
            }
        }  
        else{
          switch(sortBy){
            case "Id":
              temp.sort((a,b) => +b[0] - +a[0]);
              break
            case "Name":
              temp.sort((a, b) => {
                if (b[1] > a[1]) {
                    return 1;
                }
            
                if (b[1] < a[1]) {
                    return -1;
                }
                return 0;
              });
              break
            case "SirName":
              temp.sort((a, b) => {
                if (b[2] > a[2]) {
                    return 1;
                }
            
                if (b[2] < a[2]) {
                    return -1;
                }
                return 0;
              });
              break
            case "Address":
              temp.sort((a, b) => {
                if (b[3] > a[3]) {
                    return 1;
                }
            
                if (b[3] < a[3]) {
                    return -1;
                }
                return 0;
              });
              break
            case "Departman":
              temp.sort((a, b) => {
                if (b[4] > a[4]) {
                    return 1;
                }
            
                if (b[4] < a[4]) {
                    return -1;
                }
                return 0;
              });
              break       
            }
        }
        setPeopleArray(temp);  
        setSortAsc({LastSort: sortAsc.LastSort, SortAsc: newSort})  
      }
      else{
        switch(sortBy){
          case "Id":
            temp.sort((a,b) => +a[0] - +b[0]);
            
            break
          case "Name":
            temp.sort((a, b) => {
              if (a[1] > b[1]) {
                  return 1;
              }
          
              if (a[1] < b[1]) {
                  return -1;
              }
              return 0;
            });  
            break
          case "SirName":
            temp.sort((a, b) => {
              if (a[2] > b[2]) {
                  return 1;
              }
          
              if (a[2] < b[2]) {
                  return -1;
              }
              return 0;
            });
            break
          case "Address":
            temp.sort((a, b) => {
              if (a[3] > b[3]) {
                  return 1;
              }
          
              if (a[3] < b[3]) {
                  return -1;
              }
              return 0;
            });           
            break
          case "Departman":
            temp.sort((a, b) => {
              if (a[4] > b[4]) {
                  return 1;
              }
          
              if (a[4] < b[4]) {
                  return -1;
              }
              return 0;
            });
            break       
          }
        setPeopleArray(temp);  
        setSortAsc({LastSort: sortBy, SortAsc: true})   
      }

        
    }  
  }

  const elementButton = (tableHead: string[]) => {
    return tableHead.map(t => (
      <TouchableOpacity onPress={() => mySorter(t)}>
        <View>
          {sortAsc.LastSort === t && 
            <Icon name={ !sortAsc.SortAsc ? "chevron-up-outline" : "chevron-down-outline" } color="black" size={18}/>
          }
          <Text style={[styles.text, {color: "#fff"} ]}>{t}</Text>
        </View>
      </TouchableOpacity>
    ))
  }
    
  const myBackHandler = () => {
    console.log("my backhandler")
    setIds(null);
    setIsHomePage(true);
    return false
  }
  useBackHandler(myBackHandler);

  useEffect(() => {
    
    if(isFocused){
      const inner = async() => {
        const res = await getData<DummyPerson[]>("http://10.0.2.2:7198/api/DummyPeople");
        if(res){
          // setPeople(res);
          const matrix: string[][] = new Array(res.length).fill(0).map(() => new Array(9).fill(0));
          for (let i = 0; i < res.length; i++) {      
            for (const [key, value] of Object.entries(res[i])) {   
              switch(key){
                case "Id" :
                  matrix[i][0] = "" + value
                  break
                case "Name" : 
                  matrix[i][1] = "" + value
                  break
                case "SirName" : 
                  matrix[i][2] = "" + value
                  break
                case "Address" : 
                  matrix[i][3] = "" + value
                  break
                case "Departman" :
                  matrix[i][4] = "" + value
                  break
                case "Overtime" :
                  matrix[i][5] = "" + value
                  break
                case "BirthDate" :
                  matrix[i][6] = "" + value
                  break
                case "PlaceOfBirth" :
                  matrix[i][7] = "" + value
                  break
                case "DateOfRecruitment" :
                  matrix[i][8] = "" + value
                  break
              }
            }         
          }
          console.log("COMMOLOKKOOOO")
          setPeopleArray(matrix);
        }
      }  
      inner();           
    }
  },[isFocused])


  return (
    <>
      <Text>{title}</Text>
      {peopleArray && 
        (
          <>
          <Text>girdi</Text>
          <View style={styles.container}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  <Row data={elementButton(tableHead)} widthArr={widthArr} style={styles.header} />
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    {
                      peopleArray.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[ styles.row, index % 2  ? styles.changeBackground : undefined]}
                        textStyle={styles.text}
                      />
                      ))
                    }
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
          </>
        )
      }  
    </>
  )
}

export default DummyTwoScreen


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '400' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  changeBackground: {backgroundColor: '#F7F6E7'}
});