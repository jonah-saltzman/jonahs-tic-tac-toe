// use require with a reference to bundle the file and use it in this file
// const example = require('./example')\

const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const Modal = require('bootstrap').Modal
const testGame = require('./testing')



// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
    // $('#game-section').hide(0)
    // $('.box').on('click', gameUI.attemptMove)
    $('#signup').hide(0)
    $('#signin').hide(0)
    $('#signed-in-account').hide(0)
    $('#signout-button').hide(0)
    $('#launch-authModal').on('click', authEvents.onSigninButton)
    $('#signup-form').on('submit', authEvents.onRegister)
    $('#signin-form').on('submit', authEvents.onSigninSubmit)
    $('#signin-register').on('click', authEvents.onSigninRegisterButton)
    $('#register-signin').on('click', authEvents.onRegisterSigninButton)
    $('#signout-button').on('click', authEvents.onSignout)
    if (testGame) {
      $('#game-section').show(0)
      $('.box').on('click', gameEvents.onBoardClick)
      $('#start-game-btn').on('click', gameEvents.onNewGame)
    }
})
