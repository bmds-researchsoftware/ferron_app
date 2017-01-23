import { PromptsLearnASkillPage } from './prompts-learn-a-skill.page';
import { PromptsQuitTipPage } from './prompts-quit-tip.page';
import { PromptsTryingToQuitPage } from './prompts-trying-to-quit.page';
import { Constants } from '../../constants.service';
import { FerronDialogs } from '../../native-plugins/ferron-dialogs.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('PromptsTryingToQuitPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };
  let tryingToQuitPage;
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
        PromptsTryingToQuitPage
      ]
    });
  });

  beforeEach(() => {
    spyOn(window, 'open').and.callFake(() => { return true; });
  });

  beforeEach(inject([PromptsTryingToQuitPage], page => {
    tryingToQuitPage = page;
    stubSqlite = tryingToQuitPage.sqlite;
  }));

  describe('#goLearnASkill', () => {
    it('navigates to the PromptsLearnASkillPage', () => {
      tryingToQuitPage.goLearnASkill();

      expect(stubNavController.push).toHaveBeenCalledWith(PromptsLearnASkillPage);
    });
  });

  describe('#goQuitTip', () => {
    it('navigates to the PromptsQuitTipPage', () => {
      tryingToQuitPage.goQuitTip();

      expect(stubNavController.push).toHaveBeenCalledWith(PromptsQuitTipPage);
    });
  });

  describe('#goFacebook', () => {
    it('displays a dialog', (done) => {
      let resolver = Promise.resolve(0);
      stubDialogs.confirm.and.returnValue(resolver);

      tryingToQuitPage.goFacebook();

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

        tryingToQuitPage.goFacebook();

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

        tryingToQuitPage.goFacebook();

        resolver.then(() => {
          expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
            button_label: 'Join our Facebook support group',
            current_page: 'Trying to quit'
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

        tryingToQuitPage.goFacebook();

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

        tryingToQuitPage.goFacebook();

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
