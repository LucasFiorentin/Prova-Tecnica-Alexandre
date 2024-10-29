// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAOp5yz-0Rp0eAMz0oD0V3wPnu668JQo1Q',
  authDomain: 'provaaletodolist.firebaseapp.com',
  projectId: 'provaaletodolist',
  storageBucket: 'provaaletodolist.appspot.com',
  messagingSenderId: '926674398277',
  appId: '1:926674398277:web:b25b19384667e398f8072c',
  measurementId: 'G-13D4SD06R1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const firestore = getFirestore(app)
