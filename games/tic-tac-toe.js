window.startGame = (g) => {
  if (g !== "tic-tac-toe") return;
  let board = Array(9).fill("");
  const el = document.getElementById("game");

  function draw() {
    el.innerHTML = board.map((c,i)=>`<button onclick="move(${i})">${c}</button>`).join("");
  }

  window.move = i => {
    if (board[i]) return;
    board[i] = "X";
    draw();
  };

  draw();
};
