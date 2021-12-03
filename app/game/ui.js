const gameData = require('./data')

const players = ['x', 'o']

const showBoard = () => {
    console.log('showing board')
    $('#game-section').show(0)
}

const updateGameUI = () => {
    if (gameData.isGameStarted()) {
        $('#start-game-btn').hide(0)
        gameData.firstMoveMade()
					? $('#reset-game-btn').attr('disabled', false)
					: $('#reset-game-btn').attr('disabled', true)
        $('#reset-game-btn').show(0)
    }
    else {
        $('#start-game-btn').show(0)
        $('#reset-game-btn').hide(0)
    }
}

const renderBoard = () => {
    const board = gameData.getBoard()
    console.log(`rendering board: `, board)
    for (const position in board) {
        if (board[position]) {
            $(`#box${position}`).text(board[position].toUpperCase())
        }
        else {
            $(`#box${position}`).text('').removeClass("win-position tie")
        }
    }
    if (gameData.isGameOver()) {
        const winInfo = gameData.getWinInfo()
        if (winInfo[0] === 'draw') {
            $('.box').addClass('tie')
        }
        else {
            console.log(`winning combination: `, winInfo[1])
            console.log(gameData.getGameInfo())
            winInfo[1].forEach((combo) =>
							combo.forEach((position) =>
								$(`#box${position}`).addClass('win-position')
							)
						)
        }
    }
}

const startGameUI = () => {
    $('.box').removeClass('start-game')
}

// const clearBoard = () => {

// }

module.exports = {
    showBoard,
    updateGameUI,
    renderBoard,
    startGameUI
}