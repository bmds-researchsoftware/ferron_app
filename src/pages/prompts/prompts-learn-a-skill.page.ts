import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { HomePage } from '../home/home';
import { ListenPage } from '../listen/listen.page';
import { WatchPage } from '../watch/watch.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
 * The page for coping skills prompts learn a skill.
 */
@Component({
  templateUrl: 'prompts-learn-a-skill.html'
})
export class PromptsLearnASkillPage {
  public pageName = 'Learn a skill';

  constructor(public nav: NavController, public sqlite: FerronSqlite) {
  }

  public goListen() {
    const buttonLabel = 'Listen to learn';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(ListenPage);
  }

  public goWatch() {
    const buttonLabel = 'Watch to learn';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(WatchPage);
  }

  public goHome() {
    const buttonLabel = 'Finish';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(HomePage);
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
