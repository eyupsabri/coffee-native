import { Text } from "react-native"
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerStackParamList } from "../navigation/drawer.stack";

type ProductsPageProps = DrawerScreenProps<DrawerStackParamList, "DummyScreen">

const DummyScreen = ({navigation, route} : ProductsPageProps) => {
  // const isFocused = useIsFocused();
  // const {setIsHomePageHelper} = useContext(DrawerContext) as DrawerContextType


  // useEffect(()=> {
  //   isFocused && setIsHomePageHelper(true)
  // },[isFocused])

  return <Text>dummy</Text>
}

export default DummyScreen