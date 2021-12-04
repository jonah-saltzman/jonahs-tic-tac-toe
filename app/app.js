// use require with a reference to bundle the file and use it in this file
// const example = require('./example')\

const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const Modal = require('bootstrap').Modal
const testing = require('./testing')
const [email, password] = ['mac@book.com', 'Jonah']


// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
    // Modals
    const authModal = new Modal($('#authModal'))

    // Initial hidden elements
    $('#reset-game-btn').hide(0)
    $('#signout-button').hide(0)
    $('#signin-failed-badge').hide(0)
    $('.signup-toggled').hide(0)
    $('#modal-signup').hide(0)
    $('#signup-failed-badge').hide(0)

    // On-clicks
    $('#reset-game-btn').on('click', gameEvents.onResetGame)
    $('.box').on('click', gameEvents.onBoardClick)
    $('#start-game-btn').on('click', gameEvents.onNewGame)
    $('#launch-authModal').on('click', (event) => authEvents.onSigninButton(event, authModal))
    $('#signin-register').on('click', authEvents.onSigninRegisterButton)
    $('#register-signin').on('click', authEvents.onRegisterSigninButton)
    $('#signout-button').on('click', authEvents.onSignout)
    $('#close-auth-modal').on('click', authEvents.onCloseAuthModal)

    // On-submits
    $('#authmodal-signin-form').on('submit', event => {authEvents.onSigninSubmit(event, authModal)})
    $('#authmodal-signup-form').on('submit', event => {authEvents.onRegister(event, authModal)})
})