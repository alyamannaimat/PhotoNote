import { MaterialIcons } from '@expo/vector-icons';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  isModalVisible? : boolean;
  SetisModalVisible : (isVisible:boolean) => void;
  title?: string;
  deleteNotebook: (id : string) => void;
  id : string;
}

export default function DropDownModal({isModalVisible, SetisModalVisible,title,deleteNotebook,id} : Props) {
  

  return (
      <Modal
      visible={isModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => SetisModalVisible(false)}
    >
        <View style={styles.overlay}>
          
          <View style={styles.modalView}>
            <Pressable style={({pressed})=>[{position:"absolute",right:20,top:20},pressed && {opacity : 0.6}]} onPress={()=>SetisModalVisible(false)}>
              <MaterialIcons name={'close'} size ={24} color={"white"}></MaterialIcons>
            </Pressable>
            <View style = {styles.notebook}>
              <Image style={styles.image} source={require('../assets/images/notebookPhoto.png')} />
              <Text style={styles.text}>{title === '' ? 'untitled notebook': title}</Text>
            </View>
          
            <Pressable style={({pressed})=>[styles.delete,pressed && {opacity : 0.6}]} onPress={() => {deleteNotebook(id); SetisModalVisible(false)}}>
              <MaterialIcons name='delete' color={'red'} size={18}></MaterialIcons>
              <Text style={styles.deleteText}>Delete Notebook</Text>
            </Pressable>
          </View>
          
            
         
        </View>
    </Modal>
    
  )
}

const styles = StyleSheet.create({
  overlay : {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalView : {
    padding: 20,
    borderRadius: 10,
    backgroundColor : "#181818",
    flexDirection : 'row',
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image : {
    width : 134,
    height : 195,
    objectFit : 'cover',
  },
   text : { 
    color : '#fff',
    textAlign : 'center',
    fontSize : 14,

  },
  deleteText : {
    color : 'red',
    textAlign : 'center',
    fontSize : 14,
  },
  notebook : {
    alignItems : 'center',
    justifyContent : 'center',
  },
  delete : {
    alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'row',

    height : 40,
  }
  
})