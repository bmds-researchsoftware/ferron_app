import { Injectable } from '@angular/core';
import { Device } from 'ionic-native';

let DEFAULT_UUID: string = 'DEFAULT-UUID';

/*
 * Wraps the Ionic native plugin for more consistent DI and testing.
 */
@Injectable()
export class FerronDevice {
  public uuid(): string {
    return (<any> Device).uuid || DEFAULT_UUID;
  }

  public version(): string {
    return (<any> Device).version || '';
  }

  public manufacturer(): string {
    return (<any> Device).manufacturer || '';
  }

  public model(): string {
    return (<any> Device).model || '';
  }

  public platform(): string {
    return (<any> Device).platform || '';
  }
}
