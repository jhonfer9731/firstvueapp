//Initialize firebase
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAf5ORMgS6yxYjwtopn4KuGlfqJqHLFZfM",
    authDomain: "jfappshop-vue.firebaseapp.com",
    databaseURL: "https://jfappshop-vue.firebaseio.com",
    projectId: "jfappshop-vue",
    storageBucket: "jfappshop-vue.appspot.com",
    messagingSenderId: "588753324910",
    appId: "1:588753324910:web:7ddc4da581f5b48d8f8f7f",
    measurementId: "G-MS98F2R3RZ"
  };

  export const fb = firebase.initializeApp(firebaseConfig);