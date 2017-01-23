import { PromptsLearnASkillPage } from './prompts-learn-a-skill.page';
import { PromptsQuitTipPage } from './prompts-quit-tip.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Constants } from '../../constants.service';
import { FerronDialogs } from '../../native-plugins/ferron-dialogs.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { Tracking } from '../tracking';

/*
 * The page for coping skills prompts trying to quit.
 */
@Component({
  templateUrl: 'prompts-trying-to-quit.html'
})
export class PromptsTryingToQuitPage extends Tracking {
  public pageName = 'Trying to quit';

  constructor(
    public nav: NavController,
    public sqlite: FerronSqlite,
    public constants: Constants,
    public dialogs: FerronDialogs
  ) {
    super(sqlite);
  }

  public goLearnASkill() {
    const buttonLabel = 'Use a Skill to help me cope';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(PromptsLearnASkillPage);
  }

  public goQuitTip() {
    const buttonLabel = 'Get a Quick Tip on how not to smoke';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(PromptsQuitTipPage);
  }

  public goFacebook() {
    this.dialogs.confirm(
      "Do you want to open Facebook?",
      null,
      ['Yes', 'No']
    ).then(buttonNumber => {
      if (buttonNumber === 1) {
        const buttonLabel = 'Join our Facebook support group';

        this.recordNav(this.pageName, buttonLabel);
        window.open(this.constants.facebookGroupUrl, '_system');
      }
    });
  }
}
