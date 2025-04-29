// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC8ZuQCY7fX1dsy368Sb6atP-U6cpLhQas',
  authDomain: 'interviewprep-df31e.firebaseapp.com',
  projectId: 'interviewprep-df31e',
  storageBucket: 'interviewprep-df31e.firebasestorage.app',
  messagingSenderId: '653645493750',
  appId: '1:653645493750:web:130680d8713bc43e0c03d7',
  measurementId: 'G-BJCJP34P3N',
};

// Initialize Firebase

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
// Export the app instance for use in other modules
