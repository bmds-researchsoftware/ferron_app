import { FerronDialogs } from '../../native-plugins/ferron-dialogs.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { ListenPage } from '../listen/listen.page';
import { NicotineReplacementPage } from '../nicotine-replacement/nicotine-replacement.page';
import { OneStepAtATimePage } from '../one-step-at-a-time/one-step-at-a-time.page';
import { PromptsQuitTipPage } from '../../pages/prompts/prompts-quit-tip.page';
import { ReasonsToQuitPage } from '../../pages/reasons-to-quit/reasons-to-quit';
import { WatchPage } from '../watch/watch.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Constants } from '../../constants.service';
import { Tracking } from '../tracking';

@Component({
  templateUrl: 'coping-skills.html',
})
export class CopingSkillsPage extends Tracking {
  public pageName = 'Coping skills';

  constructor(public nav: NavController,
              public sqlite: FerronSqlite,
              public constants: Constants,
              public dialogs: FerronDialogs) {
    super(sqlite);
  }

  public goReasonsToQuit() {
    const buttonLabel = 'My Top Reasons to Quit';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(ReasonsToQuitPage);
  }

  public goListen() {
    const buttonLabel = 'Listen to Cope';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(ListenPage);
  }

  public goWatch() {
    const buttonLabel = 'Watch videos to Cope';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(WatchPage);
  }

  public goQuitTip() {
    const buttonLabel = 'Get a Quit Tip';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(PromptsQuitTipPage);
  }

  public goNicotineReplacement() {
    const buttonLabel = 'Use my Nicotine Replacement';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(NicotineReplacementPage);
  }

  public goOneStepAtATime() {
    const buttonLabel = 'One Step at a Time';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(OneStepAtATimePage);
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
