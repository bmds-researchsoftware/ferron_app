import { Constants } from '../../constants.service';
import { FerronAppVersion } from '../../native-plugins/ferron-app-version.service';
import { FerronDevice } from '../../native-plugins/ferron-device.service';
import { AboutPage } from '../../pages/about/about';
import {
  beforeEachProviders,
  describe,
  inject,
  it
} from '@angular/core/testing';

describe('AboutPage', () => {
  let aboutPage: AboutPage;
  let stubConstants = { appStage: 'test' };
  let versionPromise = Promise.resolve('3.2.1');
  let stubAppVersion = {
    getVersionNumber: () => { return versionPromise; }
  };
  let stubDevice = { uuid: () => 'abc123' };

  beforeEachProviders(() => [
    AboutPage,
    { provide: Constants, useValue: stubConstants },
    { provide: FerronAppVersion, useValue: stubAppVersion },
    { provide: FerronDevice, useValue: stubDevice }
  ]);

  beforeEach(inject([AboutPage], (about) => {
    aboutPage = about;
  }));

  describe('#appStage', () => {
    it('returns the stage', () => {
      expect(aboutPage.appStage).toEqual('test');
    });
  });

  describe('#deviceUuid', () => {
    it('returns the uuid', () => {
      expect(aboutPage.deviceUuid).toEqual('abc123');
    });
  });

  describe('#appVersion', () => {
    it('returns the uuid', done => {
      versionPromise.then(() => {
        expect(aboutPage.appVersion).toEqual('3.2.1');
        done();
      });
    });
  });
});
