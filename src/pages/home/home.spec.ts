import { Constants } from '../../constants.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { FerronDialogs } from '../../native-plugins/ferron-dialogs.service';
import { AboutPage } from '../../pages/about/about';
import { CopingSkillsPage } from '../../pages/coping-skills/coping-skills';
import { LearnPage } from '../../pages/learn/learn';
import { PromptsPage } from '../../pages/prompts/prompts.page';
import { RemindersPage } from '../../pages/reminders/reminders';
import { HomePage } from './home';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('HomePage', () => {
  let homePage: HomePage;
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
        HomePage
      ]
    });
  });

  beforeEach(() => {
    spyOn(window, 'open').and.callFake(() => { return true; });
  });

  beforeEach(inject([HomePage], (home) => {
    homePage = home;
    stubSqlite = home.sqlite;
  }));

  afterEach(() => {
    window.localStorage.clear();
    stubSqlite.persist.calls.reset();
  });

  describe('#goAbout', () => {
    it('navigates to the AboutPage', () => {
      homePage.goAbout();

      expect(stubNavController.push).toHaveBeenCalledWith(AboutPage);
    });

    it('records the button press', () => {
      homePage.goAbout();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'About',
        current_page: 'Main page'
      });
    });
  });

  describe('#goCopingSkills', () => {
    it('navigates to the CopingSkillsPage', () => {
      homePage.goCopingSkills();

      expect(stubNavController.push).toHaveBeenCalledWith(CopingSkillsPage);
    });

    it('records the button press', () => {
      homePage.goAbout();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'List of coping skills',
        current_page: 'Main page'
      });
    });
  });

  describe('#goLearn', () => {
    it('navigates to the LearnPage', () => {
      homePage.goLearn();

      expect(stubNavController.push).toHaveBeenCalledWith(LearnPage);
    });

    it('records the button press', () => {
      homePage.goAbout();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'Learn to cope with urges to smoke',
        current_page: 'Main page'
      });
    });
  });

  describe('#goPrompts', () => {
    it('navigates to the PromptsPage', () => {
      homePage.goPrompts();

      expect(stubNavController.push).toHaveBeenCalledWith(PromptsPage);
    });

    it('records the button press', () => {
      homePage.goPrompts();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'Start here',
        current_page: 'Main page'
      });
    });

    it('changes the label', () => {
      homePage.goPrompts();

      expect(homePage.promptsLabel()).toEqual('Check-in');
    });
  });

  describe('#goReminders', () => {
    it('navigates to the RemindersPage', () => {
      homePage.goReminders();

      expect(stubNavController.push).toHaveBeenCalledWith(RemindersPage);
    });

    it('records the button press', inject([HomePage], (homePage) => {
      homePage.goReminders();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'Set your reminders',
        current_page: 'Main page'
      });
    }));
  });

  describe('#goFacebook', () => {
    it('displays a dialog', (done) => {
      let resolver = Promise.resolve(0);
      stubDialogs.confirm.and.returnValue(resolver);

      homePage.goFacebook();

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

        homePage.goFacebook();

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

        homePage.goFacebook();

        resolver.then(() => {
          expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
            button_label: 'Join our Facebook support group',
            current_page: 'Main page'
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

        homePage.goFacebook();

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

        homePage.goFacebook();

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
