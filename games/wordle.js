import { doc, onSnapshot, updateDoc } from "../js/firebase.js";
import { scoreWordle, getUid, nextTurn } from "../js/utils.js";

window.startGame = (game, roomId) => {
  if (game !== "wordle") return;
  const ref = doc(firebase.db, "rooms", roomId);

  onSnapshot(ref, snap => {
    const state = snap.data().gameState || { word:"APPLE", guesses:{}, scores:{}, currentTurn:snap.data().players[0] };
    const uid = getUid();
    document.getElementById("game").innerHTML = `
      <h3>Wordle Multiplayer</h3>
      <input id="word-guess" maxlength="5"><button id="submit">Guess</button>
      <div id="word-output"></div>
    `;
    document.getElementById("submit").onclick = async () => {
      if (state.currentTurn !== uid) return alert("Not your turn!");
      const guess = document.getElementById("word-guess").value.toUpperCase();
      if (!state.guesses[uid]) state.guesses[uid] = [];
      state.guesses[uid].push(guess);
      const colors = scoreWordle(state.word, guess);

      state.scores[uid] = state.scores[uid] || 0;
      state.scores[uid] += colors.filter(c=>"green"===c).length; // points for correct letters
      state.currentTurn = nextTurn(snap.data().players, uid);
      await updateDoc(ref, { gameState: state });

      document.getElementById("word-output").innerText = `Last guess: ${guess} → ${colors.join(", ")}`;
    };
  });
};
