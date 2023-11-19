// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBelxaZIihrXKOalHTph75EkkxsGKuQfsg',
  authDomain: 'ticketrequest-e1d52.firebaseapp.com',
  projectId: 'ticketrequest-e1d52',
  storageBucket: 'ticketrequest-e1d52.appspot.com',
  messagingSenderId: '812644968443',
  appId: '1:812644968443:web:ba5071080fcdb5f01e4d5e',
  measurementId: 'G-9Z60NBV0ZH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth(app);
