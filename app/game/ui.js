const gameData = require('./data')

const players = ['x', 'o']

const showBoard = () => {
    console.log('showing board')
    $('#game-section').show(0)
}

const updateGameUI = () => {
    if (gameData.gameInfo.gameStarted) {
        $('#start-game-btn').attr('disabled', true)
    }
}

const renderBoard = () => {
    const board = gameData.getBoard()
    for (const position in board) {
        console.log(`rendering position ${position}; that position is ${board[position]}`)
        if (board[position]) {
            $(`#box${position}`).text(board[position].toUpperCase())
        }
    }
    if (gameData.isGameOver()) {
        console.log(`game is over, coloring green`)
        const winInfo = gameData.getWinInfo()
        console.log(`winning combination: `, winInfo[1])
        winInfo[1].forEach(position => $(`#box${position}`).addClass("win-position"))
    }
}

module.exports = {
    showBoard,
    updateGameUI,
    renderBoard
}