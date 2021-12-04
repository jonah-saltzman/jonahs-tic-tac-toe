const authUI = require('./ui')
const authAPI = require('./api')
const getFormFields = require('../../lib/get-form-fields')
const store = require('../store')
const testing = require('../testing')
const gameData = require('../game/data')
const gameUI = require('../game/ui')

// If testing enabled, sign-in handled in ../store.js
if (testing) {
    authUI.signinSuccess(store.email)
	authUI.enableNewGame()
}

// Show the login/register modal
const onSigninButton = (event, modal) => {
    event.preventDefault()
    authUI.showModal(modal)
}

// Reset forms & messages when auth modal closed
const onCloseAuthModal = (modal) => {
    authUI.hideModal(modal)
    authUI.resetAuthForms()
    authUI.clearAuthMessages()

    // Restore modal to log-in state
    authUI.showSignin()
	authUI.hideSignup()
}

// Toggle auth modal from sign-in to register
const onSigninRegisterButton = () => {
    authUI.clearAuthMessages()
    authUI.resetAuthForms()
    authUI.hideSignin()
    authUI.showSignup()
}

// Toggle auth modal from register to sign-in
const onRegisterSigninButton = () => {
    authUI.clearAuthMessages()
    authUI.resetAuthForms()
    authUI.showSignin()
    authUI.hideSignup()
}

// Event handler for registration form submission
const onRegister = (event) => {
    event.preventDefault()
    authUI.clearAuthMessages()
    const registerData = getFormFields(event.target)

    // Check that passwords match
    if (registerData.signupform.password !== registerData.signupform.passwordConfirm) {
        authUI.passwordMatchFail()
        authUI.resetAuthForms()
        authUI.setSignupEmail(registerData.signupform.email)
        return
    }
    
    // Registration API call with form data
    authAPI
        .registerAPI(registerData.signupform)
        .then(registerResult => {
            // Upon successful registration, toggle to sign-in and auto-populate email
            authUI.registerSuccess(registerResult.user.email)
            authUI.resetAuthForms()
            authUI.setSigninEmail(registerResult.user.email)
        })
        .catch(() => {
            authUI.registerFail()
            authUI.resetAuthForms()
        })
}

// Event handler for sign-in form submission
const onSigninSubmit = (event, authModal) => {
    event.preventDefault()
    authUI.clearAuthMessages()
    const signinData = getFormFields(event.target)

    // Sign-in API call with form data
    authAPI
        .signinAPI(signinData.signinform)
        .then(signinResult => {

            // Store authorization data upon successful authentication
            store.authed = true
            store.email = signinResult.user.email
            store.token = signinResult.user.token

            // Sign-in UI reactions
            authUI.signinSuccess(store.email)
            authUI.enableNewGame()
            authUI.hideModal(authModal)
        })
        .catch(() => {

            // Sign-in failure UI reactions
            authUI.signinFail()
            authUI.resetAuthForms()
            authUI.setSigninEmail(signinData.signinform.email)
        })
}

// Event handler for log-out button
const onSignout = (event) => {
    event.preventDefault()

    // Sign-out API call
    authAPI
        .signoutAPI()
        .then(authUI.hideAuthedUI)
        .then(authUI.signoutMessage(store.email))
        .then(() => {

            // Upon successful sign-out, clear authorization data
            store.authed = false
            store.email = null
            store.token = null

            // Reset UI & game data
            gameData.resetGame()
            authUI.resetCurrentUser()
            authUI.showSignin()
            authUI.resetAuthForms()
            gameUI.updateGameUI()
            gameUI.renderBoard()
            gameUI.logoutGameUI()
        })
        .catch(() => {
            alert('failed to log out')
        })
}

module.exports = {
	onSigninButton,
	onRegister,
	onSigninSubmit,
	onSigninRegisterButton,
	onRegisterSigninButton,
	onSignout,
	onCloseAuthModal,
}
