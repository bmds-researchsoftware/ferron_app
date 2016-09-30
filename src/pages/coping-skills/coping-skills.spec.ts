import { CopingSkillsPage } from './coping-skills';
import { ReasonsToQuitPage } from '../../pages/reasons-to-quit/reasons-to-quit';
import { TestBed, inject } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('CopingSkillsPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CopingSkillsPage],
      providers: [{ provide: NavController, useValue: stubNavController }]
    });
  });

  describe('#goReasonsToQuit', () => {
    it('navigates to the ReasonsToQuitPage', inject([CopingSkillsPage], (copingSkillsPage) => {
      copingSkillsPage.goReasonsToQuit();

      expect(stubNavController.push).toHaveBeenCalledWith(ReasonsToQuitPage);
    }));
  });
});
