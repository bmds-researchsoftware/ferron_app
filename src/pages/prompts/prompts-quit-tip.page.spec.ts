import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { PromptsQuitTipPage } from './prompts-quit-tip.page';
import { TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from 'ionic-angular';

describe('PromptsQuitTipPage', () => {
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
        PromptsQuitTipPage
      ]
    });
  });

  describe('#reloadPage', () => {
    it('reloads the PromptsQuitTipPage', inject([PromptsQuitTipPage], quitTipPage => {
      quitTipPage.reloadPage();

      expect(stubNavController.push).toHaveBeenCalledWith(PromptsQuitTipPage);
    }));
  });
});
