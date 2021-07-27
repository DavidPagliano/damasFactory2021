/*Inicializar datos del juego,declaro matriz para representar tablero */
/*Se declaran 64 items array  que representan las celdas, los numeros hardcodeados son los ids de las piezas*/

var board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

/*parsea pieceId y retorna el lugar de la misma en el tablero */

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);

    
}



/* Establecer las variables para referenciar las cosas en el DOM */
/* Uso del metodo querySelectorAll para seleccionar todos los casilleros */
/* const redTurnText y const blueckTurntext para ver el turno del jugador*/
let cells = document.querySelectorAll("td");
let redsPieces = document.querySelectorAll("p");
let bluecksPieces = document.querySelectorAll("span")
const redTurnText = document.querySelectorAll(".red-turn-text");
const blueckTurntext = document.querySelectorAll(".blue-turn-text");
const divider = document.querySelector("#divider");

var player1= "Player 1";
var player2 ="Player 2";


/* Definir las propiedades del jugador  */
/* Definir variable turn para almacenar el turno del jugador actual*/
/*Definir variables redScore y blueScore para indicar el puntaje de cada jugador*/
/*Definir variable playerPieces para indicar piezas actuales*/
let turn = true;
let redScore = 0;
let blueScore = 0;
let playerPieces;
let PuntosCupHead = document.querySelector('#PuntosCupHead');
let PuntosMugman = document.querySelector('#PuntosMugman');



/*Datos al servidor */ 
var datos =[
player= null,
pieceId=null,
indexOfBoardPiece=null
]
var url = 'https://jsonplaceholder.typicode.com/posts'



/* Crear objeto con las propiedades de la pieza seleccionada*/
let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}


/*Inicializar Eventos Escucha*/
/*Crear funcion,con for iterar para detectar evento click */
function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < bluecksPieces.length; i++) {
            bluecksPieces[i].addEventListener("click", getPlayerPieces);
        }
    }

}


/*Si es el turno de rojo a playerPieces le asigno redPieces y sino es el turno le asigno a  */
/*Llamamos a la funcion removeCellonclick y la funcion resetBorders */
/* Inicio de la funciones en cadena*/
function getPlayerPieces() {
    if (turn) {
        playerPieces = redsPieces;
    } else {
        playerPieces = bluecksPieces;
    }
    removeCellonclick();
    resetBorders();
    
}

/* La funcion realiza loop,itera con un for todas las celdas en el tablero*/
/* Remueve para que el jugador pueda reelegir la pieza*/
function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}
/*La funcion le da un borde verde para mostrar que pieza se selecciona para mover */
/*Se llama a las funciones resetSelectedPieceProperties() y getSelectedPiece */
function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

/* La funcion reseta todas las propiedades del objeto  */
function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}


function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}

/* Funcion para saber si la pieza selecciona es un rey,usando la funcion classList.contains("king") */
function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}

/* Funcion para analizar las celdas disponibles para que la pieza seleccionada pueda ocupar dicho lugar */
/* Llamo a la funcion getAvailableSpaces,=== igualdad estricta*/
function getAvailableSpaces() {
    if (board[selectedPiece.indexOfBoardPiece + 7] === null && 
        cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.seventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null && 
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.ninthSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 7] === null && 
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 9] === null && 
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();
}

/* La funcion es similar a lo que hace la funcion getAvailableSpaces */
/* Llama a la funcion checkPieceCondition()*/
function checkAvailableJumpSpaces() {
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null 
        && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null 
        && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
            selectedPiece.minusEighteenthSpace = true;
        }
    } else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] < 12 && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] < 12 
        && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] < 12
        && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
            selectedPiece.minusEighteenthSpace = true;
        }
    }
    checkPieceConditions();
}
/* Si la pieza seleccionada es un rey , se restringe los movimientos minus para piezas rojas y azules */
/* Llama a la funcion givePieceBorder()*/
function checkPieceConditions() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        givePieceBorder();
    }
}

/* La funcion cuando la pieza es seleccionada se le da un borde con color, mostrando que jugador hace el movimiento*/
/*Sino se cumplen ninguna de las condiciones, o la pieza no tiene movieminto posible hace el return */ 
function givePieceBorder() {
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace
    || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid yellow";
        giveCellsClick();
    } else {
        return;
    }
}

/* La funcion permite a las celdas en el tablero darle evento onclick en base a los movimientos posibles*/
/* Si SelectedPiece es verdadero se le da el atributo */
function giveCellsClick() {
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
    }
}




/*La funcion makeMove() se invoca cuando celda es clickeada,luego que la pieza sea seleccionada */
/*Realiza movimiento que fue clickeado */
function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece king" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="blue-piece king" id="${selectedPiece.pieceId}"></span>`;
            bluecksPieces = document.querySelectorAll("span");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="blue-piece" id="${selectedPiece.pieceId}"></span>`;
            bluecksPieces = document.querySelectorAll("span");
        }
    }

    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

/* cambia nombre jugador*/ 
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            console.log(cells.removePiece);
            blueScore++
            console.log(blueScore);
            counterPoints();
            console.log(counterPoints);
           
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            redScore++
            console.log(redScore);
            counterPoints();
            console.log(counterPoints);
           
        }
    }
    resetSelectedPieceProperties();
    removeCellonclick();
    removeEventListeners();
}


function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < bluecksPieces.length; i++) {
            bluecksPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    checkForWin();
}

/*La funcion permite saber los puntos de cada jugador */
function checkForWin(){
    if (blueScore === counterPoints) {
    divider.style.display  = "none";
    for (let i = 0; i < redTurnText.length; i++) {
      redScore++;
      redTurnText[i].style.color = "black";
      blueckTurntext[i].style.display = "none"; 
      console.log(blueckTurntext[i]);
      if (redScore==12) {
        redTurnText[i].textContent = "BRAVO CupHead Wins"; 
      }
    
        
    }
    } else if (redScore === counterPoints) {
        divider.style.display = "none";
        for (let i = 0; i < blueckTurntext.length; i++) {
            blueScore++;
            blueckTurntext[i].style.color = "black";
            redTurnText[i].style.display = "none";
            console.log(redTurnText[i]);
            if (blueScore==12) {
            blueckTurntext[i].textContent = "BRAVO Mugman Wins";
            }
            
            
        }
    }
    
    changePlayer();
    }

/* Funcion para contar puntos*/
function counterPoints(){

if (getPlayerPieces) {
console.log(getPlayerPieces)

PuntosCupHead.innerHTML = blueScore;
console.log(blueScore);
}
if(getPlayerPieces)  {
    
    PuntosMugman.innerHTML = redScore;
    console.log(redScore);
}

}


function changePlayer() {
    if (turn) {
        turn = false;
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "lightGrey";
            blueckTurntext[i].style.color = "black";
        }
    } else {
        turn = true;
        for (let i = 0; i < blueckTurntext.length; i++) {
            blueckTurntext[i].style.color = "lightGrey";
            redTurnText[i].style.color = "black";
        }
    }
    givePiecesEventListeners();
    
}

//Creo la funcion para enviar por metodo fetch
function SendData(url, objFicha) {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
      console.log(objFicha);
  }

givePiecesEventListeners();

//localStorage

var SaveButton = document.getElementById('save')
var LoadButton = document.getElementById('load')

SaveButton.addEventListener('click', SaveCheckpoint)
LoadButton.addEventListener('click', LoadCheckpoint ) 

/* Para guardar */
function SaveCheckpoint() {
    let tablero = JSON.stringify(board)
    localStorage.setItem("board", tablero)
    localStorage.setItem("bluescore" , blueScore);
    localStorage.setItem("redscore", redScore);
    localStorage.setItem("Player 1", player1);
    localStorage.setItem("Player 2", player2);
    alert("Su partida ha sido guardada.");
   
}

/*Para cargar */ 
function LoadCheckpoint(){
    tablero = JSON.parse(localStorage.getItem("board"));
    board = tablero;
    LoadBoardData(board);
    blueScore = parseInt(localStorage.getItem("bluescore"));
    PuntosCupHead.innerHTML = blueScore;

    redScore = parseInt(localStorage.getItem("redscore"));
    PuntosMugman.innerHTML = redScore;
    alert("Su partida ha sido cargada");

     localStorage.getItem("Player 1");
     localStorage.getItem("Player 2");
    

    if ("board" && "bluescore" && "redscore" && "Player 1" && "Player 2" in localStorage) { 
        alert("Se encontro juego");
    }
   
  
}   // hacer un if que sino existe localStorage que le mande un mensaje que no existe partida guardada



/* Funcion para cargar y dibujar tablero*/ 
function LoadBoardData(board)
{
    var table = document.getElementById('table');
    table.innerHTML = "";
    for (let i = 0; i < 8; i++) {
       var row = document.createElement("tr");

        for (let j = 0; j < 8; j++) {
           var cell = document.createElement("td");

           var cellNumber = i*8+j
           var cellData = board[cellNumber];
           if (cellData == null) {
            if ((cellNumber % 2== 0 && i % 2 == 0) || (cellNumber % 2 == 1 && i % 2 == 1)) {
                cell.className = "noPieceHere";
                
            }
           
           
           } else{
               if (cellData >= 0  && cellData < 12) {
                   var span = document.createElement("span");
                   span.className = "red-piece";
                   span.id = cellData;
                   cell.appendChild(span);
                    
               }else{
                var span = document.createElement("span");
                   span.className = "blue-piece";
                   span.id = cellData;
                   cell.appendChild(span);
                  
               }
           }
           
           row.appendChild(cell);
            
        }
       table.appendChild(row);
        
    }
    
   
}


var loadSavedGamesData = function() {
    listSection = arrGameLI.slice(start, end);

    for(var i = 0; i < savedGames.length; i++) {
        p1HTML[i].innerHTML = savedGames[i].p1.name;
        p2HTML[i].innerHTML = savedGames[i].p2.name;
        if(savedGames[i].p3 != null) {
            p3HTML[i].className = 'game-info p3';
            p3HTML[i].innerHTML = savedGames[i].p3.name;
        }
        dateHTML[i].innerHTML =  savedGames[i].date;
    }

    for(var l = 0; l < savedGames.length; l++) {
        gameLI[l].className = 'game hidden';
    }

    for(var j = 0; j < listSection.length; j++) {
        listSection[j].className = 'game';
    }
    displayButtons();
}


//Funcion para cambiar nombre jugadores
function editNames(){
    player1 = prompt("Player One enter your name");
    player2 = prompt("Player Two enter your name");

    document.querySelector("p.Player1").innerHTML = player1;
    document.querySelector("p.Player2").innerHTML = player2;

}
