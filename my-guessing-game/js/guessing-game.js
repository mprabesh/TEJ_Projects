/*
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".
In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
}

Game.prototype.difference = function () {
  return Math.abs(this.playersGuess - this.winningNumber);
};
Game.prototype.isLower = function () {
  return this.playersGuess < this.winningNumber ? true : false;
};
Game.prototype.playersGuessSubmission = function (myGuessNum) {
  if (myGuessNum < 1 || myGuessNum > 100 || isNaN(myGuessNum)) {
    document.querySelector("#title").innerHTML =
      "Please Enter only valid Number";
    document.querySelector("#players-input").value = "";

    throw `That is an invalid guess.`;
  } else {
    this.playersGuess = myGuessNum;
    return this.checkGuess();
  }
};
Game.prototype.checkGuess = function () {
  let gameResult = "";
  if (this.playersGuess === this.winningNumber) {
    gameResult = "You Win!";
    document.querySelector("#subtitle").innerHTML = "Yay! reset to play again";
  } else if (this.pastGuesses.includes(this.playersGuess)) {
    // alert(this.winningNumber);
    gameResult = "You have already guessed that number.";
    document.querySelector("#subtitle").innerHTML =
      "Guess a number between 1-100";
  } else {
    this.pastGuesses.push(this.playersGuess);
    document.getElementsByClassName("guess")[
      `${this.pastGuesses.length}` - 1
    ].innerHTML = this.playersGuess;
    if (this.pastGuesses.length === 5) {
      gameResult = "You Lose.";
      document.querySelector("#subtitle").innerHTML = "Please! reset the game";
    } else {
      let guessLevel = this.isLower() ? "Guess Higher" : "Guess Lower";
      document.querySelector("#subtitle").innerHTML = guessLevel;
      document.querySelector("#players-input").value = "";
      if (this.difference() < 10) {
        gameResult = "You're burning up!";
      } else if (this.difference() < 25) {
        gameResult = "You're lukewarm.";
      } else if (this.difference() < 50) {
        gameResult = "You're a bit chilly.";
      } else {
        gameResult = "You're ice cold!";
      }
    }
  }

  document.querySelector("#title").innerHTML = gameResult;
  return gameResult;
};

Game.prototype.provideHint = function () {
  let hintArray = [];
  hintArray.push(this.winningNumber);
  hintArray.push(generateWinningNumber());
  hintArray.push(generateWinningNumber());
  return shuffle(hintArray);
};

function newGame() {
  return new Game();
}

function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function shuffle(myArr) {
  let length = myArr.length;
  let temp, randomIndex;
  while (length) {
    randomIndex = Math.floor(Math.random() * length--);
    temp = myArr[length];
    myArr[length] = myArr[randomIndex];
    myArr[randomIndex] = temp;
  }
  return myArr;
}

function playGame() {
  //create a new Instance
  let myGame = new Game();
  let submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", () => {
    let inputNumber = document.getElementById("players-input");
    myGame.playersGuessSubmission(parseInt(inputNumber.value));
  });

  let resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", function () {
    location.reload();
  });

  let hintButton = document.querySelector("#hint");
  hintButton.addEventListener("click", function () {
    let myhint = myGame.provideHint();
    document.querySelector(
      "#title"
    ).innerHTML = `Your number may be ${myhint[0]},${myhint[1]} or ${myhint[2]}.`;
  });
}

playGame();
