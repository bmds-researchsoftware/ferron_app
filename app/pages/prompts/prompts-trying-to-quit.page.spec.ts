import { PromptsLearnASkillPage } from './prompts-learn-a-skill.page';
import { PromptsQuitTipPage } from './prompts-quit-tip.page';
import { PromptsTryingToQuitPage } from './prompts-trying-to-quit.page';
import { beforeEachProviders, describe, inject, it } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('PromptsTryingToQuitPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };
  let tryingToQuitPage;

  beforeEachProviders(() => [
    PromptsTryingToQuitPage, { provide: NavController, useValue: stubNavController }
  ]);

  beforeEach(inject([PromptsTryingToQuitPage], page => {
    tryingToQuitPage = page;
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
});
