import { ReasonsToQuitPage } from './reasons-to-quit';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('ReasonsToQuitPage', () => {
  let reasonsToQuitPage: ReasonsToQuitPage;
  let stubSqlite = {
    initialize() { return Promise.resolve(); },
    persist: jasmine.createSpy('persist'),
    fetchAll: jasmine.createSpy('fetchAll')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NavController, useClass: NavController },
        { provide: FerronSqlite, useValue: stubSqlite },
        ReasonsToQuitPage
      ]
    });
  });
  
  beforeEach(inject([ReasonsToQuitPage], (reasonsToQuit) => {
    reasonsToQuitPage = reasonsToQuit;
    stubSqlite = reasonsToQuit.sqlite;
  }));

  describe('#refreshSelections', () => {
    it('marks as checked reasons found in the database', () => {
      let resolver = Promise.resolve([{
        uuid: 'abc',
        reason_to_quit_title: 'I want more energy'
      }]);
      stubSqlite.fetchAll.and.returnValue(resolver);

      reasonsToQuitPage.refreshSelections();
      resolver.then(() => {
        expect(reasonsToQuitPage.reasons[0].checked).toBe(true);
      });
    });

    it('stores as the model reasons not matched in the list', () => {
      let resolver = Promise.resolve([{
        uuid: 'abc',
        reason_to_quit_title: 'something else'
      }]);
      stubSqlite.fetchAll.and.returnValue(resolver);

      reasonsToQuitPage.refreshSelections();
      resolver.then(() => {
        expect(reasonsToQuitPage.additionalResponse.text).toEqual('something else');
        expect(reasonsToQuitPage.additionalResponse.uuid).toEqual('abc');
      });
    });
  });

  describe('#saveAdditionalResponse', () => {
    it('persists the additional response text', () => {
      reasonsToQuitPage.additionalResponse.text = 'foobar';

      reasonsToQuitPage.saveAdditionalResponse();

      expect(stubSqlite.persist).toHaveBeenCalledWith('reason_to_quit_responses', {
        uuid: null,
        reason_to_quit_title: 'foobar'
      });
    });
  });
});