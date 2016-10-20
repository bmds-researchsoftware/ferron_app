import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { ListenPage } from '../listen/listen.page';
import { NicotineReplacementPage } from '../nicotine-replacement/nicotine-replacement.page';
import { PromptsQuitTipPage } from '../../pages/prompts/prompts-quit-tip.page';
import { ReasonsToQuitPage } from '../../pages/reasons-to-quit/reasons-to-quit';
import { WatchPage } from '../watch/watch.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'coping-skills.html',
})
export class CopingSkillsPage {
  public pageName = 'Coping skills';

  constructor(public nav: NavController, public sqlite: FerronSqlite) {
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

  public recordNav(pageName: string, buttonLabel: string) {
    this.sqlite.initialize().then(() => {
      this.sqlite.persist('button_presses', {
        button_label: buttonLabel,
        current_page: pageName
      });
    });
  }
}