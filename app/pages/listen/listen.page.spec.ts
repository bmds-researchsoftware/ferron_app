import { ListenPage } from './listen.page';
import { beforeEachProviders, describe } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('ListenPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };

  beforeEachProviders(() => [
    ListenPage, { provide: NavController, useValue: stubNavController }
  ]);
});
