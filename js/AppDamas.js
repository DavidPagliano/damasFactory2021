
const notPlayableSpace = -1;
const emptySpace = 0;
const redPlayerID = 1;
const bluePlayerID = 2;

let mainBoard = [
    [-1,0,-1,0,-1,0,-1,0],
    [0,-1,0,-1,0,-1,0,-1],
    [-1,0,-1,0,-1,0,-1,0],
    [0,-1,0,-1,0,-1,0,-1],
    [-1,0,-1,0,-1,0,-1,0],
    [0,-1,0,-1,0,-1,0,-1],
    [-1,0,-1,0,-1,0,-1,0],
    [0,-1,0,-1,0,-1,0,-1]
];

windows.onload = startGame();


function startGame()
{
    
}

function drawBoard()
{

}

function checkBoardIntegrity(board)
{
    let length = board.length;

    if(!board.isArray()) return "Tablero inválido";
    if(length != 8) return "Tablero inválido";

    for(let i = 0; i < length; i++)
    {
        let itemLength = board[i].length;
        let itemModule = i % 2;

        if(!board[i].isArray()) return "Tablero inválido";
        if(itemLength != 8) return "Tablero inválido";
        
        for(let j = 0; j < itemLength; i++)
        {
            if(board[i][j] != notPlayableSpace 
                && board[i][j] != emptySpace
                && board[i][j] != redPlayerID
                && board[i][j] != bluePlayerID )
                {
                    
                }
        }
    }
}