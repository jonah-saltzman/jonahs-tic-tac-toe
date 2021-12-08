
// Requires
const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const testing = require('./testing')
const Modal = require('bootstrap').Modal
const authUI = require('./auth/ui')

$(() => {
    // Modal instantiation

    const authModal = new Modal($('#authModal'))
    gameEvents.onFirstLoad()

    // Initially hidden elements
    $('.five-container').hide(0)
    $('.player-form-check').hide(0)
    $('.board-form-check').hide(0)
    $('#account-created-badge').hide(0)
    $('#signin-failed-badge').hide(0)
    $('#signup-failed-badge').hide(0)
	$('#password-match-badge').hide(0)
    $('#reset-game-btn').hide(0)
    $('#signout-button').hide(0)
    $('.signup-toggled').hide(0)
    $('#modal-signup').hide(0)
    $('#signed-out-badge').hide(0)

    // On-click game events
    $('#reset-game-btn').on('click', gameEvents.onResetGame)
    $('.box').on('click', gameEvents.onBoardClick)
    // $('#start-game-btn').on('click', gameEvents.onNewGame)
    $('.player-form-check').on('click', gameEvents.onChangeVS)
    $('.board-form-check').on('click', gameEvents.onChangeVS)

    // Start-game form
    $('#players-form').on('submit', gameEvents.onStartGame)

    // On-click authenticaion events
    $('#launch-authModal').on('click', (event) => authEvents.onSigninButton(event, authModal))
    $('#signin-register').on('click', authEvents.onSigninRegisterButton)
    $('#register-signin').on('click', authEvents.onRegisterSigninButton)
    $('#signout-button').on('click', authEvents.onSignout)
    $('#close-auth-modal').on('click', () => authEvents.onCloseAuthModal(authModal))

    // On-submits (auth forms)
    $('#authmodal-signin-form').on('submit', event => {authEvents.onSigninSubmit(event, authModal)})
    $('#authmodal-signup-form').on('submit', event => {authEvents.onRegister(event, authModal)})

    if (testing) {
			authUI.showAuthedUI()
		}
})