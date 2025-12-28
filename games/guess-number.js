window.startGame = (g) => {
  if (g !== "guess-number") return;
  document.getElementById("game").innerHTML = `
    <h3>Guess the Number</h3>
    <input id="n"><button onclick="alert('Guess sent')">Guess</button>
  `;
};
