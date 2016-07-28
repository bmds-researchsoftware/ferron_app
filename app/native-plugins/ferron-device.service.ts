import { Injectable } from '@angular/core';
import { Device } from 'ionic-native';

let DEFAULT_UUID: string = 'DEFAULT-UUID';

/*
 * Wraps the Ionic native plugin for more consistent DI and testing.
 */
@Injectable()
export class FerronDevice {
  public uuid: string = Device.device.uuid || DEFAULT_UUID;
  public version: string = Device.device.version || '';
  public manufacturer: string = Device.device.manufacturer || '';
  public model: string = Device.device.model || '';
  public platform: string = Device.device.platform || '';
}
