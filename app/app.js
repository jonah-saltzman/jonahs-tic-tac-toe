// use require with a reference to bundle the file and use it in this file
// const example = require('./example')\

const authEvents = require('./auth/events')
const Modal = require('bootstrap').Modal

const authModal = new Modal($('#authModal'))

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  //$('#launch-authModal').on('click', () => {authModal.toggle()})
})
