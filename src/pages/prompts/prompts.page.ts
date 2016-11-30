import { PromptsGetMotivatedTipPage } from './prompts-get-motivated-tip.page';
import { PromptsPositiveFeedbackPage } from './prompts-positive-feedback.page';
import { PromptsTryingToQuitPage } from './prompts-trying-to-quit.page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { Tracking } from '../tracking';

/*
 * The page for coping skills prompts.
 */
@Component({
  templateUrl: 'prompts.html'
})
export class PromptsPage extends Tracking {
  public pageName = 'Coping skills';

  constructor(
    public nav: NavController,
    public sqlite: FerronSqlite
  ) {
    super(sqlite);
  }

  public goPositiveFeedback() {
    const buttonLabel = "I'm trying not to smoke and doing great!";
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(PromptsPositiveFeedbackPage);
  }

  public goTryingToQuit(label: string) {
    this.recordNav(this.pageName, label);
    this.nav.push(PromptsTryingToQuitPage);
  }

  public goGetMotivatedTip() {
    const buttonLabel = "I'm smoking and not ready to do anything to change.";
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(PromptsGetMotivatedTipPage);
  }
}
