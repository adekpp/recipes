import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBhigvEoIYyUMwyZtVVgllT7CuE3VaoikQ",

  authDomain: "recipes-af309.firebaseapp.com",

  projectId: "recipes-af309",

  storageBucket: "recipes-af309.appspot.com",

  messagingSenderId: "929160082964",

  appId: "1:929160082964:web:d1b60340c16576c3889901",
};

initializeApp(firebaseConfig)

const db = getFirestore()
const storage = getStorage()
const auth = getAuth()

export { db, storage, auth }