import { doc, onSnapshot, updateDoc } from "../js/firebase.js";
import { nextTurn, getUid } from "../js/utils.js";

window.startGame = (game, roomId) => {
  if (game !== "checkers") return;
  const ref = doc(firebase.db, "rooms", roomId);

  onSnapshot(ref, snap => {
    const state = snap.data().gameState || { board: null, currentTurn:snap.data().players[0] };
    document.getElementById("game").innerHTML = `<h3>Checkers (simple board logic)</h3>`;
    // Multiplayer checkers moves update state.board and currentTurn
  });
};
