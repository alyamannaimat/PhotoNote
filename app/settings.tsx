import {Pressable , Text,View,StyleSheet, TextInput} from 'react-native'
import {signOut} from "firebase/auth";
import {auth,updateaApiKey} from '../config'
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Settings(){
  const [apiKey,setApiKey] = useState<string>('')
  const [error,setError] = useState<string>('')
  const [saved,setSaved] = useState<boolean>(false)
  const logOut = async()=>{
    await signOut(auth)
  }

  const saveApiKey = async()=>{
    try{
      await updateaApiKey(apiKey)
      setSaved(true)

    }catch(e){
      setError('error saving API Key')
      setSaved(false)
    }
  }

  return(

    <View style={styles.container}>
      

        <TextInput
        placeholder='api key'
        style={styles.input}
        value={apiKey}
        onChangeText={setApiKey}   
        placeholderTextColor={'rgb(90,90,90)'}   
        >
        </TextInput>

      <View style={{flexDirection:'row',gap:20}}>
        <Pressable onPress={saveApiKey} style={({pressed})=>[styles.button,pressed && {opacity : 0.6}]}>
          <Text style={styles.buttonText}>Save API Key</Text>
        </Pressable>
      <Pressable style={({pressed})=>[styles.button,pressed && {opacity : 0.6}]} onPress={logOut}>
        <MaterialIcons name={'logout'} size={20} color={'white'}></MaterialIcons>
        <Text style={styles.buttonText}>
          Log out
        </Text>
      </Pressable>
      </View>
      {saved && <Text style={{color:'green'}}>API Key saved successfully!</Text>}
      {error !== '' && (
        <Text style={{color:'red'}}>{error}</Text>
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  container : {
    backgroundColor : '#181818',
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    gap : 20,
  },
  button : {
    backgroundColor : 'rgba(95, 90, 90, 1)',
    borderRadius : 8,
    paddingVertical : 20,
    width : 120,
    flexDirection : 'row',
    gap:10,
    alignItems : 'center',
    justifyContent : 'center'
  },
  buttonText : {
    color: '#fff'
  },
  input : {
   marginBottom : 20,
   height : 50,
   backgroundColor : "rgba(255,255,255,0.1)",
   color : '#fff',
   width : '80%',
  },
})
