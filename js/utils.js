import { auth } from "./firebase.js";

// Rotate turn to next player
export function nextTurn(players, currentUid) {
  const idx = players.indexOf(currentUid);
  return players[(idx + 1) % players.length];
}

// Check if move is valid
export function isValidMove(board, pos) {
  return board[pos] === "" || board[pos] === null;
}

// Wordle scoring helper
export function scoreWordle(word, guess) {
  const result = [];
  const wordArr = word.toUpperCase().split("");
  const guessArr = guess.toUpperCase().split("");
  const used = Array(wordArr.length).fill(false);

  // Correct letters in correct place
  guessArr.forEach((l, i) => {
    if (wordArr[i] === l) {
      result[i] = "green";
      used[i] = true;
    }
  });

  // Correct letters wrong place
  guessArr.forEach((l, i) => {
    if (!result[i]) {
      const idx = wordArr.findIndex((c,j) => c===l && !used[j]);
      if (idx >= 0) {
        result[i] = "yellow";
        used[idx] = true;
      } else {
        result[i] = "gray";
      }
    }
  });

  return result;
}

// Simple helper to get current UID
export function getUid() {
  return auth.currentUser.uid;
}
