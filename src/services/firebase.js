import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';  
import { getFirestore, doc, setDoc, collection, getDocs, query, where, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: `${import.meta.env.VITE_PROJECT_ID}.firebaseapp.com`,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: `${import.meta.env.VITE_PROJECT_ID}.appspot.com`,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

setPersistence(auth, browserLocalPersistence);

export { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    sendEmailVerification, 
    onAuthStateChanged,
    collection, 
    doc, 
    setDoc, 
    getDocs, 
    query, 
    where, 
    addDoc, 
    deleteDoc, 
    updateDoc 
};