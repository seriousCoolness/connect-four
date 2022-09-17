/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // sets "board" to empty HEIGHT x WIDTH matrix array
  board = new Array(HEIGHT);
  for(let i = 0; i < board.length; i++) {
    board[i] = new Array(WIDTH);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // gets "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // initialize the top row of the board table
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick); //add mouse click handler.

  //start adding cells to the top row, from left to right
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  //start adding the actual board cells, from top to bottom, from left to right.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); //create new row
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); //create new cell in row
      cell.setAttribute("id", `${y}-${x}`); //label its position on the board
      row.append(cell); //add it to the row
    }
    htmlBoard.append(row); //add row to board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let currCell = null;
  for(let i = 0; i < board.length; i++) {
    if(board[i][x] === undefined) {
      currCell = i;
    }
  }
  
  return currCell;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add("p" + currPlayer);
  let cell = document.getElementById(`${y}-${x}`);
  cell.append(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  console.log(findSpotForCol(x));
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  let boardCheck = true;

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if(!board[y][x])
        boardCheck = false;
    }
  }
  if (boardCheck)
    return endGame('The game is a tie!');


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1) {
    currPlayer = 2;
  }
  else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
