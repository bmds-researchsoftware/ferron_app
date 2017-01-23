import { CopingSkillsPage } from './coping-skills';
import { Constants } from '../../constants.service';
import { FerronDialogs } from '../../native-plugins/ferron-dialogs.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { ReasonsToQuitPage } from '../../pages/reasons-to-quit/reasons-to-quit';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('CopingSkillsPage', () => {
  let copingSkillsPage: CopingSkillsPage;
  let stubNavController = { push: jasmine.createSpy('push') };
  let stubSqlite = {
    initialize() { return Promise.resolve(); },
    persist: jasmine.createSpy('persist')
  };
  let stubDialogs = {
    confirm: jasmine.createSpy('confirm')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NavController, useValue: stubNavController },
        { provide: FerronSqlite, useValue: stubSqlite },
        { provide: Constants, useValue: { facebookGroupUrl: 'http://fb' } },
        { provide: FerronDialogs, useValue: stubDialogs },
        CopingSkillsPage
      ]
    });
  });

  beforeEach(() => {
    spyOn(window, 'open').and.callFake(() => { return true; });
  });

  beforeEach(inject([CopingSkillsPage], (copingSkills) => {
    copingSkillsPage = copingSkills;
    stubSqlite = copingSkills.sqlite;
  }));

  describe('#goReasonsToQuit', () => {
    it('navigates to the ReasonsToQuitPage', inject([CopingSkillsPage], (copingSkillsPage) => {
      copingSkillsPage.goReasonsToQuit();

      expect(stubNavController.push).toHaveBeenCalledWith(ReasonsToQuitPage);
    }));
  });

  describe('#goFacebook', () => {
    it('displays a dialog', (done) => {
      let resolver = Promise.resolve(0);
      stubDialogs.confirm.and.returnValue(resolver);

      copingSkillsPage.goFacebook();

      resolver.then(() => {
        expect(stubDialogs.confirm).toHaveBeenCalled();

        // reset spy
        stubDialogs.confirm.and.callThrough();
        done();
      });
    });

    describe('when the dialog is confirmed', () => {
      it('navigates to the Facebook group page URL', (done) => {
        let resolver = Promise.resolve(1);
        stubDialogs.confirm.and.returnValue(resolver);

        copingSkillsPage.goFacebook();

        resolver.then(() => {
          expect(window.open).toHaveBeenCalledWith('http://fb', '_system');

          // reset spy
          stubDialogs.confirm.and.callThrough();
          done();
        });
      });

      it('records the button press', (done) => {
        let resolver = Promise.resolve(1);
        stubDialogs.confirm.and.returnValue(resolver);

        copingSkillsPage.goFacebook();

        resolver.then(() => {
          expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
            button_label: 'Join our Facebook support group',
            current_page: 'Coping skills'
          });

          // reset spy
          stubDialogs.confirm.and.callThrough();
          done();
        });
      });
    });

    describe('when the dialog is rejected', () => {
      it('does not navigate anywhere', (done) => {
        let resolver = Promise.resolve(0);
        stubDialogs.confirm.and.returnValue(resolver);

        copingSkillsPage.goFacebook();

        resolver.then(() => {
          expect(window.open).not.toHaveBeenCalled();

          // reset spy
          stubDialogs.confirm.and.callThrough();
          done();
        });
      });

      it('does not record the button press', (done) => {
        let resolver = Promise.resolve(0);
        stubDialogs.confirm.and.returnValue(resolver);
        stubSqlite.persist.calls.reset();

        copingSkillsPage.goFacebook();

        resolver.then(() => {
          expect(stubSqlite.persist).not.toHaveBeenCalled();

          // reset spy
          stubDialogs.confirm.and.callThrough();
          done();
        });
      });
    });
  });
});
