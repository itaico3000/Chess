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
let possibleMoves;
let pieces = [];
let boardData;
let table;
let y; //check
let savedPiece;
let savedPossibleMoves;
let lastcell;
let child = [];
let lastrow;
let lastcol;
let lastData;
let turn = 0;
let save = 0;
let final = [];
a = 0;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  check() {
    let relativeMoves = [];
    if (this.player === WHITE_PLAYER) {
      relativeMoves = this.getPawnWRelativeMoves();
      relativeMoves = relativeMoves.concat(this.getWhiteKnightRelativeMoves());
      relativeMoves = relativeMoves.concat(this.getqueenRelativeMoves());
      relativeMoves = relativeMoves.concat(this.getWhiteKingRelativeMoves());
    } else {
      relativeMoves = this.getPawnBRelativeMoves();
      relativeMoves = relativeMoves.concat(this.getBlackKnightRelativeMoves());
      relativeMoves = relativeMoves.concat(this.getqueenRelativeMoves());
      relativeMoves = relativeMoves.concat(this.getBlcakKingRelativeMoves());
    }

    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      //check all possibilities of this.pawn
      let absoluteRow = this.row + relativeMove[0];
      let absoluteCol = this.col + relativeMove[1];

      let checkData = boardData.getPiece(this.row, this.col);

      absoluteMoves.push([absoluteRow, absoluteCol]);

      lastData = boardData.getPiece(this.row, this.col);
    }

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
    }

    return filteredMoves;
    //return filteredMoves;
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
    } else if (this.type === KNIGHT && this.player === WHITE_PLAYER) {
      relativeMoves = this.getWhiteKnightRelativeMoves();
    } else if (this.type === KNIGHT && this.player === BLACK_PLAYER) {
      relativeMoves = this.getBlackKnightRelativeMoves();
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves();
    } else if (this.type === KING && this.player === WHITE_PLAYER) {
      relativeMoves = this.getWhiteKingRelativeMoves();
    } else if (this.type === KING && this.player === BLACK_PLAYER) {
      relativeMoves = this.getBlcakKingRelativeMoves();
    } else if (this.type === QUEEN) {
      relativeMoves = this.getqueenRelativeMoves();
    }

    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      //check all possibilities of this.pawn
      let absoluteRow = this.row + relativeMove[0];
      let absoluteCol = this.col + relativeMove[1];

      let checkData = boardData.getPiece(this.row, this.col);

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
    }

    console.log("filteredMoves", filteredMoves);
    return filteredMoves;
    //return filteredMoves;
  }

  getPawnWRelativeMoves() {
    //pawn white
    // TODO: Give different answer to black player
    let result = [];
    result.push([1, 0]);

    for (let i = 0; i < result.length; i++) {
      let currentPiece = boardData.getPiece(
        this.row + result[i][0],
        this.col + result[i][1]
      );
      if (currentPiece !== undefined) {
        result.splice(i, 1);

        a = i;
      }
    }
    console.log("this is result ", result);
    result.push([1, 1]);
    result.push([1, -1]);
    for (let i = a + 1; i < result.length; i++) {
      let currentPiece = boardData.getPiece(
        this.row + result[i][0],
        this.col + result[i][1]
      );

      if (currentPiece !== undefined && currentPiece.player === WHITE_PLAYER) {
        result.splice(i, 1);
        i--;
      } else if (currentPiece === undefined) {
        result.splice(i, 1);
        i--;
      }
    }

    return result;
  }
  getPawnBRelativeMoves() {
    // TODO: Give different answer to black player
    let result = [];
    result.push([-1, 0]);

    for (let i = 0; i < result.length; i++) {
      let currentPiece = boardData.getPiece(
        this.row + result[i][0],
        this.col + result[i][1]
      );
      if (currentPiece !== undefined) {
        result.splice(i, 1);

        a = i;
      }
    }
    console.log("this is result ", result);
    result.push([-1, 1]);
    result.push([-1, -1]);
    for (let i = a + 1; i < result.length; i++) {
      let currentPiece = boardData.getPiece(
        this.row + result[i][0],
        this.col + result[i][1]
      );

      if (currentPiece !== undefined && currentPiece.player === BLACK_PLAYER) {
        result.splice(i, 1);
        i--;
      } else if (currentPiece === undefined) {
        result.splice(i, 1);
        i--;
      }
    }

    return result;
  }
  getWhiteKnightRelativeMoves() {
    let result = [];

    result.push([2, 1]);
    result.push([2, -1]);
    result.push([-2, 1]);
    result.push([-2, -1]);
    result.push([-1, -2]);
    result.push([1, -2]);
    result.push([-1, 2]);
    result.push([1, 2]);
    for (let i = 0; i < result.length; i++) {
      let currentPiece = boardData.getPiece(
        this.row + result[i][0],
        this.col + result[i][1]
      );
      if (currentPiece !== undefined && currentPiece.player === WHITE_PLAYER) {
        result.splice(i, 1);
        i--;
      }
    }

    return result;
  }
  getBlackKnightRelativeMoves() {
    let result = [];

    result.push([2, 1]);
    result.push([2, -1]);
    result.push([-2, 1]);
    result.push([-2, -1]);
    result.push([-1, -2]);
    result.push([1, -2]);
    result.push([-1, 2]);
    result.push([1, 2]);
    for (let i = 0; i < result.length; i++) {
      let currentPiece = boardData.getPiece(
        this.row + result[i][0],
        this.col + result[i][1]
      );
      if (currentPiece !== undefined && currentPiece.player === BLACK_PLAYER) {
        result.splice(i, 1);
        i--;
      }
    }
    console.log("this is result ", result);
    return result;
  }
  getWhiteKingRelativeMoves() {
    let result = [];
    result.push([1, 1]);
    result.push([1, -1]);
    result.push([1, 0]);
    result.push([0, -1]);
    result.push([0, 1]);
    result.push([-1, -1]);
    result.push([-1, 1]);
    result.push([-1, 0]);
    for (let i = 0; i < result.length; i++) {
      let currentPiece = boardData.getPiece(
        this.row + result[i][0],
        this.col + result[i][1]
      );
      if (currentPiece !== undefined && currentPiece.player === WHITE_PLAYER) {
        result.splice(i, 1);
        i--;
      }
    }
    return result;
  }
  getBlcakKingRelativeMoves() {
    let result = [];
    result.push([1, 1]);
    result.push([1, -1]);
    result.push([1, 0]);
    result.push([0, -1]);
    result.push([0, 1]);
    result.push([-1, -1]);
    result.push([-1, 1]);
    result.push([-1, 0]);
    for (let i = 0; i < result.length; i++) {
      let currentPiece = boardData.getPiece(
        this.row + result[i][0],
        this.col + result[i][1]
      );
      if (currentPiece !== undefined && currentPiece.player === BLACK_PLAYER) {
        result.splice(i, 1);
        i--;
      }
    }
    return result;
  }
  getRookRelativeMoves() {
    let result = [];

    if (this.player === WHITE_PLAYER) {
      result = result.concat(whiteArrow(this, 1, 0));

      result = result.concat(whiteArrow(this, -1, 0));

      result = result.concat(whiteArrow(this, 0, 1));

      result = result.concat(whiteArrow(this, 0, -1));
    } else {
      result = result.concat(blackArrow(this, 1, 0));

      result = result.concat(blackArrow(this, -1, 0));

      result = result.concat(blackArrow(this, 0, 1));

      result = result.concat(blackArrow(this, 0, -1));
    }
    //}
    console.log("this is result ", result);
    return result;
  }
  getBishopRelativeMoves() {
    let result = [];
    if (this.player === WHITE_PLAYER) {
      result = result.concat(whiteArrow(this, 1, 1));

      result = result.concat(whiteArrow(this, -1, -1));

      result = result.concat(whiteArrow(this, -1, 1));

      result = result.concat(whiteArrow(this, 1, -1));
    } else {
      result = result.concat(blackArrow(this, 1, 1));

      result = result.concat(blackArrow(this, -1, -1));

      result = result.concat(blackArrow(this, -1, 1));

      result = result.concat(blackArrow(this, 1, -1));
    }
    return result;
  }
  getqueenRelativeMoves() {
    let result = [];
    if (this.player === WHITE_PLAYER) {
      result = result.concat(whiteArrow(this, 1, 0));

      result = result.concat(whiteArrow(this, -1, 0));

      result = result.concat(whiteArrow(this, 0, 1));

      result = result.concat(whiteArrow(this, 0, -1));
      result = result.concat(whiteArrow(this, 1, 1));

      result = result.concat(whiteArrow(this, -1, -1));

      result = result.concat(whiteArrow(this, -1, 1));

      result = result.concat(whiteArrow(this, 1, -1));
    } else {
      result = result.concat(blackArrow(this, 1, 0));

      result = result.concat(blackArrow(this, -1, 0));

      result = result.concat(blackArrow(this, 0, 1));

      result = result.concat(blackArrow(this, 0, -1));
      result = result.concat(blackArrow(this, 1, 1));

      result = result.concat(blackArrow(this, -1, -1));

      result = result.concat(blackArrow(this, -1, 1));

      result = result.concat(blackArrow(this, 1, -1));
    }
    return result;
  }
}

function whiteArrow(piece, row, col) {
  let arr = [];
  for (let i = 1; i < 8; i++) {
    let currentRow = piece.row + row * i; // 3-3 - 4-3
    let currentCol = piece.col + col * i;
    let thisPiece = boardData.getPiece(currentRow, currentCol);
    if (thisPiece === undefined) {
      arr.push([row * i, col * i]);
    } else if (thisPiece.player === BLACK_PLAYER) {
      arr.push([row * i, col * i]);
      return arr;
    } else if (thisPiece) {
      return arr;
    }
  }
  return arr;
}
function blackArrow(piece, row, col) {
  let arr = [];
  for (let i = 1; i < 8; i++) {
    let currentRow = piece.row + row * i; // 3-3 - 4-3
    let currentCol = piece.col + col * i;
    let thisPiece = boardData.getPiece(currentRow, currentCol);
    if (thisPiece === undefined) {
      arr.push([row * i, col * i]);
    } else if (thisPiece.player === WHITE_PLAYER) {
      arr.push([row * i, col * i]);
      break;
    } else if (thisPiece) {
      return arr;
    }
  }
  return arr;
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
  changeLocation(row, col, lastrow, lastcol, lastype, lastplayer) {
    let remove = this.getPiece(lastrow, lastcol);
    console.log("this is remove ", remove);
    if (remove) {
    }
    this.pieces.push(new Piece(row, col, lastype, lastplayer));

    this.pieces.splice(this.pieces.indexOf(remove), 1);

    console.log(this.pieces);
    return remove;
  }
  eat(type, player, row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      if (
        type === this.pieces[i].type &&
        player === this.pieces[i].player &&
        row === this.pieces[i].row &&
        col === this.pieces[i].col
      ) {
        this.pieces.splice(this.pieces.indexOf(this.pieces[i]), 1);
        i--;
      }
    }
  }
  getpiecebytype(type, player) {
    for (const piece of this.pieces) {
      if (type === piece.type && player === piece.player) {
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
  // for (let i = 0; i < BOARD_SIZE; i++) {
  //   result.push(new Piece(2, i, undefined, undefined));
  //   result.push(new Piece(3, i, undefined, undefined));
  //   result.push(new Piece(4, i, undefined, undefined));
  //   result.push(new Piece(5, i, undefined, undefined));

  // }
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
  if (player === undefined) {
  } else {
    const image = document.createElement("img");
    image.src = "images/" + player + "/" + name + ".png";
    image.id = player + "-" + name;
    cell.appendChild(image);
  }
}

function onCellClick(event, row, col) {
  // Clear all previous possible moves

  if (checkIfchecked()) {
    alert("check! protect your king");
  }
  if (selectedCell !== undefined && lastcell !== undefined) {
    if (lastcell === selectedCell) {
      child.push(lastcell.firstChild);
    }
  }
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove("selected");
      table.rows[i].cells[j].classList.remove("selectedoptions");
    }
  }
  let piece = boardData.getPiece(row, col);
  console.log("this is piece ", piece);

  if (piece !== undefined && turn % 2 == 0 && piece.player === WHITE_PLAYER) {
    possibleMoves = piece.getPossibleMoves();

    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add("selectedoptions");
    }
  } else if (
    piece !== undefined &&
    turn % 2 == 1 &&
    piece.player === BLACK_PLAYER
  ) {
    possibleMoves = piece.getPossibleMoves();

    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add("selectedoptions");
    }
  }

  if (selectedCell !== undefined) {
    selectedCell.classList.remove("selected");
  }

  // Show selected cell
  selectedCell = event.currentTarget;
  selectedCell.classList.add("selected");
  // let savedPiece =piece;
  // let  savedPossibleMoves= possibleMoves;
  if (savedPossibleMoves !== undefined) {
    turn += move(savedPossibleMoves, possibleMoves, row, col);
    console.log("this is turn ", turn);

    if (
      selectedCell.firstChild !== undefined &&
      selectedCell.children.length > 1 &&
      piece !== undefined
    ) {
      boardData.eat(piece.type, piece.player, lastrow, lastcol);
      selectedCell.firstChild.remove("img");
      piece.player = savedPiece.player;
      piece.type = savedPiece.type;
    }
  }
  if (piece !== undefined && possibleMoves !== undefined) {
    savedPiece = piece;
    savedPossibleMoves = possibleMoves;
  }

  lastrow = row;
  lastcol = col;
  lastcell = selectedCell;

  child = [];
}
function move(savedPossibleMoves, possibleMoves, row, col) {
  let turn = 0;
  for (const i of savedPossibleMoves) {
    // for (const k of possibleMoves) {
    if (i !== undefined && i[0] === row && i[1] === col) {
      //  if (lastcell!==undefined) {

      if (child.length > 0 && child[0] !== null) {
        const cell = table.rows[i[0]].cells[i[1]].append(child.pop());
        piece = boardData.changeLocation(
          i[0],
          i[1],
          savedPiece.row,
          savedPiece.col,
          savedPiece.type,
          savedPiece.player
        );
        turn = 1;
      }
    }
    //}
  }
  return turn;
}
function checkIfchecked() {
  let whiteKing = boardData.getpiecebytype(KING, WHITE_PLAYER);
  let blackKing = boardData.getpiecebytype(KING, BLACK_PLAYER);
  let blackMoves = [];
  let whitemoves = [];
  let attack = [];

  whitemoves = whiteKing.check();
  for (let possibleMove of whitemoves) {
    let attacker = boardData.getPiece(possibleMove[0], possibleMove[1]);
    let cell1 = table.rows[possibleMove[0]].cells[possibleMove[1]];

    if (attacker !== undefined && attacker.player === BLACK_PLAYER) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      attack = attacker.getPossibleMoves();

      console.log("this is attack !", attack);
      for (const possibleMov of attack) {
        let attackCheck = boardData.getPiece(possibleMov[0], possibleMov[1]);
        console.log(attackCheck);
        if (attackCheck !== undefined && attackCheck.type === KING) {
          return true;
        }
      }
    }
  }
  blackMoves = blackKing.check();
  for (let possibleMove of blackMoves) {
    let attacker = boardData.getPiece(possibleMove[0], possibleMove[1]);
    let cell1 = table.rows[possibleMove[0]].cells[possibleMove[1]];

    if (attacker !== undefined && attacker.player === WHITE_PLAYER) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      attack = attacker.getPossibleMoves();

      console.log("this is attack !", attack);
      for (const possibleMov of attack) {
        let attackCheck = boardData.getPiece(possibleMov[0], possibleMov[1]);
        console.log(attackCheck);
        if (attackCheck !== undefined && attackCheck.type === KING) {
          return true;
        }
      }
    }
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
