import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import DropDownModal from './dropDownModal';

//HI
type Props = {
  Title : string;
  deleteNotebook: (id : string) => void;
  id : string;
}

export default function Notebook({Title,deleteNotebook,id} : Props){
const [modalVisible, setModalVisible] = useState(false);
const onDropDownPress = () => {
  console.log('pressed');
  setModalVisible(!modalVisible);
}
  return(
    
      <View style={styles.container}>
        <Link href={{pathname : '/note', params : {title : Title, id : id}}}>
          <Image style={styles.image} source={require('../assets/images/notebookPhoto.png')} />
        </Link>
        
        <Pressable  style={({pressed})=>[styles.dropDownButton,pressed && {opacity : 0.6}]} onPress={onDropDownPress}>
          <Text style={styles.text}>{Title}</Text>
          <MaterialIcons name="arrow-drop-down" size={20} color="#fff" />
        </Pressable>
        <DropDownModal isModalVisible={modalVisible}  SetisModalVisible={setModalVisible} title={Title} id={id} deleteNotebook={deleteNotebook}/>
      </View>
    
  )
}


const styles = StyleSheet.create({
  container : {
    marginLeft : 20,
    alignItems : 'center',
    justifyContent : 'center',
    marginBottom : 10,
    
  },
  image : {
    width : 134,
    height : 195,
    objectFit : 'cover',
  },
  text : { 
    color : '#fff',
    textAlign : 'center',
    alignItems : 'center',
    justifyContent : 'center',

  },
  dropDownButton : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',

  }

})