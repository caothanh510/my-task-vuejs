import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDygigTICjaTbs1E-TeETKmUSrLenBPY48",
  authDomain: "my-task-vuejs.firebaseapp.com",
  projectId: "my-task-vuejs",
  storageBucket: "my-task-vuejs.appspot.com",
  messagingSenderId: "1003565145851",
  appId: "1:1003565145851:web:a897e6f87233437f309a5e",
  measurementId: "G-ZZ2L99XDWW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();