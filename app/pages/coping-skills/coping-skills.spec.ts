import { CopingSkillsPage } from '../../pages/coping-skills/coping-skills';
import { ReasonsToQuitPage } from '../../pages/reasons-to-quit/reasons-to-quit';
import { beforeEachProviders, describe, inject, it } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('CopingSkillsPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };

  beforeEachProviders(() => [
    CopingSkillsPage, { provide: NavController, useValue: stubNavController }
  ]);

  describe('#goReasonsToQuit', () => {
    it('navigates to the ReasonsToQuitPage', inject([CopingSkillsPage], (copingSkillsPage) => {
      copingSkillsPage.goReasonsToQuit();

      expect(stubNavController.push).toHaveBeenCalledWith(ReasonsToQuitPage);
    }));
  });
});
