import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
 * The page for coping skills prompts positive feedback.
 */
@Component({
  templateUrl: 'build/pages/prompts/prompts-positive-feedback.html'
})
export class PromptsPositiveFeedbackPage {
  constructor(private nav: NavController) {
  }

  public goHome() {
    this.nav.push(HomePage);
  }
}
