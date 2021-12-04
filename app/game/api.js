const { apiUrl } = require('../config')
const store = require('../store')

const newGame = () => {
    console.log(`token: `, store.token)
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
    console.log('updating game API: ', gameData)
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