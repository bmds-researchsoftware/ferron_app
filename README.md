# Calm. Cope. Quit.

An app to promote smoking cessation.

## Release process

Update the CHANGELOG.md to reflect the latest updates. Update the `version`
attribute of the `widget` element in the `config.xml` file.

Integrating HockeySDK for analytics and crash reporting is currently a manual
process. Please follow the steps provided on the HockeyApp pages. You can find
them by clicking on the wrench icon next to the App ID on the HockeyApp project
pages. Make sure you use the correct App ID for each stage and/or platform.

### Android

Build the app for staging with `npm run build:android:staging`, and for
production with the analogous command. Upload to HockeyApp, and once the
production version has been vetted, upload it to the
[Play Store](https://play.google.com/apps/publish/).

### iOS

Build the app for staging with `npm run build:ios:staging`, and for production
with the analogous command. Within Xcode (7+), ensure the General settings are
appropriate and then select Product > Archive. Upload to HockeyApp, and once
the production version has been vetted, upload it to the App Store from Xcode.
