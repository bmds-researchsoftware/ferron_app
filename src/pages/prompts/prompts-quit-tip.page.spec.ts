import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { PromptsQuitTipPage } from './prompts-quit-tip.page';
import { TestBed, inject } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('PromptsQuitTipPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };
  let stubSqlite = {
    initialize() { return Promise.resolve(); },
    fetchAll() { return Promise.resolve([{ body: 'b1' }]); }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromptsQuitTipPage],
      providers: [
        { provide: NavController, useValue: stubNavController },
        { provide: FerronSqlite, useValue: stubSqlite }
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