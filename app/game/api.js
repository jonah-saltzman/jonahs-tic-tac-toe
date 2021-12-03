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

module.exports = {
    newGame
}