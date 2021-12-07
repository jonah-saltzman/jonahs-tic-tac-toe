const alg = {
    wins: 0,
    losses: 0,
    draws: 0
}

function minMaxDriver(board, playerIndex) {
    alg.wins = 0
    alg.losses = 0
    alg.draws = 0
	const player = playerIndex === 0 ? 'x' : 'o'
	const bestMoves = findBestMove(board, player)
	return bestMoves
}

function getMinMaxInfo() {
    return alg
}

function findBestMove(board, player) {
	const _PLAYER = player
	const _OPPONENT = _PLAYER === 'x' ? 'o' : 'x'
	const moves = board
		.map((position, index, board) => {
			if (!position) {
				const newBoard = [...board]
				newBoard[index] = _PLAYER
				return {
					move: {
						player: _PLAYER,
						toIndex: index,
					},
					score: minMax(newBoard, 0, false, _PLAYER, _OPPONENT),
				}
			}
		})
		.filter((board) => board)

	const bestMoveScore = moves.reduce((highScore, move) => {
		return move.score > highScore ? move.score : highScore
	}, Number.NEGATIVE_INFINITY)

	return moves.filter((move) => move.score === bestMoveScore)
}

function minMax(board, depth, isMaximizer, _PLAYER, _OPPONENT) {
	const score = evaluateBoard(board, _PLAYER, _OPPONENT)
	if (score) {
		return score > 0 
			? score - depth 
			: score + depth
	}
	if (isGameOver(board)) {
		return 0
	}

	if (isMaximizer) {
		return generateBoards(board, _PLAYER).reduce((maxScore, currentBoard) => {
			const boardScore = minMax(
				currentBoard,
				depth + 1,
				!isMaximizer,
				_PLAYER,
				_OPPONENT
			)
			return boardScore > maxScore ? boardScore : maxScore
		}, Number.NEGATIVE_INFINITY)
	} else {
		return generateBoards(board, _OPPONENT).reduce((minScore, currentBoard) => {
			const boardScore = minMax(
				currentBoard,
				depth + 1,
				!isMaximizer,
				_PLAYER,
				_OPPONENT
			)
			return boardScore < minScore ? boardScore : minScore
		}, Number.POSITIVE_INFINITY)
	}
}

function generateBoards(board, mover) {
	const boards = []
	board.forEach((position, index) => {
		const newBoard = [...board]
		if (!position) {
			newBoard[index] = mover
			boards.push(newBoard)
		}
	})
	return boards
}

function evaluateBoard(board, _PLAYER, _OPPONENT) {
	if (
		conditions.some((condition) =>
			condition.every((pos) => board[pos] === _PLAYER)
		)
	) {
        alg.wins++
		return 10
	}
	if (
		conditions.some((condition) =>
			condition.every((pos) => board[pos] === _OPPONENT)
		)
	) {
        alg.losses++
		return -10
	}
	return 0
}

function isGameOver(board) {
	if (board.every((position) => position)) {
        alg.draws++
        return true
    }
    return false
}

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

module.exports = {minMaxDriver, getMinMaxInfo}