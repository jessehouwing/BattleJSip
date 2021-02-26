# Getting Started

```sh
npm install -g yarn 
yarn install --frozen-lockfile
yarn start 
```

Browse to [http://localhost:8080/](http://localhost:8080/) to view your app.

The application will automatically reload on file change. Note this is a full reload, not a hot module replacement.

# Code quality
This project has a lint config which tries to avoid writing bugs combined with a config which ensures consistent code style. Running `yarn lint` which automatically reformat your code and fix some lint errors.

```sh
# Run linter with autofix
yarn lint
```

The linter is [Eslint](https://eslint.org/) with the [configuration](https://www.npmjs.com/package/eslint-config-react-app) of `create-react-app`. [Prettier](https://prettier.io/) is integrated in `eslint` to automatically provide a consistent code style.

# Testing
By default `yarn test` will only run the tests related to changed files. Press `a` to run all tests or press `enter` to rerun the tests. Read the tools "usage" output to see other run options.

```sh
# Starts test runner in watch mode
yarn test
```

The test runner is [Jest](https://facebook.github.io/jest/) which provides support for test coverage reporting, mocks and snapshot testing.

# Background
Consider this code as inherited code from previous developers. This means you can't make any assumptions on the fitness of the code. **It might be incorrect, unmaintainable, untestable, incomplete or just plain bad.** Feel free to improve some or all of it.

This folder contains a Battleship game implemented in vanilla JavaScript with a [React](https://reactjs.org/) interface. A basic [Webpack](https://webpack.js.org/) with [Babel](https://babeljs.io/) configuration is used instead of a more complex approach. Importing CSS in JavaScript is supported and exposed as global CSS. Currently the application does not have much CSS.

# License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/jessehouwing/BattleJSip">BattleJSip</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://xpirit.com">Xpirit Netherlands BV</a> is licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-SA 4.0

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>
