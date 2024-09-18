class GameOfLife {
  constructor(height, width) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    // TODO: Create and return an 2D Array
    // with `this.heigh` as rows and `this.width` as cols.
    // For example, given a height of 4 and a width of 3, it will generate:
    // [
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    // ]
    let new_array = [];
    for (let k = 0; k < this.height; k++) {
      let temp_arr = [];
      for (let i = 0; i < this.width; i++) {
        temp_arr.push(0);
      }
      new_array.push(temp_arr);
    }
    return new_array;
  }

  /**
   * Return the amount of living neighbors around a given coordinate.
   */

  livingNeighbors(row, col) {
    // TODO: Return the count of living neighbors.

    /*
      [[-1,0,1],
      [-1,0,1],
      [-1,0,1]]
      ---to navigate through the its adjacent box use the above diagram to loop through---
    */

    let aliveCount = 0;
    for (let k = -1; k <= 1; k++) {
      for (let i = -1; i <= 1; i++) {
        if (i === 0 && k === 0) {
          continue;
        }
        let arrRow = row + k;
        let arrColumn = col + i;
        if (
          arrRow < 0 ||
          arrRow >= this.height ||
          arrColumn < 0 ||
          arrColumn >= this.width
        ) {
          continue;
        }
        if (this.board[arrRow][arrColumn] === 1) {
          aliveCount = aliveCount + 1;
        }
      }
    }
    return aliveCount;
  }

  /**
   * Given the present board, apply the rules to generate a new board
   */

  tick() {
    const newBoard = this.makeBoard();
    for (let k = 0; k < this.height; k++) {
      for (let i = 0; i < this.width; i++) {
        let aliveNeighbours = this.livingNeighbors(k, i);
        if (
          this.board[k][i] === 1 &&
          (aliveNeighbours < 2 || aliveNeighbours > 3)
        ) {
          newBoard[k][i] = 0;
        } else if (this.board[k][i] === 0 && aliveNeighbours === 3) {
          newBoard[k][i] = 1;
        } else {
          newBoard[k][i] = this.board[k][i];
        }
      }
    }
    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // (the next iteration of the game)
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
    this.board = newBoard;
    return this.board;
  }
}

// let p = new GameOfLife(4, 4);
// p.board[1][1] = 1;
// p.board[1][2] = 1;
// p.board[2][2] = 1;

// console.log(p.board);
// console.log(p.livingNeighbors(1, 2));
// console.log(p.tick());
