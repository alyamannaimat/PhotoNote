import { Text, View,StyleSheet, Pressable } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  onClick? : () => void;
}

export default function CreateNote({onClick} : Props){
  return(
    <View style={styles.container}>
      <View style={styles.plus}>
        <Pressable style={({pressed})=>[pressed && {opacity : 0.6}]}onPress={onClick} >
          <MaterialIcons name="add" size={60} color="#fff" />
        </Pressable>
       
      </View>
      <Text style={styles.text}>New...</Text>
  </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flexDirection : 'column',
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#181818',
    
  },
  plus : {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181818",
    borderColor : '#fff',
    borderWidth : 2,
    borderRadius : 14,
    height : 185,
    paddingHorizontal: 35,
    marginBottom : 10,
    borderStyle : 'dashed',
  },
  text : {
    color : '#fff',
  }

})