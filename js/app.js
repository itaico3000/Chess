// Add all pieces to the board "from js list"
// When user clicks, show possible movements by a different color, without worrying about other pieces (as if the piece was along on the board).

const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';

let selectedCell;
let pieces = [];

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }
}



function getInitialBoard() {
  let result = [];
  result.push(new Piece(0, 0, "rook", WHITE_PLAYER));
  result.push(new Piece(0, 7, "rook", WHITE_PLAYER));
  result.push(new Piece(0, 1, "knight", WHITE_PLAYER));
  result.push(new Piece(0, 6, "knight", WHITE_PLAYER));
  result.push(new Piece(0, 2, "bishop", WHITE_PLAYER));
  result.push(new Piece(0, 5, "bishop", WHITE_PLAYER));
  result.push(new Piece(0, 3, "queen", WHITE_PLAYER));
  result.push(new Piece(0, 4, "king", WHITE_PLAYER));
  for (let index = 0; index < 8; index++) {
    result.push(new Piece(1, index, "pawn", WHITE_PLAYER));
  }
  
  result.push(new Piece(7, 0, "rook", DARK_PLAYER));
  result.push(new Piece(7, 7, "rook", DARK_PLAYER));
  result.push(new Piece(7, 1, "knight", DARK_PLAYER));
  result.push(new Piece(7, 6, "knight", DARK_PLAYER));
  result.push(new Piece(7, 2, "bishop", DARK_PLAYER));
  result.push(new Piece(7, 5, "bishop", DARK_PLAYER));
  result.push(new Piece(7, 3, "queen", DARK_PLAYER));
  result.push(new Piece(7, 4, "king", DARK_PLAYER));
  for (let index = 0; index < 8; index++) {
    result.push(new Piece(6, index, "pawn", DARK_PLAYER));
  }

  return result;
}

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  image.id=player+'-'+name;
  
  cell.appendChild(image);
}

function addImageByIndex(cell, player, index) {
  if (index === 0 || index === 7) {
    addImage(cell, player, 'rook');
  } else if (index === 1 || index === 6) {
    addImage(cell, player, 'knight');
  } else if (index === 2 || index === 5) {
    addImage(cell, player, 'bishop');
  } else if (index === 3) {
    addImage(cell, player, 'king');
  } else if (index === 4) {
    addImage(cell, player, 'queen');
  }
}

function onCellClick(event) {
  if (selectedCell !== undefined&&arr!==null) {
    selectedCell.classList.remove('selected');
    for (const i of arr) {
      i.classList.remove('selectedoptions');
    }
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
  arr= moveSoliderOptions(selectedCell);//current possible moves
  for (const i of arr) {
    i.classList.add('selectedoptions');
  }

}

function moveSoliderOptions(event){ 
  let id = event.id;//0-0 id of cell
  let child = event.firstChild; // = img = #white-rook
  let arr= [];
  let row = Number(id.split('-')[0]); // row = 0 (num) 
  let col = Number(id.split('-')[1]); // col = 0 (num)
  let childname =null; //rook queen 
  let childplayer =null; // dark or white
  if(child!==null){ //if empty cell
    childname=child.id.split('-')[1]; //rook 
   childplayer=child.id.split('-')[0]; // white
  console.log(row + "  " + col+ ' ' + childplayer + ' ' +childname);
  }
 
  if (childname==='queen') {
    arr=queenmove(row,col,childname ,childplayer); //check valid moves of queen
  }
  if (childname==='king') {
    arr=kingmove(row,col,childname ,childplayer); //check valid moves of king
  }
  if (childname==='bishop') {
    arr=bishopmove(row,col,childname ,childplayer);//check valid moves of bishop
  }
  if (childname==='knight') {
    arr=knightmove(row,col,childname ,childplayer);//check valid moves of knight
  }
  if (childname==='rook') {
    arr=rookmove(row,col,childname ,childplayer);//
  }
  if (childname==='pawn') {
    arr=pawnsmove(row,col,childname ,childplayer);//check valid moves of pawns
  }
 return arr;

}
function kingmove(row ,col,name , player) {
  const movearr= [];
 let  a = true;
  
  
   if (name==='king') {
     
   
    if (document.getElementById((row)+'-'+(col-1))!==null){//one left

    
    movearr.push(document.getElementById((row)+'-'+(col-1)))} // one left

    if (document.getElementById((row)+'-'+(col+1))!==null){//one right

    
      movearr.push(document.getElementById((row)+'-'+(col+1)))} // one right
  
      if (document.getElementById((row+1)+'-'+(col))!==null){//one up

    
        movearr.push(document.getElementById((row+1)+'-'+(col)))} // one up
        if (document.getElementById((row+1)+'-'+(col+1))!==null){//one up one-right

    
          movearr.push(document.getElementById((row+1)+'-'+(col+1)))} // one up one-right
          if (document.getElementById((row+1)+'-'+(col-1))!==null){//one up one-right

    
            movearr.push(document.getElementById((row+1)+'-'+(col-1)))} // one up one-right
      
            if (document.getElementById((row-1)+'-'+(col))!==null){//one down

    
              movearr.push(document.getElementById((row-1)+'-'+(col)))} // one down
              if (document.getElementById((row-1)+'-'+(col+1))!==null){//one up one-right
      
          
                movearr.push(document.getElementById((row-1)+'-'+(col+1)))} // one up one-right
                if (document.getElementById((row-1)+'-'+(col-1))!==null){//one up one-right
      
          
                  movearr.push(document.getElementById((row-1)+'-'+(col-1)))} // one up one-right
                
          return movearr;
                }
}
  
  
  






function knightmove(row ,col,name , player) {
  const movearr= [];
 let  a = true;
  if (name==='knight') {
  
   
    if (document.getElementById((row+2)+'-'+(col+1))!==null){

    
    movearr.push(document.getElementById((row+2)+'-'+(col+1)))} // one left two up
    if (document.getElementById((row+2)+'-'+(col-1))!==null)
     {
      movearr.push(document.getElementById((row+2)+'-'+(col-1))) //one right two up
    }
    if (document.getElementById((row-2)+'-'+(col-1))!==null){

    
      movearr.push(document.getElementById((row-2)+'-'+(col-1)))} // one left two down
      if (document.getElementById((row-2)+'-'+(col+1))!==null)
       {
        movearr.push(document.getElementById((row-2)+'-'+(col+1))) //one right two down
      }
      if (document.getElementById((row+1)+'-'+(col-2))!==null){

    
        movearr.push(document.getElementById((row+1)+'-'+(col-2)))} //two left one down
        if (document.getElementById((row-1)+'-'+(col+2))!==null)
         {
          movearr.push(document.getElementById((row-1)+'-'+(col+2))) //two right one down
        }
        if (document.getElementById((row+1)+'-'+(col+2))!==null){

    
          movearr.push(document.getElementById((row+1)+'-'+(col+2)))} //two right one up

          if (document.getElementById((row+1)+'-'+(col-2))!==null)
           {
            movearr.push(document.getElementById((row-1)+'-'+(col-2))) //two left one down
          }
  
  
          return movearr;
}
  
  
  
}

function pawnsmove(row ,col,name , player) {
  const movearr= [];
 let  a = true;
  if (name==='pawn') {
    
  
  if (player==='white') {
    
  
  if (row ===1) { //start
    movearr.push(document.getElementById((row+1)+'-'+col)); // one up
    movearr.push(document.getElementById((row+2)+'-'+col)); // two up
    
      
    
    if (document.getElementById((row+1)+'-'+(col+1))!==null){

    
    movearr.push(document.getElementById((row+1)+'-'+(col+1)))} // one left
    if (document.getElementById((row+1)+'-'+(col-1))!==null)
     {
      movearr.push(document.getElementById((row+1)+'-'+(col-1)))
    }// one right
   }
  else{ movearr.push(document.getElementById((row+1)+'-'+col)); // one up
    if (document.getElementById((row+1)+'-'+(col+1))!==null){

    
    movearr.push(document.getElementById((row+1)+'-'+(col+1)))} // one left
    if (document.getElementById((row+1)+'-'+(col-1))!==null)
     {
      movearr.push(document.getElementById((row+1)+'-'+(col-1))) //one right
    }
  }
  }
  if (player==='dark') {
    
  
    if (row ===6) { //start
      movearr.push(document.getElementById((row-1)+'-'+col)); // one down
      movearr.push(document.getElementById((row-2)+'-'+col)); // two down
      
        
      
      if (document.getElementById((row-1)+'-'+(col+1))!==null){
  
      
      movearr.push(document.getElementById((row-1)+'-'+(col+1)))} // one left
      if (document.getElementById((row-1)+'-'+(col-1))!==null)
       {
        movearr.push(document.getElementById((row-1)+'-'+(col-1)))
      }// one right
     }
    
     
else{ movearr.push(document.getElementById((row-1)+'-'+col)); // one down
if (document.getElementById((row-1)+'-'+(col+1))!==null){


movearr.push(document.getElementById((row-1)+'-'+(col+1)))} // one left
if (document.getElementById((row-1)+'-'+(col-1))!==null)
 {
  movearr.push(document.getElementById((row-1)+'-'+(col-1))) //one right
}
}
    }
    return movearr;
}
  
  
  
}
function queenmove(row ,col,name,player) {
  const movearr= [];
 
 
    
 
      for (let i = 1; i < 8; i++) {
        if (document.getElementById((row)+'-'+(col-i))===null) {//only left
          break
        }
        movearr.push(document.getElementById((row)+'-'+(col-i)))
        }
        for (let i = 1; i < 8; i++) {
          if (document.getElementById((row+i)+'-'+(col))===null) { // only down
            break
          }
          movearr.push(document.getElementById((row+i)+'-'+(col)))
          }
          for (let i = 1; i < 8; i++) {
            if (document.getElementById((row)+'-'+(col+i))===null) {//only right
              break
            }
            movearr.push(document.getElementById((row)+'-'+(col+i)))
            }
            for (let i = 1; i < 8; i++) {
              if (document.getElementById((row-i)+'-'+(col))===null) {//only up
                break
              }
              movearr.push(document.getElementById((row-i)+'-'+(col)))
              }
              for (let i = 1; i < 8; i++) {
                if (document.getElementById((row+i)+'-'+(col+i))===null) {
                  break
                }
              movearr.push(document.getElementById((row+i)+'-'+(col+i)))
              }
              for (let i = 1; i < 8; i++) {
                if (document.getElementById((row+i)+'-'+(col-i))===null) {
                  break
                }
                movearr.push(document.getElementById((row+i)+'-'+(col-i)))
                }
                for (let i = 1; i < 8; i++) {
                  if (document.getElementById((row-i)+'-'+(col-i))===null) {
                    break
                  }
                  movearr.push(document.getElementById((row-i)+'-'+(col-i)))
                  }
                  for (let i = 1; i < 8; i++) {
                    if (document.getElementById((row-i)+'-'+(col+i))===null) {
                      break
                    }
                    movearr.push(document.getElementById((row-i)+'-'+(col+i)))
                    }
      
  
 return movearr;
  
 
      
}




  




function rookmove(row ,col,name,player) {
  const movearr= []; //shows me possibilities of rook
 
  
    
 
      for (let i = 1; i < 8; i++) { //0-0
        if (document.getElementById((row)+'-'+(col-i))===null) {//only left
          break
        }
        movearr.push(document.getElementById((row)+'-'+(col-i)))
        }
        for (let i = 1; i < 8; i++) {
          if (document.getElementById((row+i)+'-'+(col))===null) { // only down
            break
          }
          movearr.push(document.getElementById((row+i)+'-'+(col)))
          }
          for (let i = 1; i < 8; i++) {
            if (document.getElementById((row)+'-'+(col+i))===null) {//only right
              break
            }
            movearr.push(document.getElementById((row)+'-'+(col+i)))//0-1 0-2 0-3 0-4 0-5 0-6 0-7 
            }
            for (let i = 1; i < 8; i++) {
              if (document.getElementById((row-i)+'-'+(col))===null) {//only up
                break
              }
              movearr.push(document.getElementById((row-i)+'-'+(col)))
              }

              
          
      
  
 return movearr;
  
 
      
}


  function bishopmove(row ,col,childname ,childplayer) {
    const movearr= [];
   
    if (childname==='bishop') {
      if (childplayer==='light') {
        
      
    
    if (document.getElementById((row)+'-'+(col+3))=== null) {
      for (let i = 1; i < 8; i++) {
        if (document.getElementById((row+i)+'-'+(col+i))===null) {
          break
        }
      movearr.push(document.getElementById((row+i)+'-'+(col+i)))
      }
      for (let i = 1; i < 8; i++) {
        if (document.getElementById((row+i)+'-'+(col-i))===null) {
          break
        }
        movearr.push(document.getElementById((row+i)+'-'+(col-i)))
        }
    }
    else if (document.getElementById((row)+'-'+(col-3))=== null){
  
      for (let i = 1; i < 8; i++) {
        if (document.getElementById((row+i)+'-'+(col+i))===null) {
          break
        }
      movearr.push(document.getElementById((row+i)+'-'+(col+i)))
      }
      for (let i = 1; i < 8; i++) {
        if (document.getElementById((row+i)+'-'+(col-i))===null) {
          break
        }
        movearr.push(document.getElementById((row+i)+'-'+(col-i)))
        }
     }
    }
     else{
      
      for (let i = 1; i < 8; i++) {
        if (document.getElementById((row+i)+'-'+(col+i))===null) {
          break
        }
      movearr.push(document.getElementById((row+i)+'-'+(col+i)))
      }
      for (let i = 1; i < 8; i++) {
        if (document.getElementById((row+i)+'-'+(col-i))===null) {
          break
        }
        movearr.push(document.getElementById((row+i)+'-'+(col-i)))
        }
        for (let i = 1; i < 8; i++) {
          if (document.getElementById((row-i)+'-'+(col-i))===null) {
            break
          }
          movearr.push(document.getElementById((row-i)+'-'+(col-i)))
          }
          for (let i = 1; i < 8; i++) {
            if (document.getElementById((row-i)+'-'+(col+i))===null) {
              break
            }
            movearr.push(document.getElementById((row-i)+'-'+(col+i)))
            }
        
     }
     return movearr;
    }
    
    
    }
  
  



function createChessBoard() {
  const table1 = document.createElement('table');
  document.body.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table1.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = row.insertCell();
      cell.id =i.toString() + "-" + j.toString();
      
      if ((i + j) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', onCellClick);
      

    }
  }
  pieces = getInitialBoard();

  for (let piece of pieces) {
    addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener('load', createChessBoard);


