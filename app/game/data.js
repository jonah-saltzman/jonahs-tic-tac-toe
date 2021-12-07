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

const players = ['x', 'o']

const board = [null, null, null, null, null, null, null, null, null]

const gameInfo = {
    gameStarted: false,
    gameID: null,
    turn: null,
    gameOver: null,
    winner: null,
    moves: null,
    pvp: null,
    easy: null,
    lastMove: null,
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

const resetGame = () => {
    board.forEach((pos, index) => board[index] = null)
    gameInfo.gameStarted = false
    gameInfo.gameID = null
    gameInfo.turn = null
    gameInfo.gameOver = null
    gameInfo.winner = null
    gameInfo.pvp = null
    gameInfo.easy = null
    gameInfo.lastMove = null
    gameInfo.apiData.game.cell.index = null
    gameInfo.apiData.game.cell.value = null
    gameInfo.apiData.game.over = null
}

const startGame = (newGame, options) => {
    gameInfo.gameStarted = true
    gameInfo.gameID = newGame._id
    gameInfo.turn = 0
    gameInfo.gameOver = false
    gameInfo.pvp = options.playerSelect === 'pvp'
    gameInfo.easy = options.difficulty === 'easy'
    gameInfo.moves = 0
}

const isDraw = () => {
    if (board.every(position => position) && !checkWinner()) {
        gameInfo.gameOver = true
        gameInfo.apiData.game.over = true
        gameInfo.winner = 'draw'
        return true
    }
    return false
}

const addMove = (player, position) => {
    gameInfo.moves++
    board[position] = players[player]
    gameInfo.turn === 0 ? (gameInfo.turn = 1) : (gameInfo.turn = 0)
    gameInfo.apiData.game.cell.index = position
    gameInfo.apiData.game.cell.value = players[player]
    gameInfo.lastMove = position
    if (checkWinner() || isDraw())
        gameInfo.gameOver = true, gameInfo.apiData.game.over = true
    if (isDraw())
        gameInfo.winner = 'draw'
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
        if (addCondition)
            allWins.push(condition)
	}
    return (allWins.length) ? [board[allWins[0]], allWins] : false
}

const isPVP = () => gameInfo.pvp

const isGameStarted = () => gameInfo.gameStarted

const isGameOver = () => gameInfo.gameOver

const firstMoveMade = () => board.some((position) => position !== null)

const getPlayer = () => gameInfo.turn

const isValidMove = (position) => !(isGameOver() || board[position])

const getBoard = () => board

const getGameInfo = () => gameInfo

const getWinInfo = () => (gameInfo.winner === 'draw')
                            ? ['draw', [...board]]
                            : checkWinner(board, conditions)        

module.exports = {
    isGameOver,
    isValidMove,
    getPlayer,
    addMove,
    isGameStarted,
    startGame,
    getBoard,
    getGameInfo,
    getWinInfo,
    resetGame,
    firstMoveMade,
    isPVP
}