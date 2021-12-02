const { apiUrl } = require('../config')

const registerAPI = data => {
    const registerUrl = apiUrl + "/sign-up/"
    console.log('url: ', registerUrl)
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

const signinAPI = (data) => {
	const signinURL = apiUrl + '/sign-in/'
	console.log('url: ', signinURL)
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

module.exports = {
    registerAPI,
    signinAPI
}

$('#myClass').text('x')