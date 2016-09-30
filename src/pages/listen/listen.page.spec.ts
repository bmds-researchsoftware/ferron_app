import { ListenPage } from './listen.page';
import { TestBed } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('ListenPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListenPage],
      providers: [{ provide: NavController, useValue: stubNavController }]
    });
  });
});
