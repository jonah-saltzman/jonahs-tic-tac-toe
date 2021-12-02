const authUI = require('./ui')

const onSigninButton = event => {
    event.preventDefault()
    console.log(`hit login button`)
    authUI.showAuthModal()
    return
}

module.exports = {
    onSigninButton
}