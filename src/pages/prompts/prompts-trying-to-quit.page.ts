import { PromptsLearnASkillPage } from './prompts-learn-a-skill.page';
import { PromptsQuitTipPage } from './prompts-quit-tip.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dialogs } from 'ionic-native';

/*
 * The page for coping skills prompts trying to quit.
 */
@Component({
  templateUrl: 'prompts-trying-to-quit.html'
})
export class PromptsTryingToQuitPage {
  public FACEBOOK_GROUP_URL = 'https://www.facebook.com/groups/1190242697686088/';

  constructor(public nav: NavController) {
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
        window.open(this.FACEBOOK_GROUP_URL, '_system');
      }
    });
  }
}
