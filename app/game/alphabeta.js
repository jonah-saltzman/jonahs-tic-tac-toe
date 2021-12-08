const alg = {
	wins: 0,
	losses: 0,
	draws: 0,
	moves: 0
}

function alphaBetaDriver(board, playerIndex) {
	alg.wins = 0
	alg.losses = 0
	alg.draws = 0
	alg.moves = 0
	return new Promise((resolve, reject) => {
		const player = playerIndex === 0 ? 'x' : 'o'
		const bestMoves = findBestMove(board, player)
		if (bestMoves.length) {
			resolve(bestMoves)
		} else {
			reject('error')
		}
	})
}

function getABInfo() {
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
					score: minMax(
						newBoard,
						0,
						false,
						_PLAYER,
						_OPPONENT,
						Number.NEGATIVE_INFINITY,
						Number.POSITIVE_INFINITY
					),
				}
			}
		})
		.filter((board) => board)

	const bestMoveScore = moves.reduce((highScore, move) => {
		return move.score > highScore ? move.score : highScore
	}, Number.NEGATIVE_INFINITY)

	return moves.filter((move) => move.score === bestMoveScore)
}

function minMax(board, depth, isMaximizer, _PLAYER, _OPPONENT, alpha, beta) {
	alg.moves++
	const score = evaluateBoard(board, _PLAYER, _OPPONENT)
	if (score) {
		return score > 0 ? score - depth : score + depth
	}
	if (isGameOver(board)) {
		return 0
	}
	if (depth >= 7) {
		return 0
	}

	if (isMaximizer) {
		let maxScore = Number.NEGATIVE_INFINITY
		const nextBoards = generateBoards(board, _PLAYER)
		//nextBoards.sort((a, b) => 0.5 - Math.random())
		for (let i = 0; i < nextBoards.length; i++) {
			maxScore = Math.max(
				maxScore,
				minMax(
					nextBoards[i],
					depth + 1,
					!isMaximizer,
					_PLAYER,
					_OPPONENT,
					alpha,
					beta
				)
			)
			alpha = Math.max(alpha, maxScore)
			if (maxScore >= beta) {
				// console.log('pruning')
				break
			}
		}
	return maxScore
	} else {
		let minScore = Number.POSITIVE_INFINITY
		const nextBoards = generateBoards(board, _OPPONENT)
		//nextBoards.sort((a, b) => 0.5 - Math.random())
		for (let i = 0; i < nextBoards.length; i++) {
			minScore = Math.min(
				minScore,
				minMax(
					nextBoards[i],
					depth + 1,
					!isMaximizer,
					_PLAYER,
					_OPPONENT,
					alpha,
					beta
				)
			)
			beta = Math.min(beta, minScore)
			if (minScore <= alpha) {
				//console.log('pruning')
				break
			}
		}
		return minScore
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
		abConditions.some((condition) =>
			condition.every((pos) => board[pos] === _PLAYER)
		)
	) {
		alg.wins++
		return 100
	}
	if (
		abConditions.some((condition) =>
			condition.every((pos) => board[pos] === _OPPONENT)
		)
	) {
		alg.losses++
		return -100
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

const abConditions = [
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

module.exports = { alphaBetaDriver, getABInfo }
