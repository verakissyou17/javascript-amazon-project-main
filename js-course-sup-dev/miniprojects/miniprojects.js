//Flip-coin-game
const heads = document.querySelector(".heads");
const tails = document.querySelector(".tails");
const resultFlipCoin = document.querySelector(".result-flip-coin");
const resetFlipCoin = document.querySelector(".reset-flip-coin");

const scoreFlipCoin = JSON.parse(localStorage.getItem("flip-coin")) || {
  wins: 0,
  losses: 0,
};

const playFlipCoin = (guess) => {
  const randomNum = Math.random();
  const result1 = randomNum < 0.5 ? "heads" : "tails";

  let guessResult = "";

  if (guess === result1) {
    guessResult = "You win";
    scoreFlipCoin.wins++;
  } else {
    guessResult = "Computer wins";
    scoreFlipCoin.losses++;
  }

  localStorage.setItem("flip-coin", JSON.stringify(scoreFlipCoin));
  resultFlipCoin.innerHTML = `
  You: <img class="move-icon" src="./images/${guess}.png"> Computer: <img class="move-icon" src="./images/${result1}.png"><br> 
  Wins: ${scoreFlipCoin.wins} - 
  Losses: ${scoreFlipCoin.losses}
`;

  return guessResult;
};

tails.addEventListener("click", () => {
  playFlipCoin("tails");
});

heads.addEventListener("click", () => {
  playFlipCoin("heads");
});

resetFlipCoin.addEventListener("click", () => {
  scoreFlipCoin.wins = 0;
  scoreFlipCoin.losses = 0;
  localStorage.removeItem("flip-coin");
  resultFlipCoin.innerHTML = `
    Wins: ${scoreFlipCoin.wins}<br>
    Losses: ${scoreFlipCoin.losses}
  `;
});

//Cart project
const cartContainer = document.querySelector(".cart");
const showCartQuantity = document.querySelector(".show-quantity");
const addTocart = document.querySelector(".add");
const addTwo = document.querySelector(".plus-two");
const addThree = document.querySelector(".plus-three");
const resetBtn = document.querySelector(".reset-cart");
const displayResult = document.querySelector(".display");
const removeFromCart = document.querySelector(".minus");
const removeTwo = document.querySelector(".minus-two");
const removeThree = document.querySelector(".minus-three");
const inputElem = document.querySelector(".tax-input");
const taxBtn = document.querySelector(".tax-btn");

let cartQuantity = JSON.parse(localStorage.getItem("cartQuantity")) || 0;

function updateCartQuantity(num) {
  if (cartQuantity + num > 10) {
    displayResult.innerHTML = "Cart limit reached";
    return;
  }

  if (cartQuantity + num < 0) {
    displayResult.innerHTML = "Cart is empty";
    return;
  }

  cartQuantity += num;
  displayResult.innerHTML = `Cart: ${cartQuantity}`;
  localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
}

const displayTax = document.createElement("span");
cartContainer.appendChild(displayTax);

function calculateTax() {
  let cost = Number(inputElem.value);

  if (inputElem.value === "" || cost === 0) {
    displayTax.innerHTML = "Please enter a tax percentage";
    displayTax.style.color = "orange";
  } else if (cost < 0) {
    displayTax.innerHTML = "Error: cost cann't be less than 0";
    displayTax.style.color = "red";
  } else if (cost > 0 && cost < 40) {
    cost += 10;
    displayTax.innerHTML = `Total: ${cost}$`;
    displayTax.style.color = "green";
  } else {
    cost = cost;
    displayTax.innerHTML = `Total: ${cost}$`;
    displayTax.style.color = "green";
  }

  inputElem.value = "";
}

taxBtn.addEventListener("click", calculateTax);

showCartQuantity.addEventListener("click", () => {
  displayResult.innerHTML = `Cart: ${cartQuantity}`;
});

addTocart.addEventListener("click", () => {
  updateCartQuantity(1);
});

addTwo.addEventListener("click", () => {
  updateCartQuantity(2);
});

addThree.addEventListener("click", () => {
  updateCartQuantity(3);
});

removeFromCart.addEventListener("click", () => {
  updateCartQuantity(-1);
});

removeTwo.addEventListener("click", () => {
  updateCartQuantity(-2);
});

removeThree.addEventListener("click", () => {
  updateCartQuantity(-3);
});

resetBtn.addEventListener("click", () => {
  cartQuantity = 0;
  displayResult.innerHTML = `Cart was reset`;
  localStorage.removeItem("cartQuantity");
});

// Calculator project
const displayCalc = document.querySelector(".result-display");
const calcBtns = document.querySelectorAll(".calculator button");
const arrBtns = [...calcBtns];

arrBtns.forEach((button) => {
  button.addEventListener("click", () => {
    let calculation = "";
    const num = button.innerHTML;
    if (num !== "=") {
      calculation += num;
      console.log(calculation);
    } else {
      calculation = eval(calculation);
      console.log(calculation);
    }
  });
});

// Rock, Paper, Scissors game
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
const gameResult = document.querySelector(".game-result");
const resetButton = document.querySelector(".reset-score");
const autoPlayBtn = document.querySelector(".auto-play");

const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoPlayBtn.innerHTML = "Stop Playing!";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayBtn.innerHTML = "Auto Play!";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = `Tie!!!`;
      score.ties++;
    } else if (computerMove === "paper") {
      result = `You lose!`;
      score.losses++;
    } else if (computerMove === "scissors") {
      result = `You win!`;
      score.wins++;
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = `You win!`;
      score.wins++;
    } else if (computerMove === "paper") {
      result = `Tie!!!`;
      score.ties++;
    } else if (computerMove === "scissors") {
      result = `You lose!`;
      score.losses++;
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = `You lose!`;
      score.losses++;
    } else if (computerMove === "paper") {
      result = `You win!`;
      score.wins++;
    } else if (computerMove === "scissors") {
      result = `Tie!!!`;
      score.ties++;
    }
  }

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `
    You<img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">Computer
    `;

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();
}

function updateScoreElement() {
  gameResult.innerHTML = `Wins: ${score.wins},  
    Losses: ${score.losses}, 
    Ties: ${score.ties}
  `;
}

function resetScore() {
  document.querySelector('.reset-buttons').classList.remove('active');
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

rockBtn.addEventListener("click", () => {
  playGame("rock");
});
paperBtn.addEventListener("click", () => {
  playGame("paper");
});
scissorsBtn.addEventListener("click", () => {
  playGame("scissors");
});

resetButton.addEventListener("click", () => {
  document.querySelector('.reset-buttons').classList.add('active');
});

document.querySelector('.reset-btn').addEventListener('click', () => {
  resetScore();
});

document.querySelector('.close-reset-btn').addEventListener('click', () => {
  document.querySelector('.reset-buttons').classList.remove('active');
  updateScoreElement(); 
});

autoPlayBtn.addEventListener("click", autoPlay);

//Todo list
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoDisplay = document.getElementById("todoDisplay");
const todoDate = document.getElementById("date");

const todoObj = JSON.parse(localStorage.getItem('todoList')) || [{
  name: "sleep",
  dueDate: "2024-08-28",
}, {
  name: "code",
  dueDate: "2024-08-28",
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  todoObj.forEach((todo) => {
    const html = `
    <div class="todo-display">
    <p>${todo.name}</p>
    <p>${todo.dueDate}</p>
    <button class="delete-todo">Delete</button>
    </div>
    `;
    todoListHTML += html;
  });

  todoDisplay.innerHTML = todoListHTML;

  document.querySelectorAll(".delete-todo")
  .forEach((button, index) => {
    button.addEventListener("click", () => {
      todoObj.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todoObj));
      renderTodoList();
    });
});
};

function addTodo() {
  const name = taskInput.value;
  const dueDate = todoDate.value;

  todoObj.push({ name, dueDate });

  localStorage.setItem("todoList", JSON.stringify(todoObj));

  taskInput.value = "";

  renderTodoList();
}


addTaskBtn.addEventListener("click",() => {
  addTodo();
});


