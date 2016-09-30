import { PromptsLearnASkillPage } from './prompts-learn-a-skill.page';
import { PromptsQuitTipPage } from './prompts-quit-tip.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
 * The page for coping skills prompts trying to quit.
 */
@Component({
  templateUrl: 'prompts-trying-to-quit.html'
})
export class PromptsTryingToQuitPage {
  constructor(public nav: NavController) {
  }

  public goLearnASkill() {
    this.nav.push(PromptsLearnASkillPage);
  }

  public goQuitTip() {
    this.nav.push(PromptsQuitTipPage);
  }
}
