const gameData = require('./data')
const gameAPI = require('./api')
const gameUI = require('./ui')
const store = require('../store')
const testing = require('../testing')

const onBoardClick = (event) => {
    console.log('clicked board')
    if (!gameData.isGameStarted()) {
        alert('Start a game to play!')
        return
    }
	const dataID = $(event.target).data('id')
    const player = gameData.getPlayer()
    if (gameData.isValidMove(player, dataID)) {
        gameData.addMove(player, dataID)
        gameAPI
            .updateGame(gameData.getGameApiData())
            .then(moveComplete)
    }
    else {
        console.log(`INVALID MOVE: player ${player} to ${dataID}`)
    }
}

const moveComplete = () => {
    gameUI.renderBoard()
	gameUI.updateGameUI()
}

const onResetGame = () => {
    gameData.resetGame()
    console.log(`game is reset: `, gameData.getGameInfo())
    onNewGame()
    gameUI.renderBoard()
}

const onNewGame = () => {
    if (store.authed === false) {
        alert('Please login!')
        return
    }
    if (!gameData.isGameStarted()) {
        gameUI.startGameUI()
        gameAPI
            .newGame()
            .then((result) => {
                gameData.startGame(result.game)
                gameUI.updateGameUI()
            })
    }
}

module.exports = {
	onBoardClick,
    onNewGame,
    onResetGame
}