## React Stack
React stack is an opinionated starter kit for *real-time* web development using ReactJS.

The goal of the stack is to create a conventional paradigm in thinking and toolchain
that maximise developer's happiness in creating *real-time* web app.

## Background
Building real-time app is difficult due to complexity in updating DOM, syncing with the database via web socket/API, and offline persistency.

Our target audience is developer (aka coders) who wants to push features fast to production and do not want to wrestle with servers deployment.

## Stack Technologies & Style
- Functional programming (FP) using Ramda
- Firebase database for real-time database syncing and web sockets (solves a lot of problem in deployment and maintenance)
- ReactJS (duh!)
- Redux (FP style state management)
- Flow for type checking and null exception
- Jest for BDD/TDD
- Babel
- Eslint
- Webpack 2 for packing our code

- Redux-form to manage form state
- Redux-persist to manage offline caching
- Redux-thunk to manage async actions such as API calls
- Ducks to structure our redux actions, creators and reducers

## Upgrading
React ecosystem is moving very quickly so you should check and upgrade the packages each time you clone this repository. Here's a list of packages that you should always check:

- react-router-dom: From react-router version 4 which is in alpha (as of writing)

## TODO
- `yarn add` all dependencies for latest version on every clone
- Add Fluture?
- Add firebase + firebase mock?
- Add explanation for each technology in README
