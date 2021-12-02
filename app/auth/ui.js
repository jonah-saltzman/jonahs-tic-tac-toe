//const bsObjs = require('../bs-objects')
let authToggle = null

const registerSuccess = email => {
    clearAuthMessages()
    $('#authentication-messages')
        .append(`<span class="auth-message">Account created for ${email}</span>`)
    
}

const signinSuccess = email => {
    clearAuthMessages()
    hideSignin()
    $('#signed-in-account').text(`Welcome, ${email}`)
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
    $('#authentication-messages').empty()
}

const resetAuthForms = () => {
    $('#signup-form').trigger('reset')
    $('#signin-form').trigger('reset')
    //('#signin-form').reset()
}

const showSignup = (email) => {
     $('#signup').show(0)
     authToggle = false
}

const hideSignup = () => {
    $('#signup').hide(0)
}

const showSignin = (email) => {
    console.log(`now showing signin`)
    $('#signin').show(0)
    // if (email) {
    //     console.log(`autofilling email`, email)
    //     $('#signin-email-group').children('label').attr('value', email)
    // }
    authToggle = true
}

const hideSignin = () => {
	$('#signin').hide(0)
}

const clearForms = () => {
    $('#signup-form').trigger('reset')
}

const toggleAuthForms = (savedEmail) => {
    const email = savedEmail || false
    if (authToggle) {
        console.log(`authToggle was true, hiding signin and showing signup`)
        hideSignin()
        showSignup(email)
    }
    else {
        console.log(`authToggle was false, hiding signup and showing signin`)
        hideSignup()
        showSignin(email)
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
    clearAuthMessages,
    signinSuccess,
    hideAuthedUI,
    signoutMessage
}