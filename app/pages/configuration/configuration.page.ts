import { Constants } from '../../constants.service';
import { FerronDevice } from '../../native-plugins/ferron-device.service';
import { HomePage } from '../../pages/home/home';
import { Store } from '../../store/store.service';
import { AuthenticationTokens } from './authentication-tokens.service';
import { Configuration } from './configuration.model';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

let TOKENS_RESOURCE_PATH = '/token_auth/api/authentication_tokens';

/*
 * First page seen by a user. Enables a one step configuration handshake with
 * the server.
 */
@Component({
  providers: [AuthenticationTokens, Constants, FerronDevice, Store],
  templateUrl: 'build/pages/configuration/configuration.html'
})
export class ConfigurationPage {
  public model = new Configuration('');

  constructor(private constants: Constants,
              private device: FerronDevice,
              private nav: NavController,
              private store: Store,
              private tokens: AuthenticationTokens) {
    this.store.authenticate()
      .then(this.goHome.bind(this))
      .catch(() => void 0);
  }

  public goHome() {
    this.nav.push(HomePage);
  }

  public createAuthenticationToken() {
    this.tokens.setUrl(this.constants.serverUrl + TOKENS_RESOURCE_PATH);
    this.tokens.setClientUuid(this.device.uuid);

    return this.tokens.create(this.model.token).then(response => {
      let authenticationToken = response.data.value;
      this.store.save(this.store.NAMES.AuthenticationTokens, {
        value: authenticationToken
      });
      this.store.save(this.store.NAMES.Devices, {
        device_uuid: this.device.uuid,
        device_version: this.device.version,
        manufacturer: this.device.manufacturer,
        model: this.device.model,
        platform: this.device.platform
      });
      this.goHome();
    }).catch(function(error) {
      alert(error.message);
    });
  }
}
