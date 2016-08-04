import { HomePage } from '../home/home';
import { PromptsPositiveFeedbackPage } from './prompts-positive-feedback.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
 * The page for coping skills prompts.
 */
@Component({
  templateUrl: 'build/pages/prompts/prompts.html'
})
export class PromptsPage {
  constructor(private nav: NavController) {
  }

  public goPositiveFeedback() {
    this.nav.push(PromptsPositiveFeedbackPage);
  }

  public goHome() {
    this.nav.push(HomePage);
  }
}
