const gameData = require('./data')
const gameAPI = require('./api')
const gameUI = require('./ui')
const store = require('../store')
const {easyDriver, getAlgNumbers} = require('./algorithm')
const {minMaxDriver, getMinMaxInfo} = require('./min-max')
const {alphaBetaDriver, getABInfo} = require('./alphabeta')
const getFormFields = require('../../lib/get-form-fields')

const onBoardClick = (event) => {
	const divID = $(event.target).data('id')
    const player = gameData.getPlayer()
    if (gameData.isValidMove(divID) && gameData.isBoardSmall()) {
            gameData.addMove(player, divID)
            gameAPI.updateGame(gameData.getGameInfo()).then(() => {
                gameUI.renderBoard()
                gameUI.updateGameUI()
            }).then(() => {
                const [computerMove, getAlgInfo] = gameData.getGameInfo().easy
                    ? [easyDriver, getAlgNumbers]
                    : [minMaxDriver, getMinMaxInfo]
                if (!gameData.isPVP()) {
                    if (!gameData.isGameOver()) {
                        const compMoves = computerMove(gameData.getBoard(), gameData.getPlayer())
                        const randMove = compMoves[Math.floor(Math.random() * compMoves.length)]
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
        } else if (gameData.isValidMove(divID)) {
            gameData.addMove(player, divID)
            gameUI.renderBoard()
            gameUI.updateGameUI()
            if (!gameData.isPVP()) {
                const compMoves = alphaBetaDriver(gameData.getBoard(), gameData.getPlayer())
                const randMove = compMoves[Math.floor(Math.random() * compMoves.length)]
                gameData.addMove(gameData.getPlayer(), randMove.move.toIndex)
                gameUI.renderBoard()
                gameUI.updateGameUI()
                gameUI.updateGameInfo(getABInfo())
            }
        }
}

const onResetGame = () => {
    gameData.clearBoards()
    gameData.resetGame()
    gameUI.clearGameInfo()
    gameUI.updateGameUI()
    gameUI.renderBoard()
    gameUI.updateGameUI()
}

const onStartGame = (event) => {
	event.preventDefault()
    if (store.authed === false) {
        return
    }
    gameData.clearBoards()
    gameUI.renderBoard()
    const gameOptions = getFormFields(event.target)
    const smallBoard = gameOptions.boardSelect === 'three'
    if (!gameData.isGameStarted() && smallBoard) {
        gameUI.startGameUI()
        gameAPI.newGame().then((result) => {
                gameData.startGame(result.game, gameOptions)
                gameUI.updateGameUI()
            })
    } else {
        gameUI.startGameUI()
        gameData.startGame(false, gameOptions)
        gameUI.updateGameUI()
    }
}

// const onNewGame = () => {
//     if (store.authed === false) {
//         alert('Please login!')
//         return
//     }
//     if (!gameData.isGameStarted()) {
//         gameUI.startGameUI()
//         gameAPI.newGame().then((result) => {
//                 gameData.startGame(result.game)
//                 gameUI.updateGameUI()
//             })
//     }
// }

const onChangeVS = () => {
    gameUI.updateGameUI()
}

const onFirstLoad = () => {
    gameUI.updateGameUI()
}

module.exports = {
	onBoardClick,
    onResetGame,
    onStartGame,
    onChangeVS,
    onFirstLoad
}