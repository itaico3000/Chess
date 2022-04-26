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
    removePiece(type, player) {
      let a = boardData.getpiecebytype(type, player);
      for (const i of this.pieces) {
        if (a === i) {
          this.pieces.splice(this.pieces.indexOf(i), 1);
        }
      }
    }
    removeDuplicates() {
      for (let i = 0; i < this.pieces.length; i++) {
        const element = this.pieces[i];
        for (let j = 0; j < this.pieces.length; j++) {
          const element2 = this.pieces[j];
          if (element === element2) {
            this.removePiece(element2);
          }
        }
      }
    }
  
    changeLocation(row, col, lastrow, lastcol, lastype, lastplayer) {
      let remove = this.getPiece(lastrow, lastcol);
      if (remove) {
      }
      this.pieces.push(new Piece(row, col, lastype, lastplayer));
  
      this.pieces.splice(this.pieces.indexOf(remove), 1);
  
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