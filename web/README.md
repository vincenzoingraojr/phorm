# Phorm | Web

This web app uses React.js and Apollo Client. It is written in TypeScript, and I use `styled-components` to style the web app.

## How to start the local front-end development

To start the development server properly, follow these instructions:

-   Run `yarn` to install all dependencies
-   Configure the [back-end](../server)
-   Create a `.env` file in the root of the `client` folder
-   Copy the content of the existent `.env.example` file inside the `.env` file
-   Assign a value to the environment variables you find inside the `.env` file. It's usually done this way: `REACT_APP_ENV=development`, `REACT_APP_SERVER_ORIGIN=http://localhost:4000` and `REACT_APP_WS_SERVER_ORIGIN=ws://localhost:4000`. For the `REACT_APP_STORAGE_LINK`, use the public endpoint of a bucket of your choice.
-   Run `yarn start`
