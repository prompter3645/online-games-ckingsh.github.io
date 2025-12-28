import { auth, db } from "./firebase.js";
import { doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import "./chat.js";
import "./friends.js";

import "../games/guess-number.js";
import "../games/tic-tac-toe.js";
import "../games/wordle.js";
import "../games/guess-word.js";
import "../games/chess.js";
import "../games/checkers.js";

const uid = localStorage.getItem("uid");
const roomId = localStorage.getItem("room");
const ref = doc(db, "rooms", roomId);

const startBtn = document.getElementById("start");
onSnapshot(ref, snap => {
  const data = snap.data();
  const host = data.host;
  
  // Lock controls if not host
  if (uid !== host) {
    document.querySelectorAll("#menu input, #menu button").forEach(el => el.disabled = true);
  } else {
    document.querySelectorAll("#menu input, #menu button").forEach(el => el.disabled = false);
  }

  // Load current game
  if (window.startGame) window.startGame(data.currentGame, roomId);
});

startBtn.onclick = async () => {
  const games = [...document.querySelectorAll("input:checked")].map(x => x.value);
  await updateDoc(ref, { games, currentGame: games[0], gameState: {} });
};
