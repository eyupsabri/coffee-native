import { Text } from "react-native"
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerStackParamList } from "../navigation/drawer.stack";

type Dummy2ScreenProps = DrawerScreenProps<DrawerStackParamList, "DummyTwoScreen">

const DummyTwoScreen = ({navigation, route} : Dummy2ScreenProps) => {
  const title = route.params.title
  return <Text>{title}</Text>
}

export default DummyTwoScreen