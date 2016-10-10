import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { HomePage } from '../home/home';
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
  templateUrl: 'prompts-quit-tip.html'
})
export class PromptsQuitTipPage {
  public tips: [{}];
  public tipBody: Promise<string> = null;
  public tipLiked: boolean = null;

  public resolve: Function = null;

  constructor(public nav: NavController, public sqlite: FerronSqlite) {
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

  public likeTip() {
    this.tipLiked = true;
  }

  public dislikeTip() {
    this.tipLiked = false;
  }
}
