import { useState ,useEffect} from 'react';
import { StyleSheet, View,ScrollView ,Pressable} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Stack,useRouter} from 'expo-router';
import { auth } from '../config';
import CreateNote from "@/components/CreateNote";
import Notebook from "@/components/Notebook";
import NotebookModal from "@/components/NoteBookModal";
import {createNotebookFb,deleteNotebook,fetchNoteBoookTitles} from '../config';

export default function Index() {
  const router= useRouter()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [notebooks, setNotebooks] = useState<Array<{ id: string; title: string }>>([]);
  const user = auth.currentUser;
  useEffect(() => {
    if (user === null) {
      router.replace("/signUpScreen");
      return;
    }
    loadNotebooks();
  },[user]);


  const loadNotebooks = async () => {
    try{
      const titles = await fetchNoteBoookTitles();
      setNotebooks(titles);
    }catch (error){
      console.error("Error fetching notebook titles:", error);
    }
  }

  const openModal = () => {
    setIsModalVisible(true);
  }
  const createNoteBook = async(title : string) => { 
    try{
      const newId = await createNotebookFb(title);
      setNotebooks([...notebooks, { id: newId, title }]);
      setIsModalVisible(false);
      return newId;
    }catch (error){
      console.error("Error creating notebook:", error);
    }
    
  }


  const handleDeleteNotebook = async(id : string) => {

    try{
      await deleteNotebook(id);
      setNotebooks(notebooks.filter((notebook) => notebook.id !== id));

    }catch(e){
      console.error("Error deleting notebook:", e);
    }
  }
  return (
    <>
      <HeaderConfig></HeaderConfig>
      <ScrollView style={styles.container} contentContainerStyle={
        {
          flexDirection : 'row',
          flexWrap: 'wrap',
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingVertical: 10,
        }
      }>
        <CreateNote onClick={openModal}></CreateNote>
        <NotebookModal SetisModalVisible={setIsModalVisible} isModalVisible={isModalVisible} setTitles={createNoteBook}></NotebookModal>
        {notebooks.map((nb)=>{
          return(
            <Notebook key={nb.id} Title={nb.title} id={nb.id} deleteNotebook={handleDeleteNotebook} ></Notebook>
          )
        } )}
      </ScrollView>
    </>
    

    
  );
}



const styles = StyleSheet.create({
  container : {
    
    
    backgroundColor: "#181818",
    padding:30,
    
  },
})


export function HeaderConfig(){
  const router = useRouter();
  return (
    <Stack.Screen options={{title: "Documents",headerRight: () => (
              <Pressable
                onPress={() => router.push("/settings")}
                style={({pressed})=>[{marginRight: 15},pressed && {opacity : 0.6}]}
              >
                <MaterialIcons name="settings" size={24} color="#fff" />
              </Pressable>
            ),}}/>
          )}
