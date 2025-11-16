import {View,Modal,Text, Pressable,Platform,StyleSheet} from "react-native"
import { MaterialIcons } from "@expo/vector-icons";


type Props = {
  isVisible : boolean,
  selectImg : (library:boolean) => void,
  setIsVisible : (isVisible : boolean)=>void
  error? : string;
}

export default function PhotoButtonModal({isVisible,selectImg,setIsVisible,error} : Props){

  return(
    <Modal visible={isVisible} animationType="fade" transparent={true} >
      <View style={styles.modal}>
        <View style={styles.container}>
       
            <Pressable style={({pressed})=>[{position:"absolute",right:20,top:20},pressed && {opacity : 0.6}]} onPress={()=>{
              setIsVisible(false)
            }}>
              <MaterialIcons name={'close'} size ={24} color={"white"}></MaterialIcons>
            </Pressable>


        <View style={{flexDirection:'row',gap:20}}>
          <Pressable style={({pressed})=>[styles.button,pressed && {opacity : 0.6}]} onPress={()=>{selectImg(false)}}>
            <MaterialIcons name={'photo-camera'} size={24} color={'white'}></MaterialIcons>
            <Text style={styles.text}>camera</Text>
          </Pressable>
          <Pressable style={({pressed})=>[styles.button,pressed && {opacity : 0.6}]} onPress={()=>{selectImg(true)}}>
            <MaterialIcons name="photo-library" color={'white'} size ={24}></MaterialIcons>
            <Text style={styles.text}>Photos</Text>
          </Pressable>
        </View>
        {error !=="" &&(
        <Text style={{color:'red',marginTop:10}}>{error}</Text>
        ) }
        
        </View>
      </View>
    </Modal>

  )
  
}





const styles = StyleSheet.create({
  modal : {
    backgroundColor :"rgba(0,0,0,0.5)", 
    flex : 1,
    alignItems :'center',
    justifyContent :'center'
  },
  container : {
    backgroundColor : '#181818',
    alignItems :'center',
    justifyContent :'center',
 
    borderRadius : 16,
    padding: 20,
    height : 350,
    width : 300,
    margin : 40
  },
  text : {
    color : '#fff'
  },
  button : {
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor:"rgba(95, 90, 90, 1)",
    padding : 20,
    borderRadius : 10,
  }

})