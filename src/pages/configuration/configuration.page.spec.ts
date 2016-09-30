
import { Constants } from '../../constants.service';
import { FerronDevice } from '../../native-plugins/ferron-device.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { HomePage } from '../../pages/home/home';
import { Store } from '../../store/store.service';
import { AuthenticationTokens } from './authentication-tokens.service';
import { ConfigurationPage } from './configuration.page';
import { TestBed, inject } from '@angular/core/testing';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';

describe('ConfigurationPage', () => {
  let device = {
    manufacturer: () => 'manufacturer',
    model: () => 'model',
    platform: () => 'platform',
    uuid: () => 'uuid',
    version: () => 'version'
  };
  let stubNavController = { push: jasmine.createSpy('push') };
  let stubPlatform = {
    ready() { return Promise.resolve(); }
  };
  let stubSqlite = {
    initialize() { return Promise.resolve(); },
    persist: jasmine.createSpy('persist')
  };
  let tokenAttrs = { value: 'abcde' };
  let stubAuthTokens = {
    create(token) {
      return this.createPromise;
    },
    createPromise: Promise.resolve({ data: tokenAttrs }),
    setClientUuid: () => void 0,
    setUrl: () => void 0
  };
  let stubStore = {
    authenticate: () => { return Promise.reject(null); }
  };
  let configPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationPage],
      providers: [
        { provide: Constants, useValue: {} },
        { provide: FerronDevice, useValue: device },
        { provide: NavController, useValue: stubNavController },
        { provide: Platform, useValue: stubPlatform },
        { provide: FerronSqlite, useValue: stubSqlite },
        { provide: Store, useValue: stubStore },
        { provide: AuthenticationTokens, useValue: stubAuthTokens}
      ]
    });
  });

  beforeEach(inject([ConfigurationPage], (config) => {
    configPage = config;
  }));

  describe('#goHome', () => {
    it('navigates to the HomePage', () => {
      configPage.goHome();

      expect(stubNavController.push).toHaveBeenCalledWith(HomePage);
    });
  });

  describe('#createAuthenticationToken', () => {
    describe('when the token is successfully created', () => {
      it('saves the value', done => {
        configPage.createAuthenticationToken();

        stubAuthTokens.createPromise.then(() => {
          expect(stubSqlite.persist).toHaveBeenCalledWith('authentication_tokens', {
            value: 'abcde'
          });
          done();
        });
      });

      it('saves the device', done => {
        configPage.createAuthenticationToken();

        stubAuthTokens.createPromise.then(() => {
          expect(stubSqlite.persist).toHaveBeenCalledWith('devices', {
            device_uuid: device.uuid(),
            device_version: device.version(),
            manufacturer: device.manufacturer(),
            model: device.model(),
            platform: device.platform()
          });
          done();
        });
      });

      it('navigates to the HomePage', done => {
        configPage.createAuthenticationToken();

        stubAuthTokens.createPromise.then(() => {
          expect(stubNavController.push).toHaveBeenCalledWith(HomePage);
          done();
        });
      });
    });
  });
});
