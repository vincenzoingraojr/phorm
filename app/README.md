# Phorm | App

This mobile app project uses React Native (Expo) and Apollo Client. It is written in TypeScript.

## How to start the local front-end development

To start the development server properly, follow these instructions:

-   Run `yarn` to install all dependencies
-   Configure the [back-end](../server)
-   Create a `.env` file in the root of the `app` folder
-   Copy the content of the existent `.env.example` file inside the `.env` file
-   Assign a value to the environment variables you find inside the `.env` file. It's usually done this way: `REACT_APP_ENV=development`, `REACT_APP_SERVER_ORIGIN=http://localhost:4000`, and `REACT_APP_WS_SERVER_ORIGIN=ws://localhost:4000`. For the `REACT_APP_STORAGE_LINK`, use the public endpoint of a bucket of your choice.
-   Run `yarn start`

Even if the app could run in the web, it's not built for that environment. It works without errors on Android and iOS, and to actually run the development version of the app in your computer, you need to install the Android Emulator or the iOS Simulator (only on macOS) — or both — or you can use Expo Go on your devices. For more information, read the [Expo docs](https://docs.expo.dev/get-started/expo-go/) or visit the [official React Native documentation](https://reactnative.dev/docs/environment-setup).
