import { Injectable } from '@angular/core';
import { AppVersion } from 'ionic-native';

/*
 * Wraps the Ionic native plugin for more consistent DI and testing.
 */
@Injectable()
export class FerronAppVersion {
  public getVersionNumber(): Promise<string> {
    return AppVersion.getVersionNumber();
  }
}
