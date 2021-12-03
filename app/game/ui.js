const gameData = require('./data')

const showBoard = () => {
    console.log('showing board')
    $('#game-section').show(0)
}

const updateGameUI = () => {
    if (gameData.gameInfo.gameStarted) {
        $('#start-game-btn').attr('disabled', true)
    }
}

module.exports = {
    showBoard,
    updateGameUI
}