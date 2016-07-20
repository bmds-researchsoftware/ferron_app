## Building

### Android

`ionic build android`

### iOS

`ionic build ios`

## Emulating

This builds and installs the app. Further options are documented here:
[http://ionicframework.com/docs/v2/cli/emulate/].

`ionic emulate [ios|android]`

## Developing

This was built in Visual Studio Code, and contains the `.vscode` directory in
version control to aid configuration.

## Feature Testing

First, make sure your dependencies are installed.

```
npm install
```

Once dependencies are installed, in a terminal window, run:

```
webdriver-manager update
```

```
webdriver-manager start
```

**Note**: You will only need to run the update the first time.

Once the webdriver is started, you will then need to run the app in the
browser, in a separate terminal window:

```
ionic serve --nobrowser --address localhost
```

Once set up is complete, in a third terminal window you can simply run:

```
protractor spec/conf.js
```
