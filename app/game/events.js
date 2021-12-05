const gameData = require('./data')
const gameAPI = require('./api')
const gameUI = require('./ui')
const store = require('../store')
const {movesToCompare, getAlgNumbers} = require('./algorithm')
const getFormFields = require('../../lib/get-form-fields')

const onBoardClick = (event) => {
    if (!gameData.isGameStarted()) {
        alert('Start a new game to play!')
        return
    }
	const divID = $(event.target).data('id')
    const player = gameData.getPlayer()
    if (gameData.isValidMove(divID)) {
            gameData.addMove(player, divID)
            gameAPI.updateGame(gameData.getGameInfo()).then(() => {
                gameUI.renderBoard()
                gameUI.updateGameUI()
            }).then(() => {
                if (!gameData.isPVP() && !gameData.isGameOver()) {
                    const compMoves = movesToCompare(gameData.getBoard(), gameData.getPlayer())
                    const randMove = compMoves[Math.floor(Math.random() * compMoves.length)]
                    gameData.addMove(gameData.getPlayer(), randMove.move.toIndex)
                    gameAPI.updateGame(gameData.getGameInfo()).then(() => {
                        gameUI.renderBoard()
                        gameUI.updateGameUI()
                        gameUI.updateGameInfo(getAlgNumbers())
                    })
                }
            })
        }
}

const onResetGame = () => {
    gameData.resetGame()
    gameUI.updateGameUI()
    gameUI.renderBoard()
}

const onStartGame = (event) => {
	event.preventDefault()
    if (store.authed === false) {
        alert('Please login!')
        return
    }
	const pvp = getFormFields(event.target).playerSelect
    if (!gameData.isGameStarted()) {
        gameUI.startGameUI()
        gameAPI.newGame().then((result) => {
                gameData.startGame(result.game, pvp === 'pvp' ? true : false)
                gameUI.updateGameUI()
            })
    }
}

const onNewGame = () => {
    if (store.authed === false) {
        alert('Please login!')
        return
    }
    if (!gameData.isGameStarted()) {
        gameUI.startGameUI()
        gameAPI.newGame().then((result) => {
                gameData.startGame(result.game)
                gameUI.updateGameUI()
            })
    }
}

module.exports = {
	onBoardClick,
    onNewGame,
    onResetGame,
    onStartGame
}