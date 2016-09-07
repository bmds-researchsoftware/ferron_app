import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { HomePage } from '../home/home.ts';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

function getRandom(list: [any]) {
  let index = Math.floor(Math.random() * list.length);

  return list[index];
}

/*
 * The page for coping skills prompts quit tip.
 */
@Component({
  providers: [FerronSqlite],
  templateUrl: 'build/pages/prompts/prompts-quit-tip.html'
})
export class PromptsQuitTipPage {
  public tips: [{}];
  public tipBody: Promise<string> = null;

  private resolve: Function = null;

  constructor(private nav: NavController, private sqlite: FerronSqlite) {
    this.sqlite.initialize().then(() => {
      this.refreshTips();
    });
  }

  public refreshTips() {
    this.sqlite.fetchAll('quit_tips').then(tips => {
      this.tips = tips;
      this.resolve(getRandom(tips).body);
    });
    this.tipBody = new Promise<string>((resolve, reject) => {
      this.resolve = resolve;
    });
  }

  public reloadPage() {
    this.nav.push(PromptsQuitTipPage);
  }

  public goHome() {
    this.nav.push(HomePage);
  }
}
