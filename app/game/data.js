const conditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

const gameInfo = {
    gameStarted: false,
    gameID: null,
    turn: null,
    gameOver: null
}

const players = ['x', 'o']

const board = [null, null, null, null, null, null, null, null, null]

const startGame = (newGame) => {
    console.log(newGame)
    gameInfo.gameStarted = true
    gameInfo.gameID = newGame._id
    gameInfo.turn = 0
    gameInfo.gameOver = false
    console.log(gameInfo)
}

const isGameStarted = () => {
    return gameInfo.gameStarted
}

const printBoard = () => {
    console.log(board)
}

const isGameOver = () => {
    updateGameOver()
    return gameInfo.gameOver
}

const getPlayer = () => {
    return gameInfo.turn
}

const updateGameOver = () => {
    if (checkWinner()) gameInfo.gameOver = true
    else gameInfo.gameOver = false
}

const isPlayerTurn = player => {
    if (player === gameInfo.turn) return true
    return false
}

const isValidMove = (player, position) => {
    updateGameOver()
    if (isGameOver() || board[position] || !isPlayerTurn(player)) {
        console.log(`isValidMove(): false`)
        return false
    } 
    console.log(`isValidMove(): true`)
    return true
}

const addMove = (player, position) => {
    board[position] = players[player]
    gameInfo.turn === 0 ? (gameInfo.turn = 1) : (gameInfo.turn = 0)
    if (checkWinner()) gameOver = true
}

function checkWinner() {
	for (const condition of conditions) {
		for (let i = 0; i < 3; i++) {
			if (
				board[condition[i]] &&
				condition.every((pos) => board[pos] === board[condition[0]])
			) {
                console.log(`game is over`)
				return [board[condition[0]], condition]
			}
		}
	}
    console.log(`checkwinner: gameisover=false`)
	return false
}

const getBoard = () => {
    return board
}

const getGameInfo = () => {
    return gameInfo
}

const getWinInfo = () => {
    return checkWinner()
}

module.exports = {
    printBoard,
    isGameOver,
    updateGameOver,
    isValidMove,
    getPlayer,
    addMove,
    isGameStarted,
    gameInfo,
    startGame,
    getBoard,
    getGameInfo,
    getWinInfo
}