import { Constants } from '../../constants.service';
import { FerronAppVersion } from '../../native-plugins/ferron-app-version.service';
import { FerronDevice } from '../../native-plugins/ferron-device.service';
import { AboutPage } from '../../pages/about/about';
import { TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AboutPage', () => {
  let aboutPage: AboutPage;
  let stubConstants = { appStage: 'test' };
  let versionPromise = Promise.resolve('3.2.1');
  let stubAppVersion = {
    getVersionNumber: () => { return versionPromise; }
  };
  let stubDevice = { uuid: () => 'abc123' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Constants, useValue: stubConstants },
        { provide: FerronAppVersion, useValue: stubAppVersion },
        { provide: FerronDevice, useValue: stubDevice },
        AboutPage
      ]
    });
  });

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
