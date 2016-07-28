import { Constants } from '../../constants.service';
import { FerronAppVersion } from '../../native-plugins/ferron-app-version.service';
import { FerronDevice } from '../../native-plugins/ferron-device.service';
import { Component } from '@angular/core';

/*
 * Provides metadata about the app alongside static content.
 */
@Component({
  providers: [Constants, FerronAppVersion, FerronDevice],
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  public appStage: string;
  public appVersion: string;
  public deviceUuid: string;

  constructor(private constants: Constants,
              private version: FerronAppVersion,
              private device: FerronDevice) {
    this.appStage = constants.appStage;
    this.deviceUuid = device.uuid;
    version.getVersionNumber().then(v => {
      this.appVersion = v;
    });
  }
}
