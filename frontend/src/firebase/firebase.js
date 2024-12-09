import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "worksynk-3169c.firebaseapp.com",
  projectId: "worksynk-3169c",
  storageBucket: "worksynk-3169c.appspot.com",
  messagingSenderId: "914476173248",
  appId: "1:914476173248:web:c6babd53e56aa3526f6a25",
};

export const app = initializeApp(firebaseConfig);
