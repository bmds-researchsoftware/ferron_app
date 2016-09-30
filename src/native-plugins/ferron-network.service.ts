import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';

/*
 * Wraps the Ionic native plugin for more consistent DI and testing.
 */
@Injectable()
export class FerronNetwork {
  public isConnected(): boolean {
    return Network.connection !== 'none' && Network.connection !== 'unknown';
  }
}
