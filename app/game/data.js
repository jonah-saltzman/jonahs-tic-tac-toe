const smallConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

const bigConditions = [
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19],
	[20, 21, 22, 23, 24],
	[0, 5, 10, 15, 20],
	[1, 6, 11, 16, 21],
	[2, 7, 12, 17, 22],
	[3, 8, 13, 18, 23],
	[4, 9, 14, 19, 24],
	[0, 6, 12, 18, 24],
	[4, 8, 12, 16, 20],
]

let previousGameSmall = false

const players = ['x', 'o']

const smallBoard = [null, null, null, null, null, null, null, null, null]

const bigBoard = [
    null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null
]

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
    small: true,
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

const clearBoards = () => {
    smallBoard.forEach((pos, index) => smallBoard[index] = null)
    bigBoard.forEach((pos, index) => (bigBoard[index] = null))
}

const resetGame = () => {
    previousGameSmall = gameInfo.small
    gameInfo.gameStarted = false
    gameInfo.gameID = null
    gameInfo.turn = null
    gameInfo.gameOver = null
    gameInfo.winner = null
    gameInfo.pvp = null
    gameInfo.easy = null
    gameInfo.lastMove = null
    gameInfo.small = true
    gameInfo.apiData.game.cell.index = null
    gameInfo.apiData.game.cell.value = null
    gameInfo.apiData.game.over = null

    smallBoard.forEach((pos, index) => (smallBoard[index] = null))
    bigBoard.forEach((pos, index) => (bigBoard[index] = null))
}

const startGame = (newGame, options) => {
    gameInfo.gameID = newGame ? newGame._id : false
    gameInfo.gameStarted = true
    gameInfo.turn = 0
    gameInfo.gameOver = false
    gameInfo.pvp = options.playerSelect === 'pvp'
    gameInfo.easy = options.difficulty === 'easy'
    gameInfo.small = options.boardSelect === 'three'
    gameInfo.moves = 0
}

const isDraw = () => {
    const board = gameInfo.small ? smallBoard : bigBoard
    if (board.every(position => position) && !checkWinner()) {
        gameInfo.gameOver = true
        gameInfo.apiData.game.over = true
        gameInfo.winner = 'draw'
        return true
    }
    return false
}

const addMove = (player, position) => {
    const board = gameInfo.small ? smallBoard : bigBoard
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
    const conditions = gameInfo.small ? smallConditions : bigConditions
    const board = gameInfo.small ? smallBoard : bigBoard
    const allWins = []
	for (const condition of conditions) {
        let addCondition = false
		for (let i = 0; i < condition.length; i++) {
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

const getSmallBoard = () => [...smallBoard]

const getBigBoard = () => [...bigBoard]

const isPVP = () => gameInfo.pvp

const isGameStarted = () => gameInfo.gameStarted

const isGameOver = () => gameInfo.gameOver

const isPrevGameSmall = () => previousGameSmall

const firstMoveMade = () => {
    const board = gameInfo.small ? smallBoard : bigBoard
    return board.some((position) => position !== null)
}

const getPlayer = () => gameInfo.turn

const isValidMove = (position) => {
    const board = gameInfo.small ? smallBoard : bigBoard
    return !(isGameOver() || board[position])
}

const getBoard = () => {
    const board = gameInfo.small ? smallBoard : bigBoard
    return [...board]
}

const getGameInfo = () => JSON.parse(JSON.stringify(gameInfo))

const isBoardSmall = () => gameInfo.small

const getWinInfo = () => {
    const board = gameInfo.small ? smallBoard : bigBoard
    return (gameInfo.winner === 'draw')
        ? ['draw', [...board]]
        : checkWinner(board, gameInfo.small 
            ? smallConditions 
            : bigConditions)
}

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
    isPVP,
    isBoardSmall,
    isPrevGameSmall,
    clearBoards,
    getSmallBoard,
    getBigBoard
}