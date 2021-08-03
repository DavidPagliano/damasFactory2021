//Constantes

//tipo de espacio
const notPlayableSpace = -1; //espacio no jugable
const emptySpace = 0; //espacio vacio

//tipos de ficha
const redPlayerID = 1; //identificacion para jugador rojo
const bluePlayerID = 2; //identificacion para jugador azul
const invalidPlayerID = 3; //identificacion invalida

//dimensiones del tablero de 2 jugadores
const maxRows = 8;
const maxColumns = 8;

//Clases


//Variables

/*let mainBoard = [
    [-1,0,-1,0,-1,0,-1,0],
    [0,-1,0,-1,0,-1,0,-1],
    [-1,0,-1,0,-1,0,-1,0],
    [0,-1,0,-1,0,-1,0,-1],
    [-1,0,-1,0,-1,0,-1,0],
    [0,-1,0,-1,0,-1,0,-1],
    [-1,0,-1,0,-1,0,-1,0],
    [0,-1,0,-1,0,-1,0,-1]
];*/
var mainBoard = [];

//Eventos

window.onload = startGame();


//Funciones

function startGame() {
    mainBoard = newBoard(mainBoard);
    mainBoard = putPiecesDefaultPosition(mainBoard);

    drawBoard(mainBoard);

    console.log(mainBoard);
}

function drawBoard(board) {
    var table = document.getElementById('table');

    for (let i = 0; i < maxRows; i++) {
        var tr = document.createElement("tr");
        for (let j = 0; j < maxColumns; j++) {
            var td = document.createElement("td");

            if (board[i][j] == notPlayableSpace) {
                td.className = "noPieceHere";
            } else {
                let identity = getPieceIdentity(board[i][j]);
                switch (identity) {
                    case redPlayerID:
                        var span = document.createElement("span");
                        span.className = "red-piece";
                        span.id = board[i][j];
                        td.appendChild(span);
                        break;
                    case bluePlayerID:
                        var span = document.createElement("span");
                        span.className = "blue-piece";
                        span.id = board[i][j];
                        td.appendChild(span);
                        break;
                    default:

                        break;
                }
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function checkBoardIntegrity(board) //terminar
{
    let length = board.length;

    if (!board.isArray()) return "Tablero inválido";
    if (length != 8) return "Tablero inválido";

    for (let i = 0; i < length; i++) {
        let rowLength = board[i].length;
        let rowModule = i % 2; //obtengo resto de i dividido 2 para saber si es par o no

        if (!board[i].isArray()) return "Tablero inválido";
        if (rowLength != 8) return "Tablero inválido";

        for (let j = 0; j < rowLength; i++) {
            let columnModule = j % 2;
            let identity = getPieceIdentity(board[i][j]);
            if (board[i][j] != notPlayableSpace &&
                board[i][j] != emptySpace &&
                getPieceIdentity(board[i][j]) == invalidPlayerID) //si no es ninguna de las fichas validas
            {
                return i + " " + j + " ficha inválida. Valor: " + board[i][j];
            }
            if (rowModule == 0) {
                if (columnModule == 0 && board[i][j] != notPlayableSpace) {
                    return i + " " + j + " ficha inválida. Valor: " + board[i][j] + ". Debería ser ficha no jugable.";
                } else if (columnModule != 0 && (board[i][j] == notPlayableSpac || getPieceIdentity(board[i][j]) == invalidPlayerID)) {

                }
            } else {
                if (columnModule == 0 && board[i][j] != notPlayableSpace) {
                    return i + " " + j + " ficha inválida. Valor: " + board[i][j] + ". Debería ser ficha no jugable.";
                }
            }
        }
    }
}

function newBoard(board) //genera array de tablero vacio
{
    board = new Array(); //initializa tablero

    for (let i = 0; i < maxRows; i++) {
        let rowModule = i % 2; //obtengo resto de i dividido 2 para saber si es par o no
        let row = new Array();
        for (let j = 0; j < maxColumns; j++) {
            let columnModule = j % 2; //obtengo resto de j dividido 2 para saber si es par o no
            let piece;

            if (rowModule == 0) // si la fila es par, la division devuelve resto 0
            {
                if (columnModule == 0) //si la columna es par, la division devuelve resto 0
                {
                    piece = notPlayableSpace;
                } else //si la columna es impar, la division devuelve resto 1
                {
                    piece = emptySpace;
                }
            } else //si la fila es impar, la division devuelve resto 1
            {
                if (columnModule == 0) //si la columna es par, la division devuelve resto 0
                {
                    piece = emptySpace;
                } else //si la columna es impar, la division devuelve resto 1
                {
                    piece = notPlayableSpace;
                }
            }
            row.push(piece);
        }
        board.push(row);
    }

    return board; //devolvemos el tablero creado vacio
}

function putPiecesDefaultPosition(board) //llena un array vacio
{
    let pieceCount = 1;
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < maxColumns; j++) {
            if (((i > -1 && i < 3) || (i < 8 && i > 4)) && board[i][j] == emptySpace) {
                board[i][j] = pieceCount;
                pieceCount++;
            }
        }
    }
    return board;
}

function getPieceIdentity(number) {
    if (number > 0 && number < 13)
        return redPlayerID;
    else if (number > 12 && number < 25)
        return bluePlayerID;
    else
        return invalidPlayerID;
}