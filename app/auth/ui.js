//const bsObjs = require('../bs-objects')
let authToggle = null

const passwordMatchFail = () => {
    $('#password-match-badge').show(0)
}

const registerSuccess = email => {
    //clearAuthMessages()
    //$('#account-created-badge').show(0)
    console.log(`successfully registered: `, email)
    hideSignup()
    showSignin(email)
}

const signinSuccess = email => {
    //clearAuthMessages()
    hideSignin()
    $('#signed-in-badge').text(`Welcome, ${email}`)
    showAuthedUI()
}

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
    //clearAuthMessages()
    $('#authmodal-signin-form').trigger('reset')
    $('#authmodal-signup-form').trigger('reset')
    //('#signin-form').reset()
}

const showSignup = (email) => {
     $('#modal-signup').show(0)
     $('#authModal-title').text('Sign-up for an account')
     $('.signup-toggled').show(0)
     authToggle = false
}

const hideSignup = () => {
    $('#modal-signup').hide(0)
    $('#authModal-title').text('Login')
    $('.signup-toggled').hide(0)
    $('#signup-failed-badge').hide(0)
    $('#password-match-badge').hide(0)
}

const setSigninEmail = (email) => {
    $('#signin-email').val(email)
}

const showSignin = (email) => {
    if (email) $('#account-created-badge').show(0), $('#password-match-badge').hide(0)
    $('#modal-signin').show(0)
    $('#authModal-title').text('Login')
    $('.signin-toggled').show(0)
    authToggle = true
}

const hideSignin = () => {
	$('#modal-signin').hide(0)
    $('#authModal-title').text('Sign-up for an account')
    $('.signin-toggled').hide(0)
    $('#signin-failed-badge').hide(0)
}

const clearForms = () => {
    $('#signup-form').trigger('reset')
    $('#signin-form').trigger('reset')
}

// const toggleAuthForms = (savedEmail) => {
//     const email = savedEmail || false
//     if (authToggle) {
//         console.log(`authToggle was true, hiding signin and showing signup`)
//         hideSignin()
//         showSignup(email)
//     }
//     else {
//         console.log(`authToggle was false, hiding signup and showing signin`)
//         hideSignup()
//         showSignin(email)
//     }
// }

const signinFail = () => {
    $('#signin-failed-badge').show(0)
}

const registerFail = () => {
    $('#signup-failed-badge').show(0)
}

const enableNewGame = () => {
    $('#start-game-btn').attr('disabled', false)
}

const resetCurrentUser = () => {
    $('#signed-in-badge').text('')
}

const setSignupEmail = email => {
    $('#signup-email').val(email)
}

module.exports = {
	showSignup,
	clearForms,
	registerSuccess,
	resetAuthForms,
	hideSignup,
	//toggleAuthForms,
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
    setSignupEmail
}