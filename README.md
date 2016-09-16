## Emulating

### Requirements

*  cordova v ~6.3.1
*  Xcode
*  Android SDK
*  Set up an Android AVD
*  run `npm install -g ios-sim`

This builds and installs the app. Further options are documented here:
[http://ionicframework.com/docs/v2/cli/emulate/].

`ionic emulate [ios|android]`

## Developing

This was built in Visual Studio Code, and contains the `.vscode` directory in
version control to aid configuration.

## Debugging

Locate the iOS sqlite database for your simulator via

`find ~/Library/Developer/CoreSimulator/Devices/ -name calmcopequit.db`

You can view and manipulate the data with an application such as
[DB Browser for SQLite](http://sqlitebrowser.org/), or via the console.

Note: this assumes Xcode 7.X.

Fetch the Android sqlite database for your emulator via

`adb pull /data/data/edu.northwestern.cbits.calmcopequit/databases/calmcopequit.db`

## Building

### Browser

To test in the browser, use `ionic build browser`.

### Staging

#### Android

Make sure you have the `~/.ssh/cbits.keystore` and `~/.ssh/android-build.json`
files in place.

`npm run build:android:staging`

#### iOS

Make sure you have the `~/.ssh/ios-build.json` file in place and the signing
certificate downloaded on your machine.

`npm run build:ios:staging`

## Deploying

### Android

Note: these instructions have been tested with Android SDK Tools version 25.1.7.

Once the build command has completed, the APK file produced can be uploaded to
HockeyApp for distribution.

### iOS

Note: these instructions have been tested with Xcode version 7.3.1.

Once the build command has completed, the application must be archived before it
can be uploaded via HockeyApp. Ensure that the following settings are configured
in the General tab in the Xcode project manager:

* Bundle Identifier (set to "edu.northwestern.cbits.calmcopequit")
* Version (set to the appropriate current semantic version)
* Deployment Target (set to the minimum supported iOS version)
* Devices (iPhone)

Go into the Product > Scheme > Edit Scheme... menu, select "Archive", then
for the Build Configuration "Release". Close the window, then set the active
scheme to "Generic iOS Device" (this can be found at the top of the window to
the right of the triangle, square, and product name.

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
