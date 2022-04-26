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
let lastTurn;
let save = 0;
let final = [];

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
  result.push(new Piece(row, 3, QUEEN, player));
  result.push(new Piece(row, 4, KING, player));
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
function removeCellClasses() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove("selected");
      table.rows[i].cells[j].classList.remove("selectedoptions");
      table.rows[i].cells[j].classList.remove("attack");
      table.rows[i].cells[j].classList.remove("protect");
      table.rows[i].cells[j].classList.remove("protector");

      if (table.rows[i].cells[j].firstChild === null) {
        let remove = boardData.getPiece(i, j);
        if (remove !== undefined) {
          boardData.removePiece(remove.type, remove.player);
          boardData.removeDuplicates();
        }
      }
    }
  }
}
function addPossibleOptions(piece, possibleMoves, turn) {
  if (piece !== undefined && turn % 2 == 0 && piece.player === WHITE_PLAYER) {
    possibleMoves = piece.getPossibleMoves();
    if (piece.type === KING && piece.player === WHITE_PLAYER) {
      possibleMoves = piece.ifKingCanMove();
    }
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
  return possibleMoves;
}
function onCellClick(event, row, col) {
  // Clear all previous possible moves

  if (selectedCell !== undefined && lastcell !== undefined) {
    if (lastcell === selectedCell) {
      child.push(lastcell.firstChild);
    }
  }
  removeCellClasses();
  let piece = boardData.getPiece(row, col);
  console.log("this is piece ", piece);
  possibleMoves = addPossibleOptions(piece, possibleMoves, turn);

  if (selectedCell !== undefined) {
    selectedCell.classList.remove("selected");
  }

  // Show selected cell

  selectedCell = event.currentTarget;

  if (selectedCell === lastcell) {
    turn = lastTurn;
  }

  selectedCell.classList.add("selected");
  // let savedPiece =piece;
  // let  savedPossibleMoves= possibleMoves;
  if (savedPossibleMoves !== undefined) {
    turn += move(savedPossibleMoves, possibleMoves, row, col);

    if (
      selectedCell.firstChild !== undefined &&
      selectedCell.children.length > 1 &&
      piece !== undefined
    ) {
      boardData.eat(piece.type, piece.player, row, col);
      selectedCell.firstChild.remove("img");
      piece.player = savedPiece.player;
      piece.type = savedPiece.type;
    }

    lastcell = selectedCell;

    if (turn > lastTurn) {
      selectedCell = undefined;
      if (turn % 2 == 0) {
        let h2 = document.querySelector("h2");
        h2.innerText = "this is white turn";
      } else {
        let h2 = document.querySelector("h2");
        h2.innerText = "this is black turn";
      }
      if (checkIfchecked()) {
        alert("check! protect your king first time");
        let o = checkWhoCanEat(attack());
        let w = ifKingCanMove();
        let q = checkWhoCanBlock(attack());
        if (w) {
          if (!q) {
            if (!o) {
              alert("checkMate !!!!!!!!!!!!!!!!!!");
            }
          }
        }
      }
    }
  }

  if (piece !== undefined && possibleMoves !== undefined) {
    savedPiece = piece;
    savedPossibleMoves = possibleMoves;
  }

  lastrow = row;
  lastcol = col;
  lastcell = selectedCell;
  lastTurn = turn;

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
  let a = false;

  whitemoves = whiteKing.check();
  for (let possibleMove of whitemoves) {
    let attacker = boardData.getPiece(possibleMove[0], possibleMove[1]);
    let cell1 = table.rows[possibleMove[0]].cells[possibleMove[1]];

    if (attacker !== undefined && attacker.player === BLACK_PLAYER) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      attack = attacker.getPossibleMoves();
      for (const possibleMov of attack) {
        let attackCheck = boardData.getPiece(possibleMov[0], possibleMov[1]);

        if (attackCheck !== undefined && attackCheck.type === KING) {
          a = true;
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

      for (const possibleMov of attack) {
        let attackCheck = boardData.getPiece(possibleMov[0], possibleMov[1]);
        if (attackCheck !== undefined && attackCheck.type === KING) {
          cell.classList.add("attack");

          return true;
        }
      }
    }
  }
  return a;
}
function ifKingCanMove() {
  let whiteKing = boardData.getpiecebytype(KING, WHITE_PLAYER);
  let possibleMoves = [];
  let whitemoves = [];
  check = [];
  whitemoves = whiteKing.ifKingCanMove();
  console.log(whitemoves);

  if ((whitemoves = [])) {
    console.log("the king cant move!!!!!!!!!!!!!!!");
    return true;
  }
}
function attack() {
  let whiteKing = boardData.getpiecebytype(KING, WHITE_PLAYER);
  let blackKing = boardData.getpiecebytype(KING, BLACK_PLAYER);
  let blackMoves = [];
  let whitemoves = [];
  let attack = [];
  let attacker;
  whitemoves = whiteKing.check();

  for (let possibleMove of whitemoves) {
    attacker = boardData.getPiece(possibleMove[0], possibleMove[1]);
    let cell1 = table.rows[possibleMove[0]].cells[possibleMove[1]];

    if (attacker !== undefined && attacker.player === BLACK_PLAYER) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      attack = attacker.getPossibleMoves();
      if (attack !== undefined) {
        for (const possibleMov of attack) {
          let attackCheck = boardData.getPiece(possibleMov[0], possibleMov[1]);

          if (attackCheck !== undefined && attackCheck.type === KING) {
            // cell.classList.add("attack");
            return attacker; //returns the attacker
          }
        }
      }
    }
  }
  return [];
}

function checkWhoCanBlock(attacker) {
  let possibleMoves = [];
  let whitemoves = [];
  let check;
  let a = false;
  let attack;
  let attackerName;
  let otherAttacker;
  let whiteKing = boardData.getpiecebytype(KING, WHITE_PLAYER);

  if (attacker.type !== KNIGHT) {
    check = whiteKing.rowandcol(
      attacker.row,
      whiteKing.row,
      attacker.col,
      whiteKing.col,
      whiteKing
    );
  }

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = table.rows[i].cells[j];

      let possible = boardData.getPiece(i, j);
      if (
        possible !== undefined &&
        possible.player === WHITE_PLAYER &&
        possible.type === KING
      ) {
        possibleMoves = possible.ifKingCanMove();
      } else if (
        possible !== undefined &&
        possible.player === WHITE_PLAYER &&
        possible.type !== KING
      ) {
        possibleMoves = possible.getPossibleMoves();
      }
      if (possibleMoves !== undefined) {
        for (const possibleMove of possibleMoves) {
          attack = attacker.getPossibleMoves();
          if (check === undefined) {
          } else {
            for (const checked of check) {
              for (const attacked of attack) {
                let attackCheck = boardData.getPiece(attacked[0], attacked[1]);
                if (
                  attacked[0] === possibleMove[0] &&
                  attacked[1] === possibleMove[1] &&
                  checked[0] === possibleMove[0] &&
                  checked[1] === possibleMove[1] &&
                  attacked[0] === attacked[0] &&
                  attacked[1] === attacked[1]
                ) {
                  table.rows[possibleMove[0]].cells[
                    possibleMove[1]
                  ].classList.add("protect");
                  a = true;
                }
              }
            }
          }
        }
      }
    }
  }

  return a;
}
function checkWhoCanEat(attacker) {
  let possibleMoves;
  let possible;
  let whitemoves = [];
  check = [];
  let a = false;
  let attack;
  let attackerName;
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = table.rows[i].cells[j];

      possible = boardData.getPiece(i, j);
      if (
        possible !== undefined &&
        possible.player === WHITE_PLAYER &&
        possible.type === KING
      ) {
        possibleMoves = possible.ifKingCanMove();
      } else if (
        possible !== undefined &&
        possible.player === WHITE_PLAYER &&
        possible.type !== KING
      ) {
        possibleMoves = possible.getPossibleMoves();
      }
      if (possibleMoves !== undefined) {
        for (const possibleMove of possibleMoves) {
          let attackCheck = boardData.getPiece(
            possibleMove[0],
            possibleMove[1]
          ); //pawn of possiblemove of white player
          if (
            attackCheck !== undefined &&
            attackCheck.row === attacker.row &&
            attackCheck.col === attacker.col
          ) {
            cell.classList.add("protector");
            a = true;
            possibleMoves = undefined;
          }
        }
      }
    }
  }

  return a;
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
