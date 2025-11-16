import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");

type Props = {
  setTitles : (title : string) => void;
  isModalVisible? : boolean;
  SetisModalVisible : (isVisible:boolean) => void;

}

export default function NotebookModal({setTitles,isModalVisible,SetisModalVisible } : Props){
  const [isFocused, setIsFocused] = useState(false);
  const[title, setTitle] = useState<string>('');
  

  const onPress = ()=>{
    SetisModalVisible(false);
    setTitles(title);
    setTitle('');
  }
  const styles = isTablet? stylesTablet : stylesPhone;
  return(
    
    <Modal  visible={isModalVisible} animationType='fade' transparent={true} >
      <View style={styles.overlay}>
        
        <View style={styles.modalView}>
          <Pressable style={({pressed})=>[{position:"absolute",right:20,top:20},pressed && {opacity : 0.6}]} onPress={()=>SetisModalVisible(false)}>
            <MaterialIcons name={'close'} size ={24} color={"white"}></MaterialIcons>
          </Pressable>
          <View style = {styles.notebook}>
            <Image style={styles.image} source={require('../assets/images/notebookPhoto.png')} />
            <Text style={styles.title}>{title === '' ? 'untitled notebook': title}</Text>
          </View>
          <View style={styles.creationProcess}>
            <TextInput 
            placeholder='Enter NoteBook Title'
            placeholderTextColor={"rgb(90,90,90)"}
            onChangeText={setTitle}
            style={isFocused ? styles.textInputFocused : styles.textInput}
            onFocus={() => setIsFocused(true)}  
            onBlur={() => setIsFocused(false)}
            />
            <Pressable style={({pressed})=>[styles.createButton,pressed && {opacity : 0.6}]}  onPress={onPress} >
              <Text style={styles.create}>Create</Text>
            </Pressable>
          </View>
          
        </View>
      </View>
    </Modal>
  )
}
const isTablet = width >= 600;

const stylesTablet = StyleSheet.create({
  overlay : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalView : {
    width : "50%",
    height : "30%",
    backgroundColor : "#181818",
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
    padding : 20,
    flexWrap : 'wrap',
    flexDirection : 'row',
    borderRadius : 10,
  },
  textInput : {
    width : '100%',
    marginTop : 20,
    marginBottom : 20,
    color : '#fff',
    borderBottomWidth : 2,
    borderBottomColor : '#25292e',
  },
  textInputFocused : {
    marginTop : 20,
    width : '100%',
    marginBottom : 20,
    color : '#fff',
    borderBottomWidth : 2,
    borderBottomColor : '#25292e',
    
  },

  title : {
    color : '#fff',
    marginBottom : 20,
    marginLeft : 20,
  },
  image : {
    width : 134,
    height : "90%",
    objectFit : 'contain',
  },
  text : { 
    color : '#fff',
    textAlign : 'center',
    fontSize : 14,
    
  },
  create : {
    color : '#fff',
  },
  createButton : {
    backgroundColor : 'rgba(95, 90, 90, 1)',
    padding : 10,
    borderRadius : 5,
    alignItems : 'center',
    justifyContent : 'center',
  },
  notebook : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    marginRight : 30,
    
  },
  creationProcess : {
    flex : 3,
    alignItems : 'flex-start',
  }
})

const stylesPhone = StyleSheet.create({
  overlay : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalView : {
    width : "90%",
    height : "30%",
    backgroundColor : "#181818",
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
    padding : 20,
    flexWrap : 'wrap',
    flexDirection : 'row',
    borderRadius : 10,
  },
  textInput : {
    width : '100%',
    marginTop : 20,
    marginBottom : 20,
    color : '#fff',
    borderBottomWidth : 2,
    borderBottomColor : '#fff',
  },
  textInputFocused : {
    marginTop : 20,
    width : '100%',
    marginBottom : 20,
    color : '#fff',
    borderBottomWidth : 2,
    borderBottomColor : '#25292e',
    
  },

  title : {
    color : '#fff',
    marginBottom : 0,
  },
  image : {
    width : 134,
    height : "90%",
    objectFit : 'contain',
  },
  text : { 
    color : '#fff',
    textAlign : 'center',
    fontSize : 14,
    
  },
  create : {
    color : '#fff',
  },
  createButton : {
    backgroundColor : '#25292e',
    padding : 10,
    borderRadius : 5,
    alignItems : 'center',
    justifyContent : 'center',
  },
  notebook : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    marginBottom : 10,
    marginHorizontal : 20,
  },
  creationProcess : {
    flex : 3,
    alignItems : 'flex-start',
  }
})
