import { auth, db } from "./firebase.js";
import { signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function login(username) {
  const cred = await signInAnonymously(auth);
  const uid = cred.user.uid;

  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    const friendCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    await setDoc(userRef, {
      username,
      friendCode,
      friends: []
    });
  }

  localStorage.setItem("uid", uid);
  window.location.href = "lobby.html";
}
