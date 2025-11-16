import PhotoButton from "@/components/PhotoButton";
import SlideShow from "@/components/SlideShow";
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState ,useEffect} from "react";
import { StyleSheet, ActivityIndicator,Pressable, View } from "react-native";
import {Stack,useRouter} from 'expo-router'
import { MaterialIcons } from "@expo/vector-icons";
import{editNotebook,fetchNotebookPages,auth,fetchApiKey} from '@/config'
import PhotoButtonModal from "@/components/PhotoButtonModal";

type NoteProps = {
  title : string;
  id : string;
}

export default function Note() {
  const {title,id}:NoteProps = useLocalSearchParams();
  const navigation = useNavigation();
  const [CurrentPages, setCurrentPages] = useState<number>(0)
  const [pages, setPages] = useState<Array<string>>([''])
  const [images, setImages] = useState<string | null >(null)
  const [loading,setLoading] = useState<boolean>(false)
  const [isModalVisible,setIsModalVisible] = useState<boolean>(false)
  const [error,setError] = useState<string>("")
  const user = auth.currentUser
  
  const getApiKey = async()=>{
    try{
      const apiKey = await fetchApiKey();
      if(apiKey){
        const genAI = new GoogleGenerativeAI(apiKey.trim());
        return genAI
      }else{
        throw new Error('No API Key found')
      }
    }catch(e){
      setError('error fetching API Key')
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title ? `${title}` : "Note",
    });
  }, [navigation, title]);

  useEffect(()=>{
    loadPages()
  },[user])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      const Imageuri = result.assets[0].uri;
      setImages(Imageuri);
      return Imageuri;
    }
  }

  const loadPages = async()=>{
    const x = await fetchNotebookPages(id)
    if(x) setPages(x);
  }


  const changePage = (change : number) => {
    setCurrentPages(prev => prev + change)
  }

  const onSave=async()=>{
    await editNotebook(id,{pages :pages});
  }

  const onChangeText = async (text : string) => {
    const newPages = [...pages];
    newPages[CurrentPages] = text;
    setPages(newPages);
    
  }
  const createNewPage = async() => {
    await editNotebook(id,{pages : [...pages,'']});
    setPages(prev => [...prev, ''])
    setCurrentPages(prev => prev + 1)
  }

  

  const getBase64Image = async (imageUri: string) => {
    return await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' })
  };


  const getAiResponse = async (uri:string) => {

    
    const base64Image = await getBase64Image(uri);
    const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: 'image/jpeg', 
    },
  };

    
    const genAI = await getApiKey();
    if(!genAI){
      throw new Error('Generative AI not initialized')
    }
    try{
      const model =  genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })
      const result = await model.generateContent([
      { text: 'copy whats in the image dont use latex' },
      imagePart,
      ]);
      const response = await result.response;
      const text = response.text();
      return text;
    }catch(e){
      setError('error generating AI response check your API Key and usage limits')
      throw e
    }
    
  }

  const onSelectImg = async(library:boolean)=> {
    try{
      setLoading(true)
      const uri = library? await pickImage() : await takeImage();
      if (!uri) {
        setLoading(false);
        return
      };
      const text = await  getAiResponse(uri)
      await editNotebook(id,{pages : [...pages , text]});
      setPages(prev => [...prev , text]);
      const redirectIndex = pages.length
      setIsModalVisible(false)
      setCurrentPages(redirectIndex)
      setLoading(false)
    }catch(e){
      console.log(e)
      setLoading(false)
    }
    
    
  }


  const takeImage = async()=>{
    const permision = await ImagePicker.requestCameraPermissionsAsync();
    if(!permision.granted){
      alert("Camera permission is required to take photos.");
      return;
    }
    setLoading(true)
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImages(imageUri);
      setLoading(false)
      return imageUri;
    }
    setLoading(false)
    }
  

  if(loading){
    return(
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={"#25292e"}/>
      </View>
    )
  }
  
  return(
    <>
      <HeaderConfig></HeaderConfig>
      <SlideShow pages={pages} changePage={changePage} currentPageIndex={CurrentPages} onChangeText={onChangeText} createNewPage={createNewPage} onSave={onSave} text={pages[CurrentPages]}></SlideShow>
      <PhotoButtonModal setIsVisible={setIsModalVisible} isVisible={isModalVisible} selectImg={onSelectImg} error={error}></PhotoButtonModal>
      <PhotoButton onClick={()=>{setIsModalVisible(true)}} ></PhotoButton>
    </>
    
  )
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: "#181818",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  page : {
    backgroundColor: "#ffffee",
    height : "100%",
    width : '50%',
  },
  loading : {
    flex : 1,
    alignItems :"center",
    justifyContent : "center"
  }


  
})

export function HeaderConfig() {
  const router = useRouter();
  return (
    <Stack.Screen
      options={{
        headerRight: () => (
          <Pressable
            onPress={() => router.push("/settings")}
            style={({pressed})=>[{marginRight : 15},pressed && {opacity : 0.6}]}
          >
            <MaterialIcons name="settings" size={24} color="#fff" />
          </Pressable>
        ),
      }}
    />
  );
}