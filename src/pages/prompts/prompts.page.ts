import { PromptsGetMotivatedTipPage } from './prompts-get-motivated-tip.page';
import { PromptsPositiveFeedbackPage } from './prompts-positive-feedback.page';
import { PromptsTryingToQuitPage } from './prompts-trying-to-quit.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
 * The page for coping skills prompts.
 */
@Component({
  templateUrl: 'prompts.html'
})
export class PromptsPage {
  constructor(public nav: NavController) {
  }

  public goPositiveFeedback() {
    this.nav.push(PromptsPositiveFeedbackPage);
  }

  public goTryingToQuit() {
    this.nav.push(PromptsTryingToQuitPage);
  }

  public goGetMotivatedTip() {
    this.nav.push(PromptsGetMotivatedTipPage);
  }
}
