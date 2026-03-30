import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBGVfF7OkmwK57Nwd2JcN63Bzrs8EpNrI",
  authDomain: "bivo-wedding.firebaseapp.com",
  projectId: "bivo-wedding",
  storageBucket: "bivo-wedding.firebasestorage.app",
  messagingSenderId: "524762212362",
  appId: "1:524762212362:web:2e7ae77af8f752b3c357f3",
  measurementId: "G-PKVTLSPDS0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
