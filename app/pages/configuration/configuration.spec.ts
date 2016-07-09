
import { HomePage } from '../../pages/home/home';
import { ConfigurationPage } from './configuration';
import { beforeEachProviders, describe, inject, it } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('ConfigurationPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };

  beforeEachProviders(() => [
    ConfigurationPage, { provide: NavController, useValue: stubNavController }
  ]);

  describe('#goHome', () => {
    it('navigates to the HomePage', inject([ConfigurationPage], (configPage) => {
      configPage.goHome();

      expect(stubNavController.push).toHaveBeenCalledWith(HomePage);
    }));
  });
});
