const width = 25;
const height = 20; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);

/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
// console.log(tds[1]);
document.getElementById("board").append(table);

/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  // TODO:
  //   1. For each <td> in the table:
  //     a. If its corresponding cell in gol instance is alive,
  //        give the <td> the `alive` CSS class.
  //     b. Otherwise, remove the `alive` class.
  //
  // To find all the <td>s in the table, you might query the DOM for them, or you
  // could choose to collect them when we create them in createTable.
  //
  // HINT:
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
  for (let x = 0; x < gol.board.length; x++) {
    for (let y = 0; y < gol.board[x].length; y++) {
      let cell = gol.board[x][y];
      let k = x * width + y;
      console.log(k);
      let td = tds[k];

      if (cell === 1) {
        // console.log(td);
        td.classList.add("alive");
      } else {
        td.classList.remove("alive");
        // console.log(td);
      }
    }
  }
};

/**
 * Event Listeners
 */

document.getElementById("board").addEventListener("click", (event) => {
  let row = event.target.dataset.row;
  let column = event.target.dataset.col;
  // console.log(gol.board[row][column]);
  if (gol.board[row][column] === 0) {
    // console.log("turned on");
    gol.board[row][column] = 1;
  } else {
    // console.log("turned off");
    gol.board[row][column] = 0;
  }
  paint();

  // event.target.classList.toggle("alive");
  // TODO: Toggle clicked cell (event.target) and paint
});

document.getElementById("step_btn").addEventListener("click", (event) => {
  // TODO: Do one gol tick and paint
  gol.tick();
  paint();
});

let clicked = false;
let interval;
document.getElementById("play_btn").addEventListener("click", (event) => {
  if (!clicked) {
    document.querySelector("#play_btn").innerText = "Stop";
    clicked = true;
    interval = setInterval(() => {
      gol.tick();
      paint();
    }, 500);
  } else {
    clicked = false;
    document.querySelector("#play_btn").innerText = "Play";
    clearInterval(interval);
  }
  // TODO: Start playing by calling `tick` and paint
  // repeatedly every fixed time interval.
  // HINT:
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
});

document.getElementById("random_btn").addEventListener("click", (event) => {
  // TODO: Randomize the board and paint
  for (let i = 0; i < gol.board.length; i++) {
    for (let j = 0; j < gol.board[i].length; j++) {
      gol.board[i][j] = Math.round(Math.random());
    }
  }
  paint();
});

document.getElementById("clear_btn").addEventListener("click", (event) => {
  // TODO: Clear the board and paint
  gol.board = gol.makeBoard();
  paint();
});
