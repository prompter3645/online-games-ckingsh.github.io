window.startGame = (g) => {
  if (g !== "wordle") return;
  const word = "APPLE";
  document.getElementById("game").innerHTML = `
    <h3>Wordle</h3>
    <input id="w">
    <button onclick="alert('Checked')">Submit</button>
  `;
};
