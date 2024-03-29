import { Constants } from '../../constants.service';
import { FerronDevice } from '../../native-plugins/ferron-device.service';
import { FerronLocalNotifications } from '../../native-plugins/ferron-local-notifications.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { HomePage } from '../../pages/home/home';
import { PromptsPage } from '../../pages/prompts/prompts.page';
import { Store } from '../../store/store.service';
import { AuthenticationTokens } from './authentication-tokens.service';
import { Configuration } from './configuration.model';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';

let TOKENS_RESOURCE_PATH = '/token_auth/api/authentication_tokens';

/*
 * First page seen by a user. Enables a one step configuration handshake with
 * the server.
 */
@Component({
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {
  public model = new Configuration('');
  public appStage: string;

  constructor(public constants: Constants,
              public device: FerronDevice,
              public nav: NavController,
              public notifications: FerronLocalNotifications,
              public platform: Platform,
              public sqlite: FerronSqlite,
              public store: Store,
              public tokens: AuthenticationTokens) {
    this.platform.ready().then(() => {
      // When a participant enters the app via a notification, direct them to
      // coping skills prompt.
      this.notifications.on('click', _ => {
        this.nav.push(PromptsPage);
      })
      this.sqlite.initialize().then(() => {
        this.authorize();
      });
      this.appStage = constants.appStage;
    });
  }

  public authorize() {
    this.store.authenticate()
        .then(() => {
          this.goHome();
        })
        .catch(() => void 0);
  }

  public goHome() {
    this.nav.setRoot(HomePage);
  }

  public createAuthenticationToken() {
    this.tokens.setUrl(this.constants.serverUrl + TOKENS_RESOURCE_PATH);
    this.tokens.setClientUuid(this.device.uuid());

    return this.tokens.create(this.model.token).then(response => {
      let authenticationToken = response.data.value;
      this.sqlite.persist('authentication_tokens', {
        value: authenticationToken
      });
      this.sqlite.persist('devices', {
        device_uuid: this.device.uuid(),
        device_version: this.device.version(),
        manufacturer: this.device.manufacturer(),
        model: this.device.model(),
        platform: this.device.platform()
      });
      this.authorize();
    }).catch(error => {
      alert(error.message);
    });
  }
}
