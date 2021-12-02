const bsObjs = require('../bs-objects')


const showAuthModal = event => {
    bsObjs.authModal.toggle()
}

module.exports = {
    showAuthModal
}