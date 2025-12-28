import { doc, onSnapshot, updateDoc } from "../js/firebase.js";
import { nextTurn, getUid } from "../js/utils.js";

window.startGame = (game, roomId) => {
  if (game !== "chess") return;
  const ref = doc(firebase.db, "rooms", roomId);

  onSnapshot(ref, snap => {
    const state = snap.data().gameState || { board: null, currentTurn:snap.data().players[0] };
    document.getElementById("game").innerHTML = `<h3>Chess (implement chess.js here)</h3>`;
    // Multiplayer chess moves can update state.board and currentTurn
  });
};
