import { db } from "./firebase.js";
import { doc, updateDoc, onSnapshot } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import "../games/guess-number.js";
import "../games/tic-tac-toe.js";
import "../games/wordle.js";
import "../games/guess-word.js";
import "../games/chess.js";
import "../games/checkers.js";

const roomId = localStorage.getItem("room");
const ref = doc(db, "rooms", roomId);

document.getElementById("start").onclick = async () => {
  const games = [...document.querySelectorAll("input:checked")].map(x => x.value);
  await updateDoc(ref, { games, currentGame: games[0] });
};

onSnapshot(ref, snap => {
  if (!snap.exists()) return;
  const g = snap.data().currentGame;
  if (window.startGame) window.startGame(g, roomId);
});
