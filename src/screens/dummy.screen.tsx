import { Text } from "react-native"
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerStackParamList } from "../navigation/drawer.stack";

type ProductsPageProps = DrawerScreenProps<DrawerStackParamList, "DummyScreen">

const DummyScreen = ({navigation, route} : ProductsPageProps) => {
  return <Text>dummy</Text>
}

export default DummyScreen