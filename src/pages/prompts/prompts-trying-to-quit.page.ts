import { PromptsLearnASkillPage } from './prompts-learn-a-skill.page';
import { PromptsQuitTipPage } from './prompts-quit-tip.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dialogs } from 'ionic-native';
import { Constants } from '../../constants.service';

/*
 * The page for coping skills prompts trying to quit.
 */
@Component({
  templateUrl: 'prompts-trying-to-quit.html'
})
export class PromptsTryingToQuitPage {
  constructor(public nav: NavController, public constants: Constants) {
  }

  public goLearnASkill() {
    this.nav.push(PromptsLearnASkillPage);
  }

  public goQuitTip() {
    this.nav.push(PromptsQuitTipPage);
  }

  public goFacebook() {
    Dialogs.confirm(
      "Do you want to open Facebook?",
      null,
      ['Yes', 'No']
    ).then(buttonNumber => {
      if (buttonNumber === 1) {
        window.open(this.constants.facebookGroupUrl, '_system');
      }
    });
  }
}
