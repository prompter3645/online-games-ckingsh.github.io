import { doc, onSnapshot, updateDoc } from "../js/firebase.js";
import { nextTurn, getUid } from "../js/utils.js";

window.startGame = (game, roomId) => {
  if (game !== "guess-number") return;
  const ref = doc(firebase.db, "rooms", roomId);

  onSnapshot(ref, snap => {
    const state = snap.data().gameState || {};
    document.getElementById("game").innerHTML = `
      <h3>Guess the Number (1-100)</h3>
      <input id="guess" type="number"><button id="submit">Guess</button>
      <div id="gn-output"></div>
    `;

    document.getElementById("submit").onclick = async () => {
      const uid = getUid();
      if (state.currentTurn && state.currentTurn !== uid) return alert("Not your turn!");
      const guess = parseInt(document.getElementById("guess").value);
      const number = state.number || Math.floor(Math.random()*100)+1;

      const output = document.getElementById("gn-output");
      if (!state.number) state.number = number;

      if (guess === number) output.innerText = `Player ${uid} guessed correctly!`;
      else output.innerText = guess < number ? "Too low!" : "Too high!";

      const players = snap.data().players;
      state.currentTurn = nextTurn(players, uid);

      await updateDoc(ref, { gameState: state });
    };
  });
};
