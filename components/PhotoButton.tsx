import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, View ,Dimensions,Text} from 'react-native';
const {width,height} = Dimensions.get('window')
type Props = {
  onClick? : () => void;
}



export default function PhotoButton({onClick} : Props) { 
  const isTablet = width >= 600;
  const styles = isTablet? stylesTablet : stylesPhone;

 return (
  <View style={styles.container}>
    <Pressable style={({pressed})=>[styles.button,pressed && {opacity : 0.6}]} onPress={onClick}>
      <MaterialIcons name="add" size={28} color={isTablet? "#25292e":"#fff"}></MaterialIcons>
    </Pressable>
    
  </View>
 )
}

const stylesTablet = StyleSheet.create({
  container : {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",

  } ,

  button:{
    backgroundColor : '#fff',
    padding : 20,
    borderRadius: 50,
    
  }
})

const stylesPhone = StyleSheet.create({
  container : {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",

  } ,

  button:{
    backgroundColor : "#25292e",
    padding : 20,
    borderRadius: 50,
    
  }
})