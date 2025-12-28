window.startGame = (g) => {
  if (g !== "guess-word") return;
  document.getElementById("game").innerHTML = `
    <h3>Guess the Word</h3>
    <input placeholder="Guess">
    <button>Submit</button>
  `;
};
