
import { Constants } from '../../constants.service';
import { FerronDevice } from '../../native-plugins/ferron-device.service';
import { HomePage } from '../../pages/home/home';
import { Store } from '../../store/store.service';
import { AuthenticationTokens } from './authentication-tokens.service';
import { ConfigurationPage } from './configuration.page';
import { beforeEachProviders, describe, inject, it } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('ConfigurationPage', () => {
  let tokenAttrs = { value: 'abcde' };
  let stubAuthTokens = {
    create(token) {
      return this.createPromise;
    },
    createPromise: Promise.resolve({ data: tokenAttrs }),
    setClientUuid: () => void 0,
    setUrl: () => void 0
  };
  let device = {
    manufacturer: () => 'manufacturer',
    model: () => 'model',
    platform: () => 'platform',
    uuid: () => 'uuid',
    version: () => 'version'
  };
  let stubNavController = { push: jasmine.createSpy('push') };
  let stubStore = {
    NAMES: {},
    authenticate: () => { return Promise.reject(null); },
    save: jasmine.createSpy('save')
  };
  let configPage;

  beforeEachProviders(() => [
    ConfigurationPage,
    { provide: AuthenticationTokens, useValue: stubAuthTokens},
    { provide: Constants, useValue: {} },
    { provide: FerronDevice, useValue: device },
    { provide: NavController, useValue: stubNavController },
    { provide: Store, useValue: stubStore }
  ]);

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
          expect(stubStore.save).toHaveBeenCalledWith(void 0, {
            value: 'abcde'
          });
          done();
        });
      });

      it('saves the device', done => {
        configPage.createAuthenticationToken();

        stubAuthTokens.createPromise.then(() => {
          expect(stubStore.save).toHaveBeenCalledWith(void 0, {
            device_uuid: device.uuid,
            device_version: device.version,
            manufacturer: device.manufacturer,
            model: device.model,
            platform: device.platform
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
