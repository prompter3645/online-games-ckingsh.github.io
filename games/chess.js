window.startGame = (g) => {
  if (g !== "chess") return;
  document.getElementById("game").innerHTML =
    "<h3>Chess (logic ready for chess.js)</h3>";
};
