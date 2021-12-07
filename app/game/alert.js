class gameAlert {
    constructor(over, info) {
        this.classes = 'alert alert-dismissible fade show'
        this.strong = ''
        this.text = ''
        const totalMoves = info.alg ? info.alg.wins + info.alg.losses + info.alg.draws : null
        if (over) {
            this.strong = 'Game over!'
            this.text = `${info.game.winner.toUpperCase()} has won in ${info.game.moves} turns.`
            if (info.game.winner === 'x' || info.game.pvp) {
                this.classes += ' alert-success'
                this.text += ' Good job!'

            } else {
                this.classes += ' alert-danger'
                this.text += ' Better luck next time :('
            }
        } else {
            this.strong = `The computer has moved to position ${info.game.lastMove}.`
            this.classes += ' alert-warning'
            this.text = `The algorithm analyzed ${totalMoves} possible games, of which it` + 
                        ` won ${info.alg.wins}, lost ${info.alg.losses}, and tied ` +
                        `${info.alg.draws}.`
        }
    }
    getHtml() {
        return (
					`<div class="${this.classes}" role="alert">` +
                    `<strong>${this.strong}</strong><br />` +
                    `${this.text}<button type="button" class="btn-close" ` +
                    `data-bs-dismiss="alert"></button></div>`
				)
    }
}

module.exports = {gameAlert}