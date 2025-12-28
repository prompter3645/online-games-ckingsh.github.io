import { db } from "./firebase.js";
import {
  doc, setDoc, getDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function createRoom() {
  const roomId = Math.random().toString(36).substring(2, 7).toUpperCase();
  const uid = localStorage.getItem("uid");

  await setDoc(doc(db, "rooms", roomId), {
    host: uid,
    players: [uid],
    games: [],
    currentGame: null
  });

  localStorage.setItem("room", roomId);
  location.href = "room.html";
}

export async function joinRoom(code) {
  const ref = doc(db, "rooms", code);
  const snap = await getDoc(ref);
  if (!snap.exists()) return alert("Room not found");

  const players = snap.data().players;
  if (!players.includes(localStorage.getItem("uid"))) {
    await updateDoc(ref, { players: [...players, localStorage.getItem("uid")] });
  }

  localStorage.setItem("room", code);
  location.href = "room.html";
}
