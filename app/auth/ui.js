
// Show and hide authentication modal
const showModal = (modal) => {
	modal.show()
}
const hideModal = (modal) => {
    modal.hide()
}

// Respond to authentication failures
const passwordMatchFail = () => {
    $('#password-match-badge').show(0)
}
const signinFail = () => {
	$('#signin-failed-badge').show(0)
}
const registerFail = () => {
	$('#signup-failed-badge').show(0)
}

// Respond to authentication successes
const registerSuccess = (email) => {
    hideSignup()
    showSignin(email)
}
const signinSuccess = (email) => {
    hideSignin()
    showAuthedUI()
    $('#signed-in-badge').text(`Welcome, ${email}`)
}

// Show and hide UI elements requiring authorization
const showAuthedUI = () => {
    $('#launch-authModal').hide(0)
    $('#signed-in-account').show(0)
    $('#signout-button').show(0)
}
const hideAuthedUI = () => {
    $('#launch-authModal').show(0)
    $('#signed-in-account').hide(0)
    $('#signout-button').hide(0)
}

const signoutMessage = (email) => {
    alert(`Goodbye, ${email}!`)
}

const clearAuthMessages = () => {
    $('#signin-failed-badge').hide(0)
    $('#signup-failed-badge').hide(0)
    $('#account-created-badge').hide(0)
    $('#password-match-badge').hide(0)
}

const resetAuthForms = () => {
    $('#authmodal-signin-form').trigger('reset')
    $('#authmodal-signup-form').trigger('reset')
}

// Show or hide the sign-up UI + associated badges in auth modal
const showSignup = () => {
     $('#modal-signup').show(0)
     $('#authModal-title').text('Sign-up for an account')
     $('.signup-toggled').show(0)
}
const hideSignup = () => {
    $('#modal-signup').hide(0)
    $('#authModal-title').text('Login')
    $('.signup-toggled').hide(0)
    $('#signup-failed-badge').hide(0)
    $('#password-match-badge').hide(0)
}

// Auto-populate the authentication email fields
const setSigninEmail = (email) => {
    $('#signin-email').val(email)
}
const setSignupEmail = (email) => {
	$('#signup-email').val(email)
}

// Show or hide the sign-in UI + associated badges in auth modal
const showSignin = (email) => {
    if (email) $('#account-created-badge').show(0), $('#password-match-badge').hide(0)
    $('#modal-signin').show(0)
    $('#authModal-title').text('Login')
    $('.signin-toggled').show(0)
}
const hideSignin = () => {
	$('#modal-signin').hide(0)
    $('#authModal-title').text('Sign-up for an account')
    $('.signin-toggled').hide(0)
    $('#signin-failed-badge').hide(0)
}

// Clear contents of authentication forms
const clearForms = () => {
    $('#signup-form').trigger('reset')
    $('#signin-form').trigger('reset')
}

// New game button enabled upon successful sign-in
const enableNewGame = () => {
    $('#start-game-btn').attr('disabled', false)
}

// Remove current-user badge
const resetCurrentUser = () => {
    $('#signed-in-badge').text('')
}

module.exports = {
	showSignup,
	clearForms,
	registerSuccess,
	resetAuthForms,
	hideSignup,
	showSignin,
	hideSignin,
	clearAuthMessages,
	signinSuccess,
	hideAuthedUI,
	signoutMessage,
	signinFail,
	registerFail,
	setSigninEmail,
	enableNewGame,
	resetCurrentUser,
	passwordMatchFail,
    setSignupEmail,
    showModal,
    hideModal
}