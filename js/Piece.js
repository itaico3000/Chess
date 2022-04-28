class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  ifKingCanMove(color, attackColor) {
    let whiteKing = boardData.getpiecebytype(KING, color);
    let possibleMoves = [];
    let whitemoves = [];
    let check = [];
    let row;
    let col;
    let saveDirection;
    let diagonalUp;
    let diagonalDown;

    let rowAttacker = "";
    let colAttacker = "";
    let rowDefender = "";
    let colDefender = "";

    whitemoves = whiteKing.getPossibleMoves();

    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        let possible = boardData.getPiece(i, j);
        if (possible !== undefined && possible.player === attackColor) {
          possibleMoves = possible.getPossibleMoves();
          if (possibleMoves !== undefined) {
            for (const possibleMove of possibleMoves) {
              for (
                let whiteMove = 0;
                whiteMove < whitemoves.length;
                whiteMove++
              ) {
                colDefender = whiteKing.col;
                rowDefender = whiteKing.row;

                if (
                  possibleMove[0] === whitemoves[whiteMove][0] &&
                  possibleMove[1] === whitemoves[whiteMove][1]
                ) {
                  console.log("this is white move , ", whitemoves);

                  rowAttacker = possible.row;
                  colAttacker = possible.col;
                  check =possibleMove;
                  whitemoves.splice(whiteMove, 1);
                  whiteMove--;
                  
                  
                }
                
              }
              
            }
          }
        }
      }
    }
    for (let i = 0; i < whitemoves.length; i++) {
      colDefender =whitemoves[i][1];
      rowDefender= whitemoves[i][0];
     
     
      if (
        rowAttacker > rowDefender &&
        colAttacker === colDefender 
       
      ) {
        // witch direction the king is attacked -down
        whitemoves.splice(i, 1);
        i--;
      }
     else if (
        rowAttacker < rowDefender &&
        colAttacker === colDefender 
      
      ) {
        // witch direction the king is attacked -up
        whitemoves.splice(i, 1);
        i--;
      }
     else if (
        rowAttacker === rowDefender &&
        colAttacker > colDefender 
       
      ) {
        // witch direction the king is attacked -right
        whitemoves.splice(i, 1);
        i--;
      }
      else if (
        rowAttacker === rowDefender &&
        colAttacker < colDefender 
      ) {
        // witch direction the king is attacked -left
        whitemoves.splice(i, 1);
        i--;
      }
   }
   
    return whitemoves;
  }
  rowandcol(rowAttacker, rowDefender, colAttacker, colDefender, whiteKing) {
    let relativeMoves = [];

    if (rowAttacker > rowDefender && colAttacker === colDefender) {
      // witch direction the king is attacked -down
      relativeMoves = relativeMoves.concat(whiteArrow(whiteKing, 1, 0));
    }
    if (rowAttacker < rowDefender && colAttacker === colDefender) {
      // witch direction the king is attacked -up
      relativeMoves = relativeMoves.concat(whiteArrow(whiteKing, -1, 0));
    }
    if (rowAttacker === rowDefender && colAttacker > colDefender) {
      // witch direction the king is attacked -right
      relativeMoves = relativeMoves.concat(whiteArrow(whiteKing, 0, 1));
    }
    if (rowAttacker === rowDefender && colAttacker < colDefender) {
      // witch direction the king is attacked -left
      relativeMoves = relativeMoves.concat(whiteArrow(whiteKing, 0, -1));
    }
    if (rowAttacker < rowDefender && colAttacker < colDefender) {
      // witch direction the king is attacked -left up
      relativeMoves = relativeMoves.concat(whiteArrow(whiteKing, -1, -1));
    }
    if (rowAttacker < rowDefender && colAttacker > colDefender) {
      // witch direction the king is attacked -left up
      relativeMoves = relativeMoves.concat(whiteArrow(whiteKing, -1, 1));
    }
    if (rowAttacker > rowDefender && colAttacker > colDefender) {
      // witch direction the king is attacked -left down
      relativeMoves = relativeMoves.concat(whiteArrow(whiteKing, 1, 1));
    }
    if (rowAttacker > rowDefender && colAttacker < colDefender) {
      // witch direction the king is attacked -right down
      relativeMoves = relativeMoves.concat(whiteArrow(whiteKing, 1, -1));
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
  }
  rowandcolBlack(
    rowAttacker,
    rowDefender,
    colAttacker,
    colDefender,
    whiteKing
  ) {
    let relativeMoves = [];

    if (rowAttacker > rowDefender && colAttacker === colDefender) {
      // witch direction the king is attacked -down

      relativeMoves = relativeMoves.concat(blackArrow(whiteKing, 1, 0));
    }
    if (rowAttacker < rowDefender && colAttacker === colDefender) {
      // witch direction the king is attacked -up
      relativeMoves = relativeMoves.concat(blackArrow(whiteKing, -1, 0));
    }
    if (rowAttacker === rowDefender && colAttacker > colDefender) {
      // witch direction the king is attacked -right
      relativeMoves = relativeMoves.concat(blackArrow(whiteKing, 0, 1));
    }
    if (rowAttacker === rowDefender && colAttacker < colDefender) {
      // witch direction the king is attacked -left
      relativeMoves = relativeMoves.concat(blackArrow(whiteKing, 0, -1));
    }
    if (rowAttacker < rowDefender && colAttacker < colDefender) {
      // witch direction the king is attacked -left up
      relativeMoves = relativeMoves.concat(blackArrow(whiteKing, -1, -1));
    }
    if (rowAttacker < rowDefender && colAttacker > colDefender) {
      // witch direction the king is attacked -left up
      relativeMoves = relativeMoves.concat(blackArrow(whiteKing, -1, 1));
    }
    if (rowAttacker > rowDefender && colAttacker > colDefender) {
      // witch direction the king is attacked -left down
      relativeMoves = relativeMoves.concat(blackArrow(whiteKing, 1, 1));
    }
    if (rowAttacker > rowDefender && colAttacker < colDefender) {
      // witch direction the king is attacked -right down
      relativeMoves = relativeMoves.concat(blackArrow(whiteKing, 1, -1));
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
  }
  whoCanEat(attacker) {
    let relativeMoves = [];
    if (this.player === WHITE_PLAYER) {
      if (attacker.type === PAWN) {
        relativeMoves = this.getPawnWRelativeMoves();
      } else if (attacker.type === KNIGHT) {
        relativeMoves = relativeMoves.concat(
          this.getWhiteKnightRelativeMoves()
        );
      } else if (attacker.type === QUEEN) {
        relativeMoves = relativeMoves.concat(this.getqueenRelativeMoves());
      }
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

  getPawnWRelativeMoves() {
    let result = [];
    let a = 0;
    result.push([1, 0]); //a 0
    let currentPiece = boardData.getPiece(
      this.row + result[0][0],
      this.col + result[0][1]
    );
    if (currentPiece !== undefined) {
      result.pop();
      a--;
    }
    if (this.row === 1) {
      result.push([2, 0]);
      a = result.length - 1;

      let currentPiece = boardData.getPiece(
        this.row + result[a][0],
        this.col + result[a][1]
      );
      if (currentPiece !== undefined || a === 0) {
        result.pop();
        a--;
      }
    }
    if (a === -1) {
      a++;
    }
    result.push([1, 1]);
    a = result.length - 1;
    if (result !== undefined) {
      currentPiece = boardData.getPiece(
        this.row + result[a][0],
        this.col + result[a][1]
      );
    }

    if (currentPiece !== undefined && currentPiece.player === WHITE_PLAYER) {
      result.pop();
      a--;
    } else if (currentPiece === undefined) {
      result.pop();
      a--;
    }

    result.push([1, -1]);
    a = result.length - 1;

    if (result !== undefined) {
      currentPiece = boardData.getPiece(
        this.row + result[a][0],
        this.col + result[a][1]
      );
    }

    if (currentPiece !== undefined && currentPiece.player === WHITE_PLAYER) {
      result.pop();
      a--;
    } else if (currentPiece === undefined) {
      result.pop();
      a--;
    }

    return result;
  }
  getPawnBRelativeMoves() {
    let result = [];
    let a = 0;
    result.push([-1, 0]);
    a = result.length - 1;

    let currentPiece = boardData.getPiece(
      this.row + result[0][0],
      this.col + result[0][1]
    );
    if (currentPiece !== undefined) {
      result.pop();
      a--;
    }
    if (this.row === 6) {
      result.push([-2, 0]);
      a = result.length - 1;

      let currentPiece = boardData.getPiece(
        this.row + result[a][0],
        this.col + result[a][1]
      );
      if (currentPiece !== undefined || a === 0) {
        result.pop();
        a--;
      }
    }
    if (a === -1) {
      a++;
    }
    result.push([-1, 1]);
    a = result.length - 1;

    if (result !== undefined) {
      currentPiece = boardData.getPiece(
        this.row + result[a][0],
        this.col + result[a][1]
      );
    }

    if (currentPiece !== undefined && currentPiece.player === BLACK_PLAYER) {
      result.pop();
      a--;
    } else if (currentPiece === undefined) {
      result.pop();
      a--;
    }
    result.push([-1, -1]);
    a = result.length - 1;

    if (result !== undefined) {
      currentPiece = boardData.getPiece(
        this.row + result[a][0],
        this.col + result[a][1]
      );
    }

    if (currentPiece !== undefined && currentPiece.player === BLACK_PLAYER) {
      result.pop();
      a--;
    } else if (currentPiece === undefined) {
      result.pop();
      a--;
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

    return result;
  }
  getWhiteKingRelativeMoves() {
    let possibleMoves = [];
    let whitemoves = [];

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
    let arr =[];
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
