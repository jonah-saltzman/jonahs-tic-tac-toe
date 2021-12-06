const gameData = require('./data')

// class gameAlert {
//     constructor(type,)
// }

const updateGameInfo = (alg) => {
    const info = gameData.getGameInfo()
    if (info.gameOver) {
        $('.alerts-container')
    }
}

const updateGameUI = () => {
    if (gameData.isGameStarted()) {
        $('.player-btn').hide(0)
        $('.difficulty-btn').hide(0)
        $('#start-game-btn').hide(0)
        gameData.firstMoveMade()
					? $('#reset-game-btn').attr('disabled', false)
					: $('#reset-game-btn').attr('disabled', true)
        $('#reset-game-btn').show(0)
    }
    else {
        $('#start-game-btn').show(0)
        $('.player-btn').show(0)
        if ($('#vs-comp-btn').prop('checked')) {
            $('.difficulty-btn').show(0)
            console.log('player wants to vs computer')
        } else {
            console.log('player wants pvp')
            $('.difficulty-btn').hide(0)
        }
        $('#reset-game-btn').hide(0)
    }
}

const renderBoard = () => {
    if (!gameData.getWinInfo())
        $('.container').removeClass('tie')
    const board = gameData.getBoard()
    for (const position in board) {
        if (board[position])
            $(`#box${position}`).text(board[position].toUpperCase())
        else
            $(`#box${position}`).text('').removeClass("win-position")
    }
    if (gameData.isGameOver()) {
        const compWin = gameData.getPlayer()
        console.log(`computer won?: `, compWin)
        const winInfo = gameData.getWinInfo()
        if (winInfo[0] === 'draw') {
            $('.container').addClass('tie')
        }
        else {
            winInfo[1].forEach((combo) =>
							combo.forEach((position) =>
								$(`#box${position}`).addClass('win-position')
							)
						)
        }
    }
}

const startGameUI = () => $('.container').removeClass('start-game')

const logoutGameUI = () => $('.container').addClass('start-game')

module.exports = {
	updateGameUI,
	renderBoard,
	startGameUI,
	logoutGameUI,
    updateGameInfo
}