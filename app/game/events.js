const gameData = require('./data')
const gameAPI = require('./api')
const gameUI = require('./ui')
const store = require('../store')

const onBoardClick = (event) => {
    if (!gameData.isGameStarted()) {
        alert('Start a game to play!')
        return
    }
	const dataID = $(event.target).data('id')
    const player = gameData.getPlayer()
	console.log('data ID: ', dataID)
    console.log(`current player: ${gameData.getPlayer()}`)
    if (gameData.isValidMove(player, dataID)) {
        console.log(`valid for player ${player} to choose ${dataID}`)
        gameData.addMove(player, dataID)
    }
    else {
        console.log(`INVALID MOVE: player ${player} to ${dataID}`)
    }
    console.log('game data:')
	gameUI.renderBoard()
}

const onNewGame = () => {
    if (store.authed === false) {
        alert('Please login!')
        return
    }
    if (!gameData.isGameStarted()) {
        gameAPI
            .newGame()
            .then((result) => {
                gameData.startGame(result.game)
                console.log(`game started: `, result)
                gameUI.updateGameUI()
            })
    }
}

module.exports = {
	onBoardClick,
    onNewGame
}