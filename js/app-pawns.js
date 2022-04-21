const BOARD_SIZE = 8;
const WHITE_PLAYER = "white";
const BLACK_PLAYER = "dark";

const PAWN = "pawn";
const ROOK = "rook";
const KNIGHT = "knight";
const BISHOP = "bishop";
const KING = "king";
const QUEEN = "queen";

let selectedCell;
let pieces = [];
let boardData;
let table;
let y; //check

let up = 0;
let down = 0;
let right = 0;
let left = 0;
let lastData;
let save = 0;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  getPossibleMoves() {
    // Get relative moves

    let relativeMoves = [];

    if (this.type === PAWN && this.player === WHITE_PLAYER) {
      relativeMoves = this.getPawnWRelativeMoves();
    } else if (this.type === PAWN && this.player === BLACK_PLAYER) {
      relativeMoves = this.getPawnBRelativeMoves();
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves();
    } else if (this.type === KNIGHT) {
      relativeMoves = this.getknightRelativeMoves();
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves();
    } else if (this.type === KING) {
      relativeMoves = this.getkingRelativeMoves();
    } else if (this.type === QUEEN) {
      relativeMoves = this.getqueenRelativeMoves();
    }
    relativeMoves = this.getRookRelativeMoves();
    let blackarr = [];
    let whitearr = [];
    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      //check all possibilities of this.pawn
      let absoluteRow = this.row + relativeMove[0];
      let absoluteCol = this.col + relativeMove[1];

      let checkData = boardData.getPiece(this.row, this.col);
      if (lastData !== checkData) {
        up = 0;
        down = 0;
        right = 0;
        left = 0;
      }

      //  if ( absoluteRow===down) { //if the row === the row with white so dont push
      //    console.log('itai');
      //     absoluteRow = -1;
      //    absoluteCol = -1;
      //  }

      //    if(up===absoluteRow){
      //     absoluteRow = -1000;
      //    absoluteCol = -1000;
      //    console.log('shir');
      //   }

      //   if(left===absoluteCol){
      //     absoluteRow = -100;
      //    absoluteCol = -100;
      //    console.log('yael');
      //   }

      //  if(right===absoluteCol){
      //     absoluteRow = -10;
      //    absoluteCol = -10;
      //    console.log('tamar');
      //   }

      absoluteMoves.push([absoluteRow, absoluteCol]);

      lastData = boardData.getPiece(this.row, this.col);
    }
    console.log("absoluteMoves", absoluteMoves);

    // Get filtered absolute moves
    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      let absoluteRow = absoluteMove[0];
      let absoluteCol = absoluteMove[1];
      let checkDataDown = boardData.getPiece(absoluteRow, absoluteCol);

      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        filteredMoves.push(absoluteMove); //push this possibility
      }
      // let checkDataUp =boardData.getPiece(absoluteRow+1,absoluteCol);
      //  let checkDataDown =boardData.getPiece(absoluteRow-1,absoluteCol);
      //  let checkDataLeft =boardData.getPiece(absoluteRow,absoluteCol+1);
      //  let checkDataRight =boardData.getPiece(absoluteRow,absoluteCol-1);

      // if (checkDataDown!=undefined&&checkDataDown.player===WHITE_PLAYER){
      //  down=absoluteMove[1];
      //  console.log(down ,'this is down');
      // }

      // if (checkDataUp!=undefined&&checkDataUp.player===WHITE_PLAYER){
      //   up = absoluteMove[1];
      //   console.log(up ,'this is up');
      //  }
      //  if (checkDataLeft!=undefined&&checkDataLeft.player===WHITE_PLAYER){
      //   left = absoluteMove[0];
      //   console.log(left ,'this is left');
      //  }
      //  if (checkDataRight!=undefined&&checkDataRight.player===WHITE_PLAYER){
      //   right = absoluteMove[0];
      //   console.log(right ,'this is right');
      //  }
    }

    for (let filteredMove of filteredMoves) {
      const absoluteRow = filteredMove[0];
      const absoluteCol = filteredMove[1];

      let checkDataUp = boardData.getPiece(absoluteRow, absoluteCol);
      let checkDataDown = boardData.getPiece(absoluteRow, absoluteCol);
      let checkDataLeft = boardData.getPiece(absoluteRow, absoluteCol);
      let checkDataRight = boardData.getPiece(absoluteRow, absoluteCol);

      if (
        checkDataDown !== undefined &&
        checkDataDown.player === WHITE_PLAYER
      ) {
        whitearr.push(filteredMove);
        console.log(filteredMove, " 1111");
      }

      if (
        checkDataDown !== undefined &&
        checkDataDown.player === BLACK_PLAYER
      ) {
        blackarr.push(filteredMove);
        console.log(filteredMove, " 2222");
      }
    }

    console.log("filteredMoves", filteredMoves);

    //return filteredMoves;
    return filteredMoves;
  }

  getPawnWRelativeMoves() {
    //pawn white
    // TODO: Give different answer to black player
    return [[1, 0]];
  }
  getPawnBRelativeMoves() {
    // TODO: Give different answer to black player
    return [[-1, 0]];
  }
  getknightRelativeMoves() {
    let result = [];
    result.push([2, 1]);
    result.push([2, -1]);
    result.push([-2, 1]);
    result.push([-2, -1]);
    result.push([-1, -2]);
    result.push([1, -2]);
    result.push([-1, 2]);
    result.push([1, 2]);
    return result;
  }
  getkingRelativeMoves() {
    let result = [];
    result.push([1, 1]);
    result.push([1, -1]);
    result.push([1, 0]);
    result.push([0, -1]);
    result.push([0, 1]);
    result.push([-1, -1]);
    result.push([-1, 1]);
    result.push([-1, 0]);
    return result;
  }
  getRookRelativeMoves() {
    let result = [];

    for (let i = 1; i < BOARD_SIZE; i++) {
      let checkData = boardData?.getPiece(i, 0); //pawn

      result.push([i, 0]);

      result.push([0, -i]);

      result.push([0, i]);

      result.push([-i, 0]);
    }
    return result;
  }
  getBishopRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([-i, -i]); //one up one left
      result.push([-i, i]); //  one up one right
      result.push([i, i]); //one down one right
      result.push([i, -i]); //one down one left
    }
    return result;
  }
  getqueenRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([-i, -i]);
      result.push([-i, i]);
      result.push([i, i]);
      result.push([i, -i]);
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }
  whiteOrBlack() {
    for (const i of filteredMoves) {
    }
  }
}

class BoardData {
  constructor(pieces) {
    this.pieces = pieces; //{1,0,rook,white}  *32
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (row === piece.row && col === piece.col) {
        return piece;
      }
    }
  }
}

function getInitialPieces() {
  let result = [];

  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, BLACK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  }
  return result;
}

function addFirstRowPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player));
  result.push(new Piece(row, 1, KNIGHT, player));
  result.push(new Piece(row, 2, BISHOP, player));
  result.push(new Piece(row, 3, KING, player));
  result.push(new Piece(row, 4, QUEEN, player));
  result.push(new Piece(row, 5, BISHOP, player));
  result.push(new Piece(row, 6, KNIGHT, player));
  result.push(new Piece(row, 7, ROOK, player));
}

function addImage(cell, player, name) {
  const image = document.createElement("img");
  image.src = "images/" + player + "/" + name + ".png";
  image.id = player + "-" + name;
  cell.appendChild(image);
}

function onCellClick(event, row, col) {
  // Clear all previous possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove("selected");
      table.rows[i].cells[j].classList.remove("selectedoptions");
    }
  }
  const piece = boardData.getPiece(row, col); //[0,0]
  //console.log(piece);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves();

    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add("selectedoptions");
    }

    if (selectedCell !== undefined) {
      selectedCell.classList.remove("selected");
    }

    // Show selected cell
    selectedCell = event.currentTarget;
    selectedCell.classList.add("selected");
  }
}

function createChessBoard() {
  // Create empty chess board HTML:
  table = document.createElement("table");
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = "light-cell";
      } else {
        cell.className = "dark-cell";
      }
      cell.addEventListener("click", (event) => onCellClick(event, row, col));
    }
  }

  // Create list of pieces (32 total)
  boardData = new BoardData(getInitialPieces());
  pieces = getInitialPieces();

  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

window.addEventListener("load", createChessBoard);
