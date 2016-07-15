import { Injectable } from '@angular/core';
import { Device } from 'ionic-native';

let DEFAULT_UUID: string = 'DEFAULT-UUID';

@Injectable()
export class FerronDevice {
  public uuid: string = Device.device.uuid || DEFAULT_UUID;
}
