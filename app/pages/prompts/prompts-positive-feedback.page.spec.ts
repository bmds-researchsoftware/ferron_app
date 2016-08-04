import { HomePage } from '../home/home';
import { PromptsPositiveFeedbackPage } from './prompts-positive-feedback.page';
import { beforeEachProviders, describe, inject, it } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('HomePage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };

  beforeEachProviders(() => [
    PromptsPositiveFeedbackPage, { provide: NavController, useValue: stubNavController }
  ]);

  describe('#goHome', () => {
    it('navigates to the HomePage', inject([PromptsPositiveFeedbackPage], feedbackPage => {
      feedbackPage.goHome();

      expect(stubNavController.push).toHaveBeenCalledWith(HomePage);
    }));
  });
});
