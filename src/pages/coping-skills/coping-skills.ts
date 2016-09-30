import { ReasonsToQuitPage } from '../../pages/reasons-to-quit/reasons-to-quit';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'coping-skills.html',
})
export class CopingSkillsPage {
  constructor(public nav: NavController) {
  }

  public goReasonsToQuit() {
    this.nav.push(ReasonsToQuitPage);
  }
}
