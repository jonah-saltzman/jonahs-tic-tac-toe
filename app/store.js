const testing = require('./testing')

const store = {
    authed: false,
    email: null,
    token: null
}

const autoSignin = (email, password) => {
    return $.ajax({
			url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-in/',
			method: 'POST',
			data: {
				credentials: {
					email: email,
					password: password,
				},
			},
		})
}

if (testing) {
	const [email, password] = ['mac@book.com', 'Jonah']
	autoSignin(email, password).then((autoResponse) => {
		console.log(`logged in automatically: `, autoResponse)
        store.authed = true
        store.email = autoResponse.user.email
        store.token = autoResponse.user.token
	})
}

module.exports = store
