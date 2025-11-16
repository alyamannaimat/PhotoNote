import {Pressable,StyleSheet,Text} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { auth } from '../config';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as AuthSession from "expo-auth-session";

console.log("Redirect URI:", AuthSession.makeRedirectUri());

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin(){
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "543151162147-2qhfla3q1vtj31lnmjvb22ihpouh9m69.apps.googleusercontent.com",
    iosClientId: ">",
    webClientId: "543151162147-meitm324le958q7r3oqn9oac4cv79npl.apps.googleusercontent.com",
  });


  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      // Convert Google ID token to Firebase credential
      const credential = GoogleAuthProvider.credential(id_token);

      // Sign in to Firebase
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <Pressable style={styles.button} onPress={()=>{
      promptAsync()
      console.log("google login pressed")
      }}>
      <Text>google</Text>
    </Pressable>
  )
}

const styles=StyleSheet.create({
  button : {
    backgroundColor : "rgba(95, 90, 90, 1)",
    paddingVertical: 8,
    paddingHorizontal : 16,
    borderRadius : 4,
  }
})