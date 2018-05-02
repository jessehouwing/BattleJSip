# Getting Started

```sh
npm install
npm start 
```

Browse to [http://localhost:8080/](http://localhost:8080/) to view your app.

The application will automatically reload on file change. Note this is a full reload, not a hot module replacement.

# Code quality
This project has a lint config which tries to avoid writing bugs combined with a config which ensures consistent code style. Running `npm run lint` which automatically reformat your code and fix some lint errors.

```sh
# Run linter with autofix
npm run lint
```

The linter is [Eslint](https://eslint.org/) with the [configuration](https://www.npmjs.com/package/eslint-config-react-app) of `create-react-app`. [Prettier](https://prettier.io/) is integrated in `eslint` to automatically provide a consistent code style.

# Testing
By default `npm test` will only run the tests related to changed files. Press `a` to run all tests or press `enter` to rerun the tests. Read the tools "usage" output to see other run options.

```sh
# Starts test runner in watch mode
npm test
```

The test runner is [Jest](https://facebook.github.io/jest/) which provides support for test coverage reporting, mocks and snapshot testing.

# Background
Consider this code as inherited code from previous developers. This means you can't make any assumptions on the fitness of the code. **It might be incorrect, unmaintainable, untestable, incomplete or just plain bad.** Feel free to improve some or all of it.

This folder contains a Battleship game implemented in vanilla JavaScript with a [React](https://reactjs.org/) interface. A basic [Webpack](https://webpack.js.org/) with [Babel](https://babeljs.io/) configuration is used instead of a more complex approach. Importing CSS in JavaScript is supported and exposed as global CSS. Currently the application does not have any CSS.

