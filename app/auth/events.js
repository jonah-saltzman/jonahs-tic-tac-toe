const authUI = require('./ui')
const authAPI = require('./api')
const getFormFields = require('../../lib/get-form-fields')
const store = require('../store')
const testing = require('../testing')
const gameData = require('../game/data')
const gameUI = require('../game/ui')

if (testing) {
    authUI.signinSuccess(store.email)
	authUI.enableNewGame()
}

const onSigninButton = (event, modal) => {
    event.preventDefault()
    $('#account-created-badge').hide(0)
    console.log(`hit login button`)
    modal.show()
    //authUI.showAuthModal()
}

const onCloseAuthModal = () => {
    authUI.resetAuthForms()
    authUI.clearAuthMessages()
}

const onSigninRegisterButton = () => {
    authUI.resetAuthForms()
    authUI.hideSignin()
    authUI.showSignup()
}

const onRegisterSigninButton = () => {
    authUI.resetAuthForms()
    authUI.showSignin()
    authUI.hideSignup()
}

const onRegister = event => {
    event.preventDefault()
    const registerData = getFormFields(event.target)
    if (registerData.signupform.password !== registerData.signupform.passwordConfirm) {
        authUI.passwordMatchFail()
        authUI.resetAuthForms()
        authUI.setSignupEmail(registerData.signupform.email)
        return
    }
    console.log(registerData.signupform)
    authAPI
        .registerAPI(registerData.signupform)
        .then(registerResult => {
            console.log(`register succeeded: `, registerResult)
            authUI.registerSuccess(registerResult.user.email)
            authUI.resetAuthForms()
            authUI.setSigninEmail(registerResult.user.email)
            //authUI.toggleAuthForms(registerResult.user.email)
        })
        .catch(() => {
            authUI.registerFail()
            authUI.resetAuthForms()
        })
}

const onSigninSubmit = (event, authModal) => {
    event.preventDefault()
    authUI.clearAuthMessages()
    const signinData = getFormFields(event.target)
    authAPI
        .signinAPI(signinData.signinform)
        .then(signinResult => {
            console.log(`signin succeeded: `)
            store.authed = true
            store.email = signinResult.user.email
            store.token = signinResult.user.token
            console.log(`store: `, store)
            authUI.signinSuccess(store.email)
            authUI.enableNewGame()
            authModal.hide()
        })
        .catch(() => {
            authUI.signinFail()
            authUI.resetAuthForms()
            authUI.setSigninEmail(signinData.signinform.email)
        })
}

const onSignout = event => {
    event.preventDefault()
    authAPI
        .signoutAPI()
        .then(authUI.hideAuthedUI)
        .then(authUI.signoutMessage(store.email))
        .then(() => {
            store.authed = false
            store.email = null
            store.token = null
            authUI.resetCurrentUser()
            authUI.showSignin()
            authUI.resetAuthForms()
            gameData.resetGame()
            gameUI.updateGameUI()
            gameUI.renderBoard()
            gameUI.logoutGameUI()
        })
        .catch(() => {
            console.log('failed to log out')
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
