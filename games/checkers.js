window.startGame = (g) => {
  if (g !== "checkers") return;
  document.getElementById("game").innerHTML =
    "<h3>Checkers</h3>";
};
