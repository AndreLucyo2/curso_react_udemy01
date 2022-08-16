
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAfzTQGsa3WJvZC7hGLy8qHwqtHhS1TKRQ",
    authDomain: "miniblogreactudemy.firebaseapp.com",
    projectId: "miniblogreactudemy",
    storageBucket: "miniblogreactudemy.appspot.com",
    messagingSenderId: "135323383851",
    appId: "1:135323383851:web:6510ce4c0304633ad7926e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }