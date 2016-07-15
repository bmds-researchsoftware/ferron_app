import { Injectable } from '@angular/core';
import { AppVersion } from 'ionic-native';

@Injectable()
export class FerronAppVersion {
  public getVersionNumber(): Promise<string> {
    return AppVersion.getVersionNumber();
  }
}
