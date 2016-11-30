import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tracking } from '../tracking';

function getRandom(list: any[]) {
  let index = Math.floor(Math.random() * list.length);

  return list[index];
}

/*
 * The page for coping skills prompts get motivated tip.
 */
@Component({
  templateUrl: 'prompts-get-motivated-tip.html'
})
export class PromptsGetMotivatedTipPage extends Tracking {
  public tips: any[] = [];
  public tipBody: string = null;
  public tipUuid: string = null;
  public tipLiked: boolean = null;
  public resolve: Function = null;
  public pageName = 'Get motivated tips';

  constructor(public nav: NavController, public sqlite: FerronSqlite) {
    super(sqlite);
    this.sqlite.initialize().then(() => {
      this.refreshTips();
    });
  }

  public refreshTips() {
    const buttonLabel = 'Click for next tip';
    this.recordNav(this.pageName, buttonLabel);

    if (this.tips.length > 0) {
      this.setTip();
      return;
    }

    this.sqlite.fetchAll('get_motivated_tips').then(tips => {
      this.tips = tips;
      this.setTip();
    });
  }

  public reloadPage() {
    this.nav.push(PromptsGetMotivatedTipPage);
  }

  public goHome() {
    this.nav.push(HomePage);
  }

  public likeTip() {
    this.tipLiked = true;
    this.persistResponse();
  }

  public dislikeTip() {
    this.tipLiked = false;
    this.persistResponse();
  }

  private setTip() {
    let tip = getRandom(this.tips);
    this.tipBody = tip.body;
    this.tipUuid = tip.uuid;
  }

  private persistResponse() {
    this.sqlite.persist('get_motivated_tip_follow_up_responses', {
      get_motivated_tip_uuid: this.tipUuid,
      did_like_tip: this.tipLiked
    }).then(() => {
      this.tipLiked = null;
      this.refreshTips();
    });
  }
}
