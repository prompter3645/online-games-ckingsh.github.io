import { db, auth } from "./firebase.js";
import { doc, updateDoc, onSnapshot, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const roomId = localStorage.getItem("room");
const chatRef = doc(db, "rooms", roomId);

onSnapshot(chatRef, snap => {
  const chatEl = document.getElementById("chat");
  chatEl.innerHTML = snap.data().chat.map(c => `<b>${c.uid}</b>: ${c.message}`).join("<br>");
});

window.sendMessage = async (msg) => {
  await updateDoc(chatRef, {
    chat: arrayUnion({ uid: auth.currentUser.uid, message: msg, timestamp: Date.now() })
  });
};
