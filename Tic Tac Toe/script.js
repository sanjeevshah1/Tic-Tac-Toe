const bts = document.querySelectorAll(".button");
const resetButton = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGame = document.querySelector("#newButton");
turnO = true;
let count = 0;

const changeBackground = (event) => {
  event.target.style.backgroundColor = "#ffd3d6";
};
const revertBackground = (event) => {
  event.target.style.backgroundColor = "transparent";
};

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};
const checkWinner = () => {
  for (pattern of winPatterns) {
    let pos1val = bts[pattern[0]].innerText;
    let pos2val = bts[pattern[1]].innerText;
    let pos3val = bts[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        return true;
      }
    }
  }
};
const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const disableBoxes = () => {
  for (let box of bts) {
    box.disabled = true;
    box.innerText = "";
  }
};
const enableBoxes = () => {
  for (let box of bts) {
    box.disabled = false;
    box.innerText = "";
  }
};
bts.forEach((box) => {
  box.addEventListener("mouseover", changeBackground);
  box.addEventListener("mouseout", revertBackground);
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    count++;
    console.log(box);
    box.disabled = true;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

newGame.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
