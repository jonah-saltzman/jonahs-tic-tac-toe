const authUI = require('./ui')
const authAPI = require('./api')
const getFormFields = require('../../lib/get-form-fields')

const onSigninButton = event => {
    event.preventDefault()
    console.log(`hit login button`)
    authUI.showSignup()
    //authUI.showAuthModal()
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
            authUI.toggleAuthForms()
        })
        .catch(() => {console.log('register failed')})
}

onSignin = event => {
    event.preventDefault()
    const signinData = getFormFields(event.target)
    authAPI
        .signinAPI(signinData.signinform)
}

module.exports = {
    onSigninButton,
    onRegister
}