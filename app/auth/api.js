const { apiUrl } = require('../config')
const store = require('../store')

// New user registration API call
const registerAPI = (data) => {
    const registerUrl = apiUrl + "/sign-up/"
    return $.ajax({
        url: registerUrl,
        method: 'POST',
        data: {
            credentials: {
                email: data.email,
                password: data.password,
                password_confirmation: data.password
            }
        }
    })
}

// Sign-in API call
const signinAPI = (data) => {
	const signinURL = apiUrl + '/sign-in/'
	return $.ajax({
		url: signinURL,
		method: 'POST',
		data: {
			credentials: {
				email: data.email,
				password: data.password
			},
		},
	})
}

// Sign-out API call
const signoutAPI = () => {
    const token = store.token
    const signoutURL = apiUrl + '/sign-out/'
    return $.ajax({
        url: signoutURL,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

module.exports = {
    registerAPI,
    signinAPI,
    signoutAPI
}
