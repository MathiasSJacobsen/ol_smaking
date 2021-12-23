// Import the functions you need from the SDKs you need
import {  createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, collection, addDoc, getDocs, DocumentData, QuerySnapshot, QueryDocumentSnapshot, Timestamp,  } from "firebase/firestore"
import { CRITERIAS } from "../enum/VotesEnum";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDvTw2FiSeWpcH6oTMAQLrnKDDzitx_f0",
  authDomain: "ol-smaking.firebaseapp.com",
  projectId: "ol-smaking",
  storageBucket: "ol-smaking.appspot.com",
  messagingSenderId: "827529803080",
  appId: "1:827529803080:web:571f1bb2431a9829026f7d",
  measurementId: "G-E6EV91GHJD"
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const attending = ["Ask", 'Mathias', 'Torjus']

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
const auth = getAuth()
const db = getFirestore(app)

export const createUser = (email: string, password:string) => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

export const signIn = (email: string, password:string, ) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

export const addUsers = async (name:string) => {

  const docRef = await addDoc(collection(db, "olsmakere"), {
    name: name
  });
  console.log("Document written with ID: ", docRef.id);
}

export const fetchAllBeers = async (setCallback : (arg: any) => void)=> {
  const querySnapshot = await getDocs(collection(db, "beers"));
  const temp: QueryDocumentSnapshot<DocumentData>[] = []
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  temp.push(doc)
  console.log(doc.id, " => ", doc.data());
});
setCallback(temp)

}


export const setCurrentBeer = async (name: string, id: string) => {
  
  await setDoc(doc(db, "current", "one"), {
    name: name,
    id : id,
  });
  
}

export const fetchCurrentBeer = async (callback : (arg:DocumentData) => void) => {
  const querySnapshot = await getDocs(collection(db, "current"));
  const temp: QueryDocumentSnapshot<DocumentData>[] = []

  querySnapshot.forEach((doc) => {
    temp.push(doc)

    
  })
  callback(temp[0])
}


type voteType = {
  user: string,
  poeng: number,
  beer : string,
  type: CRITERIAS
}

export const vote = async (vote:voteType) => {
  const docRef = await addDoc(collection(db, "votes"), {
    beer: vote.beer,
    user: vote.user,
    poeng: vote.poeng,
    type: vote.type,
    created: Timestamp.now()
  });
  console.log("Document written with ID: ", docRef.id);
}

type addBeerType = {
  name: string,
  raters: ((string | number)[] | (string | null)[])[];
}

export const addBeer = async (dbAdd : addBeerType) => {

  const docRef = await addDoc(collection(db, "beers"), {
    name: dbAdd.name,
    votes: dbAdd.raters,
  });
  console.log("Document written with ID: ", docRef.id);
}

