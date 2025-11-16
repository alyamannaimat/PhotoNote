import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth ,initializeUserData} from '../config';
import { useRouter } from "expo-router";
import { Stack } from "expo-router";


export default function SignUpScreen() {
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const [apiKey,setApiKey] = useState<string>('');
  const [error, setError] = useState("");
  const [isLogin , setIsLogin] = useState<boolean>(true);
  const router = useRouter()
  
  const handleLogin = async () => {
    try{
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      setTimeout(() => {
        router.replace("/"); 
      }, 100);
      
    }catch (error : any){
      setError(error.message);
    }
  }
  const handleSignUp = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      await initializeUserData(apiKey);
      setTimeout(() => { 
        router.replace("/"); 
      }, 100); 
    }catch (error : any){
      setError(error.message);
    }
  }
  const Title = isLogin ? "Login" : "Sign Up";
  return (
    <>
    <HeaderConfig/>
    <View style={styles.container}>
      <Text style={styles.title}>{Title}</Text>
      <View style = {styles.loginArea}>
        <Text style={{color:"#fff",fontSize:18}}>Email</Text>
        <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"rgb(90,90,90)"}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"

        />
        <Text style={{color:"#fff",fontSize:18}}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"rgb(90,90,90)"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry

        />
        
        {isLogin ? null : 

        <>
        <Text style={{color:"#fff",fontSize:18}}>Gemini api Key</Text>
        <TextInput
          style={styles.input}
          placeholder="api key"
          placeholderTextColor={"rgb(90,90,90)"}
          value={apiKey}
          onChangeText={setApiKey}
          
        
        ></TextInput>
        </>
        
        }

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={{alignItems : 'flex-end',width : '100%'}}>
          <Pressable style={({pressed})=>[pressed && {opacity : 0.6}]}  onPress={()=>{router.replace('/resetPassword')} } >
          <Text style={styles.switchButton}> Forgot password?</Text>
        </Pressable>
        </View>
        <View style={styles.buttonView}>
          <Pressable 
          style={({pressed})=>[
            styles.button,
            pressed && {opacity : 0.6}

          ]} 
          
          onPress={()=> {
          isLogin ? handleLogin() : handleSignUp()
        }}>
          
          <Text style={styles.buttonText}>{Title}</Text>
          
        </Pressable>
        
        </View>
        <View style={styles.switchView}>
          <Text style={styles.switch}>{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>
          <Pressable style={({pressed})=>[pressed && {opacity : 0.6}]} onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchButton}>{isLogin ? " sign up": " login"}</Text>
          </Pressable>
        </View>
      </View>
    </View>
    </>
  );
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
    width : "100%",
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
   height : 50,
   backgroundColor : "rgba(255,255,255,0.1)",
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
    height : 50,
    marginBottom : 10,
    width : '100%',
    alignItems : 'center',
    justifyContent : 'center'
  },
  buttonText : {
    color:'#fff'
  },
  switchView:{
    flexDirection : "row",
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 10
  },
  switch:{
    color : "#fff"
  },
  switchButton:{
    color : "#fff",
    textDecorationLine : 'underline'
  }

})