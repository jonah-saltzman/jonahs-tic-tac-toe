const gameData = require('./data')



const showBoard = () => {
    console.log('showing board')
    $('#game-section').show(0)
}

const hideBoard = () => {
    $('#game-section').hide(0)
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
    if (!gameData.getWinInfo()) $('.container').removeClass('tie')
    const board = gameData.getBoard()
    console.log(`rendering board: `, board)
    for (const position in board) {
        if (board[position]) {
            $(`#box${position}`).text(board[position].toUpperCase())
        }
        else {
            $(`#box${position}`).text('').removeClass("win-position")
        }
    }
    if (gameData.isGameOver()) {
        const winInfo = gameData.getWinInfo()
        if (winInfo[0] === 'draw') {
            $('.container').addClass('tie')
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
    $('.container').removeClass('start-game')
}

const logoutGameUI = () => {
    $('.container').addClass('start-game')
}

// const clearBoard = () => {

// }

module.exports = {
	showBoard,
	updateGameUI,
	renderBoard,
	startGameUI,
	hideBoard,
	logoutGameUI,
}