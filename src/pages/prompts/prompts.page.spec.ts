/*import { PromptsGetMotivatedTipPage } from './prompts-get-motivated-tip.page';
import { PromptsPositiveFeedbackPage } from './prompts-positive-feedback.page';
import { PromptsPage } from './prompts.page';
import { TestBed, inject} from '@angular/core/testing';
import { NavController } from 'ionic-angular';

describe('PromptsPage', () => {
  let stubNavController = { push: jasmine.createSpy('push') };
  let promptsPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromptsPage],
      providers: [{ provide: NavController, useValue: stubNavController }]
    });
  });

  beforeEach(inject([PromptsPage], page => {
    promptsPage = page;
  }));

  describe('#goPositiveFeedback', () => {
    it('navigates to the PromptsPositiveFeedbackPage', () => {
      promptsPage.goPositiveFeedback();

      expect(stubNavController.push).toHaveBeenCalledWith(PromptsPositiveFeedbackPage);
    });
  });

  describe('#goGetMotivatedTip', () => {
    it('navigates to the PromptsGetMotivatedTipPage', () => {
      promptsPage.goGetMotivatedTip();

      expect(stubNavController.push).toHaveBeenCalledWith(PromptsGetMotivatedTipPage);
    });
  });
});*/
