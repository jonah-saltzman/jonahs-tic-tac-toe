const showBoard = () => {
    console.log('showing board')
    $('#game-section').show(0)
}

const attemptMove = event => {
    console.log('event.target: ', event.target)
    console.log('event.target.id: ', event.target.id)
    const dataID = $(event.target).data('id')
    console.log('data ID: ', dataID)
}

module.exports = {
    showBoard,
    attemptMove
}