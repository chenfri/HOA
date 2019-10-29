import firebase from 'firebase/app'

let firebaseConfig = {
    apiKey: "AIzaSyDoHjjp2KfC4_Wwb45pmZQBb88Ree0Ffbk",
    authDomain: "hoap-8fb31.firebaseapp.com",
    databaseURL: "https://hoap-8fb31.firebaseio.com",
    projectId: "hoap-8fb31",
    storageBucket: "hoap-8fb31.appspot.com",
    messagingSenderId: "800499430849",
    appId: "1:800499430849:web:2aedf2afbeb1281e"
  };

  export default function initFirebase() {
    firebase.initializeApp(firebaseConfig)
  }

  const secondFirebaseInstance = firebase.initializeApp(firebaseConfig,'secondFirebaseInstance')
  export { secondFirebaseInstance }