import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { AboutPage } from '../../pages/about/about';
import { CopingSkillsPage } from '../../pages/coping-skills/coping-skills';
import { LearnPage } from '../../pages/learn/learn';
import { PromptsPage } from '../../pages/prompts/prompts.page';
import { RemindersPage } from '../../pages/reminders/reminders';
import { HomePage } from './home';
import { beforeEachProviders, describe, inject, it } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('HomePage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };
  let stubSqlite = {
    initialize() { return Promise.resolve(); },
    persist: jasmine.createSpy('persist')
  };

  beforeEachProviders(() => [
    HomePage,
    { provide: NavController, useValue: stubNavController },
    { provide: FerronSqlite, useValue: stubSqlite }
  ]);

  describe('#goAbout', () => {
    it('navigates to the AboutPage', inject([HomePage], (homePage) => {
      homePage.goAbout();

      expect(stubNavController.push).toHaveBeenCalledWith(AboutPage);
    }));

    it('records the button press', inject([HomePage], (homePage) => {
      homePage.goAbout();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'About',
        current_page: 'Main page'
      });
    }));
  });

  describe('#goCopingSkills', () => {
    it('navigates to the CopingSkillsPage', inject([HomePage], (homePage) => {
      homePage.goCopingSkills();

      expect(stubNavController.push).toHaveBeenCalledWith(CopingSkillsPage);
    }));

    it('records the button press', inject([HomePage], (homePage) => {
      homePage.goAbout();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'List of coping skills',
        current_page: 'Main page'
      });
    }));
  });

  describe('#goLearn', () => {
    it('navigates to the LearnPage', inject([HomePage], (homePage) => {
      homePage.goLearn();

      expect(stubNavController.push).toHaveBeenCalledWith(LearnPage);
    }));

    it('records the button press', inject([HomePage], (homePage) => {
      homePage.goAbout();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'Learn to cope with urges to smoke',
        current_page: 'Main page'
      });
    }));
  });

  describe('#goPrompts', () => {
    it('navigates to the PromptsPage', inject([HomePage], (homePage) => {
      homePage.goPrompts();

      expect(stubNavController.push).toHaveBeenCalledWith(PromptsPage);
    }));

    it('records the button press', inject([HomePage], (homePage) => {
      homePage.goAbout();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'Start here',
        current_page: 'Main page'
      });
    }));
  });

  describe('#goReminders', () => {
    it('navigates to the RemindersPage', inject([HomePage], (homePage) => {
      homePage.goReminders();

      expect(stubNavController.push).toHaveBeenCalledWith(RemindersPage);
    }));

    it('records the button press', inject([HomePage], (homePage) => {
      homePage.goAbout();

      expect(stubSqlite.persist).toHaveBeenCalledWith('button_presses', {
        button_label: 'Set your reminders',
        current_page: 'Main page'
      });
    }));
  });
});
