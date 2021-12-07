const gameData = require('./data')
const gameAPI = require('./api')
const gameUI = require('./ui')
const store = require('../store')
const {easyDriver, getAlgNumbers} = require('./algorithm')
const {minMaxDriver, getMinMaxInfo} = require('./min-max')
const getFormFields = require('../../lib/get-form-fields')

const onBoardClick = (event) => {
    if (!gameData.isGameStarted()) {
        alert('Start a new game to play!')
        return
    }
    console.log(`clicked the board`)
	const divID = $(event.target).data('id')
    const player = gameData.getPlayer()
    if (gameData.isValidMove(divID)) {
            console.log(`after valid move`)
            gameData.addMove(player, divID)
            gameAPI.updateGame(gameData.getGameInfo()).then(() => {
                gameUI.renderBoard()
                gameUI.updateGameUI()
            }).then(() => { 
                console.log(`after player move api call`)
                const [computerMove, getAlgInfo] = gameData.getGameInfo().easy
                    ? [easyDriver, getAlgNumbers]
                    : [minMaxDriver, getMinMaxInfo]
                console.log(`getgameinfo: `, gameData.getGameInfo())
                console.log(`getgameinfo.easy: `, gameData.getGameInfo().easy)
                if (!gameData.isPVP()) {
                    if (!gameData.isGameOver()) {
                        const compMoves = computerMove(gameData.getBoard(), gameData.getPlayer())
                        const randMove = compMoves[Math.floor(Math.random() * compMoves.length)]
                        console.log(`selected move:`)
                        console.log(randMove)
                        gameData.addMove(gameData.getPlayer(), randMove.move.toIndex)
                        gameAPI.updateGame(gameData.getGameInfo()).then(() => {
                            gameUI.renderBoard()
                            gameUI.updateGameUI()
                            gameUI.updateGameInfo(getAlgInfo())
                        })
                    }
                } else {
                    gameUI.updateGameInfo()
                }
            })
        }
}

const onResetGame = () => {
    gameData.resetGame()
    gameUI.updateGameUI()
    gameUI.renderBoard()
    gameUI.clearGameInfo()
}

const onStartGame = (event) => {
	event.preventDefault()
    if (store.authed === false) {
        alert('Please login!')
        return
    }
    const gameOptions = getFormFields(event.target)
    if (!gameData.isGameStarted()) {
        gameUI.startGameUI()
        gameAPI.newGame().then((result) => {
                gameData.startGame(result.game, gameOptions)
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

const onChangeVS = () => {
    gameUI.updateGameUI()
}

const onFirstLoad = () => {
    gameUI.updateGameUI()
}

module.exports = {
	onBoardClick,
    onNewGame,
    onResetGame,
    onStartGame,
    onChangeVS,
    onFirstLoad
}