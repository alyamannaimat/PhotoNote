import {auth} from '../config'
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from "expo-router";

export default function ResetPassword() {
  const [email,setEmail] = useState<string>('');
  const [error, setError] = useState("");
  const router = useRouter();
  const sendResetEmail = async () => {
    try{
      await sendPasswordResetEmail(auth, email);
    }catch (error : any){
      setError(error.message);
    }
  }
  return (
    <>
    <HeaderConfig/>
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <View style = {styles.loginArea}>

        <Text style={{color:"#fff",fontSize:18}}>Email</Text>

        <TextInput
         style={styles.input}
          placeholder='Enter Email'
          placeholderTextColor={"rgb(90,90,90)"}
          onChangeText={setEmail}>
        </TextInput>
        
        <Pressable  style={({pressed})=>[styles.button,pressed && {opacity : 0.6}]} onPress={sendResetEmail}>
          <Text style={styles.buttonText}>Send Reset Email</Text>
        </Pressable>

        <Pressable style={({pressed})=>[styles.backButton,pressed&& {opacity:0.6}]} onPress={()=>{router.replace('/signUpScreen')}} >
          <MaterialIcons name={"arrow-back"} size={16} color={"#fff"}></MaterialIcons>
          <Text style={styles.buttonText}>Back to Login screen</Text>
        </Pressable>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
    </>
  )
}

export function HeaderConfig(){
  const router = useRouter();
  return (
    <Stack.Screen options={{headerBackVisible: false,headerShown : false}}/>
          )}


const styles = StyleSheet.create({
  container : {
    backgroundColor : "#181818",
    flex : 1,
    alignItems :"center",
    justifyContent : "center",
  },
  loginArea : {
    width : '100%',
    paddingVertical: 40,
    paddingHorizontal : 30,
    margin : 40
    
  },
  title : {
    color : "#fff",
    fontSize : 32,
    fontWeight : 'bold'
  },
  input : {
   marginBottom : 20,
   backgroundColor : 'rgba(255,255,255,0.1)',
   height : 50,
   width : '100%',
   color : '#fff'
  },
  error : {
    color : "red"

  },
  buttonView : {
    marginTop : 10,
    alignItems : 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor : "rgba(95, 90, 90, 1)",
    width : '100%',
    height : 50,
    alignItems : 'center',
    justifyContent : 'center',
    marginBottom : 10,
  },
  buttonText : {
    color:'#fff'
  },
  switchView:{
    flexDirection : "row",
  },
  switch:{
    color : "#fff"
  },
  switchButton:{
    color : "#fff",
    textDecorationLine : 'underline'
  },
  backButton:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center',
    gap:5,
    marginTop:20
  }
})