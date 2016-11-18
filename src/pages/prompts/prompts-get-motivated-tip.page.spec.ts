import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { PromptsGetMotivatedTipPage } from './prompts-get-motivated-tip.page';
import { TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from 'ionic-angular';

describe('PromptsGetMotivatedTipPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };
  let stubSqlite = {
    initialize() { return Promise.resolve(); },
    fetchAll() { return Promise.resolve([{ body: 'b1' }]); }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NavController, useValue: stubNavController },
        { provide: FerronSqlite, useValue: stubSqlite },
        PromptsGetMotivatedTipPage
      ]
    });
  });

  describe('#reloadPage', () => {
    it('reloads the PromptsGetMotivatedTipPage', inject([PromptsGetMotivatedTipPage], get_motivatedTipPage => {
      get_motivatedTipPage.reloadPage();

      expect(stubNavController.push).toHaveBeenCalledWith(PromptsGetMotivatedTipPage);
    }));
  });
});
