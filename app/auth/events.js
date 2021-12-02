const authUI = require('./ui')
const authAPI = require('./api')
const getFormFields = require('../../lib/get-form-fields')
const store = require('../store')
const gameUI = require('../game/ui')

const onSigninButton = event => {
    event.preventDefault()
    console.log(`hit login button`)
    console.log(event)
    authUI.showSignin()
    //authUI.showAuthModal()
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
    console.log(registerData.signupform)
    authAPI
        .registerAPI(registerData.signupform)
        .then(registerResult => {
            console.log(`register succeeded: `, registerResult)
            authUI.registerSuccess(registerResult.user.email)
            authUI.resetAuthForms()
            authUI.toggleAuthForms(registerResult.user.email)
        })
        .catch(() => {console.log('register failed')})
}

const onSigninSubmit = event => {
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
            gameUI.showBoard()
        })
        .catch((signinResult) => {console.log('signin failed', signinResult)})
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
    onSignout
}
