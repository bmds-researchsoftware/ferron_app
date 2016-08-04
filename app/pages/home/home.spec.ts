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

  beforeEachProviders(() => [
    HomePage, { provide: NavController, useValue: stubNavController }
  ]);

  describe('#goAbout', () => {
    it('navigates to the AboutPage', inject([HomePage], (homePage) => {
      homePage.goAbout();

      expect(stubNavController.push).toHaveBeenCalledWith(AboutPage);
    }));
  });

  describe('#goCopingSkills', () => {
    it('navigates to the CopingSkillsPage', inject([HomePage], (homePage) => {
      homePage.goCopingSkills();

      expect(stubNavController.push).toHaveBeenCalledWith(CopingSkillsPage);
    }));
  });

  describe('#goLearn', () => {
    it('navigates to the LearnPage', inject([HomePage], (homePage) => {
      homePage.goLearn();

      expect(stubNavController.push).toHaveBeenCalledWith(LearnPage);
    }));
  });

  describe('#goPrompts', () => {
    it('navigates to the PromptsPage', inject([HomePage], (homePage) => {
      homePage.goPrompts();

      expect(stubNavController.push).toHaveBeenCalledWith(PromptsPage);
    }));
  });

  describe('#goReminders', () => {
    it('navigates to the RemindersPage', inject([HomePage], (homePage) => {
      homePage.goReminders();

      expect(stubNavController.push).toHaveBeenCalledWith(RemindersPage);
    }));
  });
});
