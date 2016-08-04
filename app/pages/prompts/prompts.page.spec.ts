import { HomePage } from '../home/home';
import { PromptsPositiveFeedbackPage } from './prompts-positive-feedback.page';
import { PromptsPage } from './prompts.page';
import { beforeEachProviders, describe, inject, it } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('HomePage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };

  beforeEachProviders(() => [
    PromptsPage, { provide: NavController, useValue: stubNavController }
  ]);

  describe('#goPositiveFeedback', () => {
    it('navigates to the PromptsPositiveFeedbackPage', inject([PromptsPage], promptsPage => {
      promptsPage.goPositiveFeedback();

      expect(stubNavController.push).toHaveBeenCalledWith(PromptsPositiveFeedbackPage);
    }));
  });

  describe('#goHome', () => {
    it('navigates to the HomePage', inject([PromptsPage], promptsPage => {
      promptsPage.goHome();

      expect(stubNavController.push).toHaveBeenCalledWith(HomePage);
    }));
  });
});
