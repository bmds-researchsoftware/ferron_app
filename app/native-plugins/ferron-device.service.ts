import { Injectable } from '@angular/core';
import { Device } from 'ionic-native';

let DEFAULT_UUID: string = 'DEFAULT-UUID';

/*
 * Wraps the Ionic native plugin for more consistent DI and testing.
 */
@Injectable()
export class FerronDevice {
  public uuid(): string {
    return Device.device.uuid || DEFAULT_UUID;
  }

  public version(): string {
    return Device.device.version || '';
  }

  public manufacturer(): string {
    return Device.device.manufacturer || '';
  }

  public model(): string {
    return Device.device.model || '';
  }

  public platform(): string {
    return Device.device.platform || '';
  }
}
