import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBA8bgzqN61K5ih9_P1qeQY7iddAjNU8GI",
  authDomain: "myfirstproject-dd6e8.firebaseapp.com",
  projectId: "myfirstproject-dd6e8",
  storageBucket: "myfirstproject-dd6e8.firebasestorage.app",
  messagingSenderId: "994314508474",
  appId: "1:994314508474:web:33567513ea5183b0770a83",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
