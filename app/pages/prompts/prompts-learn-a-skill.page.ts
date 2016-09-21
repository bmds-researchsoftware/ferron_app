import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { ListenPage } from '../listen/listen.page';
import { WatchPage } from '../watch/watch.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
 * The page for coping skills prompts learn a skill.
 */
@Component({
  providers: [FerronSqlite],
  templateUrl: 'build/pages/prompts/prompts-learn-a-skill.html'
})
export class PromptsLearnASkillPage {
  private pageName = 'Learn a skill';

  constructor(private nav: NavController, private sqlite: FerronSqlite) {
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

  private recordNav(pageName: string, buttonLabel: string) {
    this.sqlite.initialize().then(() => {
      this.sqlite.persist('button_presses', {
        button_label: buttonLabel,
        current_page: pageName
      });
    });
  }
}
