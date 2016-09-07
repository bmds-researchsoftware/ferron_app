/*
 * Acts as a proxy for the Web Worker side of things. Passes messages to the
 * StoreWorker.
 */
import { FerronSqlite } from '../native-plugins/ferron-sqlite.service';
import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';

const PAYLOADS_API_PATH = '/token_auth/api/payloads';
const SYNC_PERIOD_IN_MS = 2 * 60 * 1000;

@Injectable()
export class Store {
  private static authentication: Promise<{}>;
  private static authenticated: (value?: {} | PromiseLike<{}>) => void;
  private static notAuthenticated: (reason?: any) => void;

  constructor(private sqlite: FerronSqlite) {}

  public authenticate(): Promise<{}> {
    if (Store.authentication == null) {
      Store.authentication = new Promise((resolve, reject) => {
        Store.authenticated = resolve;
        Store.notAuthenticated = reject;
      });
      this.checkAuthentication();
    }

    return Store.authentication;
  }

  public resetAuthentication(): void {
    Store.authentication = null;
  }

  private checkAuthentication() {
    this.sqlite.first('authentication_tokens').then(token => {
      if (token == null) {
        Store.notAuthenticated();
        Store.authentication = null;
        Store.authenticated = null;
        Store.notAuthenticated = null;

        return;
      }

      Store.authenticated();
      this.sqlite.first('devices').then(device => {
        this.startSynchronization(device, token);
      });
    });
  }

  private startSynchronization(device, token) {
    let cbit = (<any> window).cbit;
    let CalmCopeQuit = (<any> window).CalmCopeQuit;

    cbit.Payload
        .setUrl(CalmCopeQuit.SERVER_URL + PAYLOADS_API_PATH)
        .setSecret(token.value)
        .setKey(device.device_uuid);
    this.sqlite.setPayloadResource(cbit.Payload);
    this.sqlite.setPeriod(SYNC_PERIOD_IN_MS);
    this.sqlite.setNetwork({
           hasConnection() {
             let NONE = 'none';
             let UNKNOWN = 'unknown';
             return Network.connection !== NONE &&
                    Network.connection !== UNKNOWN;
           }
         });
    this.sqlite.run();
  }
}
