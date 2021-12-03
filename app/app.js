// use require with a reference to bundle the file and use it in this file
// const example = require('./example')\

const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const Modal = require('bootstrap').Modal
const testGame = require('./testing')



// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
    const myModal = new Modal($('#exampleModal'))
    $('#launch-authModal').on('click', (event) => {
      event.preventDefault()
      myModal.show()
    })

    // Initial hidden elements
    $('#reset-game-btn').hide(0)
    $('#signup').hide(0)
    $('#signin').hide(0)
    $('#signed-in-account').hide(0)
    $('#signout-button').hide(0)

    // On-clicks
    $('#reset-game-btn').on('click', gameEvents.onResetGame)
    $('.box').on('click', gameEvents.onBoardClick)
    $('#start-game-btn').on('click', gameEvents.onNewGame)
    $('#launch-authModal').on('click', authEvents.onSigninButton)
    $('#signin-register').on('click', authEvents.onSigninRegisterButton)
    $('#register-signin').on('click', authEvents.onRegisterSigninButton)
    $('#signout-button').on('click', authEvents.onSignout)

    // On-submits
    $('#signup-form').on('submit', authEvents.onRegister)
		$('#signin-form').on('submit', authEvents.onSigninSubmit)
})
