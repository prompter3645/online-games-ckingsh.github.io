import { doc, onSnapshot, updateDoc } from "../js/firebase.js";
import { nextTurn, isValidMove, getUid } from "../js/utils.js";

window.startGame = (game, roomId) => {
  if (game !== "tic-tac-toe") return;
  const ref = doc(firebase.db, "rooms", roomId);

  onSnapshot(ref, snap => {
    const state = snap.data().gameState || { board: Array(9).fill(""), currentTurn: snap.data().players[0] };
    const boardEl = document.getElementById("game");
    boardEl.innerHTML = state.board.map((v,i)=>`<button style="width:60px;height:60px;" onclick="makeMove(${i})">${v}</button>`).join("");

    window.makeMove = async (i) => {
      const uid = getUid();
      if (state.currentTurn !== uid) return alert("Not your turn!");
      if (!isValidMove(state.board,i)) return;

      state.board[i] = uid === snap.data().players[0] ? "X" : "O";
      state.currentTurn = nextTurn(snap.data().players, uid);
      await updateDoc(ref, { gameState: state });
    };
  });
};
