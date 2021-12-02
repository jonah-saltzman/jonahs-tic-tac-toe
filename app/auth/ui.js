//const bsObjs = require('../bs-objects')
let authToggle = null

const registerSuccess = email => {
    clearAuthMessages()
    $('#authentication-messages')
        .append(`<span class="auth-message">Account created for ${email}</span>`)
    
}

const clearAuthMessages = () => {
    $('#authentication-messages').empty()
}

const resetAuthForms = () => {
    $('#signup-form').reset()
    //('#signin-form').reset()
}

const showSignup = () => {
     $('#signup').show(0)
     authToggle = false
}

const hideSignup = () => {
    $('#signup').hide(0)
}

const showSignin = () => {
    $('signin').show(0)
    authToggle = true
}

const hideSignin = () => {
	$('signin').hide(0)
}

const clearForms = () => {
    $('#signup-form').reset()
}

const toggleAuthForms = () => {
    if (authToggle) {
        //hide sign-in
        showSignup()
    }
    else {
        hideSignup()
        //show sign-in
    }
}

module.exports = {
    showSignup,
    clearForms,
    registerSuccess,
    resetAuthForms,
    hideSignup,
    toggleAuthForms,
    showSignin,
    hideSignin,
}