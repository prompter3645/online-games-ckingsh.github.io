import { doc, onSnapshot, updateDoc } from "../js/firebase.js";
import { nextTurn, getUid } from "../js/utils.js";

window.startGame = (game, roomId) => {
  if (game !== "guess-word") return;
  const ref = doc(firebase.db, "rooms", roomId);

  onSnapshot(ref, snap => {
    const state = snap.data().gameState || { word:"BANANA", guesses:{}, currentTurn:snap.data().players[0] };
    const uid = getUid();
    document.getElementById("game").innerHTML = `
      <h3>Guess the Word Multiplayer</h3>
      <input id="gw-guess"><button id="submit">Guess</button>
      <div id="gw-output"></div>
    `;
    document.getElementById("submit").onclick = async () => {
      if (state.currentTurn !== uid) return alert("Not your turn!");
      const guess = document.getElementById("gw-guess").value.toUpperCase();
      state.guesses[uid] = state.guesses[uid] || [];
      state.guesses[uid].push(guess);
      state.currentTurn = nextTurn(snap.data().players, uid);
      await updateDoc(ref, { gameState: state });
      document.getElementById("gw-output").innerText = `Last guess: ${guess}`;
    };
  });
};
