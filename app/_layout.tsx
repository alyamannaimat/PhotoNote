import { Stack, useRouter } from "expo-router";

import { auth } from "../config";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { View, ActivityIndicator, StyleSheet} from "react-native";


export default function RootLayout() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setCheckingAuth(false);
    })
    return unsubscribe;
  }, []);


  useEffect(() => {
    if (!checkingAuth) {
      if (!user) {
        router.replace("/signUpScreen");
      }
    }
  }, [checkingAuth, user]);

 if (checkingAuth) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#25292e" />
    </View>
  );
}

  return (

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#181818" },
          headerTitleStyle: { color: "#fff", fontWeight: "600", fontSize: 24 },
          headerTintColor: "#fff",
          headerShadowVisible: false,
        }}
      >
        {user? 
        <>
          <Stack.Screen name ='index' ></Stack.Screen>
          <Stack.Screen name ='note'></Stack.Screen>
          <Stack.Screen name ='setting'></Stack.Screen>
        </>
        
        :
          <>
            <Stack.Screen name ='signUpScreen' options={{headerBackVisible: false,headerShown : false}}></Stack.Screen>
            <Stack.Screen name ='resetPassword' options={{headerBackVisible: true,headerShown : true}}></Stack.Screen>
          </>
          


        }
      </Stack>

    
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // optional
  },
});