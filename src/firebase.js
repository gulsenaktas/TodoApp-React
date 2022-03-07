import firebase from 'firebase/compat/app'
import "firebase/compat/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHg2B7OsPIe6J69B0EeJrqMV_5E0U-Pls",
  authDomain: "todo-list-b49d2.firebaseapp.com",
  databaseURL: "https://todo-list-b49d2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-list-b49d2",
  storageBucket: "todo-list-b49d2.appspot.com",
  messagingSenderId: "449388711769",
  appId: "1:449388711769:web:8c6b907484ec419f4e8648"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref()
export const todoListRef = databaseRef.child("todo-list")
export default firebase