
import { Pressable, StyleSheet, Text, TextInput, View ,Dimensions,ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import {useState} from "react"
import Markdown from 'react-native-markdown-display';

const {width,height} = Dimensions.get('window')
type Props = {
  pages : Array<string>;
  currentPageIndex : number;
  changePage : (change : number) => void;
  onChangeText : (text : string) => void;
  createNewPage: () => void;
  onSave : ()=> void;
  text : string,
}

export default function SlideShow({pages,currentPageIndex,changePage,onChangeText,createNewPage,onSave,text} : Props) {
  const [isEditing ,setIsEditing ] = useState<boolean>(false)
  
  const lineHeight = 20;
  const isTablet = width >= 600
  const styles = isTablet? stylesTablet : stylesPhone



  const goToPreviousPage = () => {
    if(currentPageIndex > 0){
      changePage(-1)
    }
  }
  
  const goToNextPage = () => {
    if(currentPageIndex < pages.length - 1){
      changePage(1)
    }else{
      createNewPage()
      
    }
  }

  const saveClick = () =>{
    onSave()
    setIsEditing(!isEditing)
  }

  const editClick = ()=>{
    setIsEditing(!isEditing)
  }



  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <Pressable style={({pressed})=>[styles.saveButton,pressed && {opacity : 0.6}]} onPress={()=>{
          isEditing ? saveClick() : editClick() 
        }}>
          <Text style={{color:'white'}}>{isEditing? 'Save': 'Edit'}</Text>
        </Pressable>
        <View style={styles.pageChanger}>
          <Pressable style={({pressed})=>[styles.buttons,pressed && {opacity : 0.6}]} onPress={goToPreviousPage}>
            <MaterialIcons name="west" size={30} color="#fff" />
          </Pressable>
          <View style={styles.pageNumber}>
            <Text style={styles.pageNumberText}>page : {currentPageIndex}</Text>
          </View>
          <Pressable style={({pressed})=>[styles.buttons,pressed && {opacity : 0.6}]} onPress={goToNextPage}>
            <MaterialIcons name="east" size={30} color="#fff" />
          </Pressable>
        </View>
        
      </View>
      
      <View style={styles.page}>
        {isEditing ? 
        
        <TextInput 
        style={styles.textInput} 
        placeholder='' 
        onChangeText={onChangeText} 
        value={pages[currentPageIndex]}
        multiline={true}
        ></TextInput>
        
        :
        <ScrollView style={{height: '100%', width: '100%',paddingVertical:20, paddingHorizontal:10}}>
          <Markdown>{text}</Markdown>
        </ScrollView>
        
        }
      </View>


      
    </View>
  )
}


const stylesTablet = StyleSheet.create({
  container : {
    backgroundColor: "#181818",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center", 
    
    
  },
  topBar : {
    flexDirection:"row",
    height: "10%",
    width: '100%',
    margin: 5,
    alignItems : 'center',
    justifyContent:"space-between",
  },
  pageNumber : {
    color: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems : 'center',
  },

  buttons : {
    justifyContent: "center",
    alignItems: "center",
    
  },

  buttonText : {
    color : '#fff',
    fontSize : 40,
  },


  page : {
    backgroundColor: "#ffffee",
    height : "100%",
    width : '50%',
    padding : 0,
    
  },
  
  textInput : {
    height : "100%",
    width : '100%',
    textAlign: 'left',
    textAlignVertical: 'top',
    padding : 20,
    lineHeight: 20, 
  },
  

  pageNumberText : {
    fontSize : 12,
    color: "#fff",
  },
  pageChanger:{
    flexDirection:"row",
    alignItems : 'center',
    justifyContent:"flex-end"
  },
  saveButton:{
    backgroundColor : "#rgba(95, 90, 90, 1)",
    paddingHorizontal : 20,
    paddingVertical: 15,
    marginLeft : 10,
    borderRadius : 10,
  }


  
})
const stylesPhone = StyleSheet.create({
  container : {
    backgroundColor: "#181818",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center", 
    
    
  },
  topBar : {
    flexDirection:"row",
    height: "10%",
    width: '100%',
    borderBottomWidth : 5,
    
    alignItems : 'center',
    justifyContent:"space-between"
  },
  pageNumber : {

    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems : 'center',
    
  },

  buttons : {
    justifyContent: "center",
    alignItems: "center",

    
  },

  buttonText : {
    color : '#fff',
    fontSize : 40,
  },


  page : {
    backgroundColor: "#ffffee",
    height : "100%",
    width : '100%',
    padding : 0,
    
  },
  
  textInput : {
    height : "100%",
    width : '100%',
    lineHeight: 20, 
    textAlign: 'left',
    textAlignVertical: 'top',
    padding : 20,
  },
  

  pageNumberText : {
    fontSize : 12,
    color: "#fff",
  },

  pageChanger:{
    flexDirection:"row",
    alignItems : 'center',
    justifyContent:"flex-end"
  },

  saveButton:{
    backgroundColor : "rgba(95, 90, 90, 1)",
    paddingHorizontal : 20,
    paddingVertical: 15,
    marginLeft : 10,
    borderRadius : 10,
  }

})