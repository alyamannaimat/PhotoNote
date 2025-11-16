import { initializeApp } from "firebase/app";
import {firebaseConfig} from "./sensitive";
import {getFirestore, query, where,serverTimestamp } from "firebase/firestore";
import { collection, addDoc,updateDoc,doc,deleteDoc,getDocs,getDoc, increment,setDoc} from "firebase/firestore";
import  ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";
import {initializeAuth,getReactNativePersistence}from "firebase/auth";




const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app,{
  persistence : getReactNativePersistence(ReactNativeAsyncStorage)
})
const db = getFirestore(app)




export async function createNotebookFb(title : string) {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");
    const docRef = await addDoc(collection(db, "notebooks"), {
    title: title,
    pages: [""],
    userId: user.uid,
    createdAt: serverTimestamp(),
  })
  return docRef.id;
}




export async function editNotebook(notebookId:string, updatedData: {title?:string, pages?:Array<string>}) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const notebookRef = doc(db, "notebooks", notebookId);
  await updateDoc(notebookRef, updatedData);
  console.log("Notebook updated successfully!");
}

export async function deleteNotebook(notebookId: string) {
  const notebookRef = doc(db, "notebooks", notebookId);
  await deleteDoc(notebookRef);
  console.log("Notebook deleted successfully!");
}

export async function fetchNoteBoookTitles(){
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const notebookTitles : Array<{ id: string; title: string }> = [];
  const q = query(collection(db, "notebooks"),where("userId","==",user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    notebookTitles.push({title : data.title , id: doc.id});
  })
  return notebookTitles;
}

export async function fetchNotebookPages(notebookId: string){
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const ref = doc(db, "notebooks", notebookId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data()
  if(data.userId !== user.uid) throw new Error('Not authorized')
  const pages = data.pages as string[]
  return pages ;
  
}

export async function fetchUploadsAvailable(){
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const ref = doc(db, "users",user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return 0;
  const data = snap.data()
  const uploadsAvailable = data.uploadsAvailable as number
  return uploadsAvailable ;
}

export async function updateaApiKey(ApiKey:string){
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data()
    const currentApiKey = data.apiKey as string
    await updateDoc(ref, { apiKey: ApiKey });
  }
  
}

export async function fetchApiKey(){
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const ref = doc(db,"users",user.uid);
  const snap = await getDoc(ref);
  if(!snap.exists()) return null;
  const data = snap.data()
  const apiKey = data.apiKey as string
  return apiKey;
}

export async function initializeUserData(apiKey:string){
  const user = auth.currentUser;
  if(!user ) throw new Error("Not authenticated");
  const ref = doc(db, "users", user.uid);
  await setDoc(ref, { apiKey : apiKey });
}