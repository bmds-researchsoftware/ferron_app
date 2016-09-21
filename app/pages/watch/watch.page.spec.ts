import { WatchPage } from './watch.page';
import { beforeEachProviders, describe } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('WatchPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };

  beforeEachProviders(() => [
    WatchPage, { provide: NavController, useValue: stubNavController }
  ]);
});
