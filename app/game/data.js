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
    gameOver: null,
    winner: null,
    apiData: {
        game: {
            cell: {
                index: null,
                value: null
            },
            over: null
        }
    }
}

const firstMoveMade = () => {
    return board.some(position => position !== null)
}

const resetGame = () => {
    board.forEach((pos, index) => board[index] = null)
    gameInfo.gameStarted = false
    gameInfo.gameID = null
    gameInfo.turn = null
    gameInfo.gameOver = null
    gameInfo.winner = null
    gameInfo.apiData.game.cell.index = null
    gameInfo.apiData.game.cell.value = null
    gameInfo.apiData.game.over = null
    console.log(`after resetGame(): `, gameInfo)
    console.log(board)
}

const players = ['x', 'o']

const board = [null, null, null, null, null, null, null, null, null]

const startGame = (newGame) => {
    gameInfo.gameStarted = true
    gameInfo.gameID = newGame._id
    gameInfo.turn = 0
    gameInfo.gameOver = false
    console.log('new game: ', gameInfo)
}

const isGameStarted = () => {
    return gameInfo.gameStarted
}

const printBoard = () => {
    console.log(board)
}

const isGameOver = () => {
    return gameInfo.gameOver
}

const getPlayer = () => {
    return gameInfo.turn
}

const updateGameOver = () => {
    if (checkWinner() || isDraw()) gameInfo.gameOver = true, gameInfo.apiData.game.over = true
    else gameInfo.gameOver = false, gameInfo.apiData.game.over = false
}

const isDraw = () => {
    if (board.every(position => position !== null) && !checkWinner()) {
        console.log(`isDraw(): true`)
        gameInfo.gameOver = true
        gameInfo.apiData.game.over = true
        gameInfo.winner = 'draw'
        return true
    }
    console.log(`isDraw(): false`)
    return false
}

const isPlayerTurn = player => {
    if (player === gameInfo.turn) return true
    return false
}

const isValidMove = (player, position) => {
    // updateGameOver()
    if (isGameOver() || board[position] || !isPlayerTurn(player)) {
        return false
    }
    return true
}

const addMove = (player, position) => {
    board[position] = players[player]
    gameInfo.turn === 0 ? (gameInfo.turn = 1) : (gameInfo.turn = 0)
    if (checkWinner() || isDraw()) gameInfo.gameOver = true, gameInfo.apiData.game.over = true
    gameInfo.apiData.game.cell.index = position
    gameInfo.apiData.game.cell.value = players[player]
    if (isDraw()) {
        console.log(`addMove: draw`)
        gameInfo.winner = 'draw'
    }
}

function checkWinner() {
    const allWins = []
	for (const condition of conditions) {
        let addCondition = false
		for (let i = 0; i < 3; i++) {
			if (
				board[condition[i]] &&
				condition.every((pos) => board[pos] === board[condition[0]])
			) {
                gameInfo.winner = board[condition[0]]
                gameInfo.gameOver = true
                gameInfo.apiData.game.over = true
                addCondition = true
			}
		}
        if (addCondition) allWins.push(condition)
	}
    console.log(`allWins[]: `, allWins)
    return allWins.length ? [board[allWins[0]], allWins] : false
}

const getBoard = () => {
    return board
}

const getGameInfo = () => {
    return gameInfo
}

const getWinInfo = () => {
    if (gameInfo.winner === 'draw') return ['draw', board]
    return checkWinner(board, conditions)
}

const getGameApiData = () => {
    return gameInfo
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
    getWinInfo,
    getGameApiData,
    resetGame,
    firstMoveMade
}