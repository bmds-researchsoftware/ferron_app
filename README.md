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

## Building

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
