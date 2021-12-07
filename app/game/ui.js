const gameData = require('./data')
const {gameAlert} = require('./alert')

const updateGameInfo = (alg) => {
    const info = {game: gameData.getGameInfo(), alg: alg ? alg : null}
    if (info.game.gameOver) {
        const gameOverAlert = new gameAlert(true, info)
        $('.alerts-container').prepend(gameOverAlert.getHtml())
    } else if (!info.game.pvp) {
        const compMoveAlert = new gameAlert(false, info)
        $('.alerts-container').prepend(compMoveAlert.getHtml())
    }
}

const clearGameInfo = () => {
    $('.alerts-container').empty()
}

const updateGameUI = () => {
    if (gameData.isGameStarted()) {
        $('.player-btn').hide(0)
        $('.difficulty-btn').hide(0)
        $('#start-game-btn').hide(0)
        $('.board-btn').hide(0)
        gameData.firstMoveMade()
            ? $('#reset-game-btn').attr('disabled', false)
            : $('#reset-game-btn').attr('disabled', true)
        $('#reset-game-btn').show(0)
        if (gameData.isBoardSmall()) {
            $('.three-container').show(0)
            $('.five-container').hide(0)
            $('.alerts-container').removeClass('alerts-container-big')
        } else {
            $('.three-container').hide(0)
            $('.five-container').show(0)
            $('.alerts-container').addClass('alerts-container-big')
        }
    } else {
        $('#start-game-btn').show(0)
        $('.board-btn').show(0)
        $('.player-btn').show(0)
        if ($('#vs-comp-btn').prop('checked') && !$('#five-btn').prop('checked')) {
            $('.difficulty-btn').show(0)
        } else {
            $('.difficulty-btn').hide(0)
        }
        $('#reset-game-btn').hide(0)
    }
}

const renderBoard = () => {
    if (!gameData.getWinInfo()) {
        $('.container').removeClass('tie')
        $(`.box`).text('').removeClass('win-position')
    }
    const board = gameData.getBoard()
    const prefix = board.length === 9 ? '' : 'five'
    for (const position in board) {
			if (board[position]) {
                $(`#${prefix}box${position}`).text(board[position].toUpperCase())
            }
		}
    if (gameData.isGameOver()) {
        const compWin = gameData.getPlayer()
        const winInfo = gameData.getWinInfo()
        if (winInfo[0] === 'draw') {
            if (gameData.isBoardSmall()) {
                $('.container').addClass('tie')
            } else {
                $('.five-container').addClass('tie')
            }
        }
        else {
            winInfo[1].forEach((combo) =>
                combo.forEach((position) =>
                    $(`#${prefix}box${position}`).addClass('win-position')
                )
            )
        }
    }
}

const startGameUI = () => {
    $('.container').removeClass('start-game')
    $('.five-container').removeClass('start-game')
}

const logoutGameUI = () => {
    $('.container').addClass('start-game')
    $('.five-container').addClass('start-game')
}

module.exports = {
	updateGameUI,
	renderBoard,
	startGameUI,
	logoutGameUI,
    updateGameInfo,
    clearGameInfo
}