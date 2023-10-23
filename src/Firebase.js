import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCep1Yc4bVuSX7q93AyFFMoF-WVHqGhm9w",
    authDomain: "fir-cc88d.firebaseapp.com",
    projectId: "fir-cc88d",
    storageBucket: "fir-cc88d.appspot.com",
    messagingSenderId: "231919070076",
    appId: "1:231919070076:web:74205027670e5a69d1d2f9",
    measurementId: "G-E33HMM12K8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};