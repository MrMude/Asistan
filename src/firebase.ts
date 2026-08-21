import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Bu değerleri Firebase Console > Project Settings > General > "Your apps"
// bölümünden alacaksınız. Gerçek değerleri buraya değil, .env dosyasına
// yazın (bkz. .env.example) — böylece GitHub'a yanlışlıkla yüklenmezler.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
