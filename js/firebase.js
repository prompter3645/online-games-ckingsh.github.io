import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBXaNdRskX6YB_FqbQBd89ey_N1Lr-p2RM",
  authDomain: "online-games-ckingsh.firebaseapp.com",
  projectId: "online-games-ckingsh",
  storageBucket: "online-games-ckingsh.firebasestorage.app",
  messagingSenderId: "369032652298",
  appId: "1:369032652298:web:2288da954b9a4fb16ba1f3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
