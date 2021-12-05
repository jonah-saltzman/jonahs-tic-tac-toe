const { apiUrl } = require('../config')
const store = require('../store')

const newGame = () => {
    const newGameURL = apiUrl + "/games/"
    return $.ajax({
        url: newGameURL,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${store.token}`
        },
        data: {}
    })
}

const updateGame = (gameData) => {
    const updateURL = apiUrl + `/games/${gameData.gameID}/`
    return $.ajax({
        url: updateURL,
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${store.token}`
        },
        data: gameData.apiData
    })
}

module.exports = {
    newGame,
    updateGame,
}