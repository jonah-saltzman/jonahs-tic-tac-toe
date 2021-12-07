
# MegaMax Tic-Tac-Toe

This is MegaMax, a tic-tac-toe game client & my first project for the General Assembly software
engineering course. MegaMax gets its name from the "mega" 5x5 game mode option and the MinMax
algorithm it uses to make the best move for the computer player. MegaMax is a single-page application
that uses a public API for authentication, as well as for saving and updating game states. The 
application is written entirely in JavaScript, and makes use of Bootstrap and SCSS for UI elements 
& styling, and jQuery for dynamic UI manipulation.  

## Requirements

The "minimum viable project" requirements for this project are, in  
addition to this readme.md file:  

### Application Requirements

- User must be able to sign up  
- User must be able to sign in  
- Signed in user must be able to sign out  
- Signed in user user must be able to start a tic tac toe game  
- When playing game, user must start as X and then rotate between X and O  
- When playing game, user must only select available spaces on the board  
- When playing game, user must be notified of win or tie  
- Once a game is over, user must not be able to add to that board  
- Once a game is over, user must be able to play again  

### API Requirements

- Sign up (`POST /sign-up`)
- Sign in (`POST /sign-in`)
- Sign out (`DELETE /sign-out`)
- New game (`POST /games`)
- Update game (`PATCH /games/:id`)
- Display a message to the user after sign in, sign up, and  
sign out success or failure.
- Sign in and sign up forms must clear after submit success

## Structure

The MegaMax application consists of an `index.html` file containing  
initial UI

### App

Developers should store JavaScript files in [`app`](app).
The "manifest" or entry-point is
[`app/app.js`](app/app.js). In general, only
application initialization goes in this file. It's normal for developers to
start putting all code in this file, but encourage them to break out different
responsibilities and use the `require` syntax put references where they're
needed.

### Config

Developers should set `apiUrls.production` and `apiUrls.development` in
[`app/config.js`](app/config.js).  With
`apiUrls` set, developers may rely on `apiUrl` as the base for API
URLs.

### Styles

Developers should store styles in [`app/styles`](app/styles) and load them
from [`app/styles/index.scss`](app/styles/index.scss). Bootstrap version 3 is
included in this template.

### Forms and Using `getFormFields`

Developers should use [getFormFields](get-form-fields.md) to retrieve form data
to send to an API.

### Deployment

To deploy a browser-template based SPA, run `grunt deploy`.

## Adding Images

To add images to your project, you must store them in the `public` directory.
To use the image in HTML or CSS, write the path to the image like this:

```html
<img src="public/cat.jpg">
```
or
```css
#my-cool-div {
  background-image: url('public/cat.jpg')
}
```

Note that there's no `./` or `/` in front of `public/filename.jpg`.

## Adding Fonts

To add custom fonts to your app, you can either use a CDN like Google Fonts, or
you can download the fonts and save them in the `public` directory. If you use
the former method, follow the directions on the website providing the fonts.

For local fonts, put the files in `public`, and then import and use them in a
`.scss` file like this:

```scss
@font-face {
  font-family: 'Nature Beauty';
  src: url('public/Nature-Beauty.ttf') format('truetype');
}

.element-with-custom-font {
  font-family: 'Nature Beauty';
}
```

## Tasks

Developers should run these often!

- `grunt nag` or just `grunt`: runs code quality analysis tools on your code
    and complains
- `grunt make-standard`: reformats all your code in the JavaScript Standard Style
- `grunt <server|serve|s>`: generates bundles, watches, and livereloads
- `grunt build`: place bundled styles and scripts where `index.html` can find
    them
- `grunt deploy`: builds and deploys main branch


## Additional Resources

- [Modern Javascript Explained for Dinosaurs](https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70)
- [Making Sense of Front End Build Tools](https://medium.freecodecamp.org/making-sense-of-front-end-build-tools-3a1b3a87043b)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
