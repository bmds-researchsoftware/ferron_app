import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { AboutPage } from '../../pages/about/about';
import { CopingSkillsPage } from '../../pages/coping-skills/coping-skills';
import { FerronDialogs } from '../../native-plugins/ferron-dialogs.service';
import { LearnPage } from '../../pages/learn/learn';
import { PromptsPage } from '../../pages/prompts/prompts.page';
import { RemindersPage } from '../../pages/reminders/reminders';
import { TrackerPage } from '../../pages/tracker/tracker';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Constants } from '../../constants.service';
import { Tracking } from '../tracking';

/*
 * The primary landing page of the application.
 */
@Component({
  templateUrl: 'home.html'
})
export class HomePage extends Tracking {
  public pageName = 'Main page';

  constructor(public nav: NavController,
              public sqlite: FerronSqlite,
              public constants: Constants,
              public dialogs: FerronDialogs) {
    super(sqlite);
  }

  public goAbout() {
    const buttonLabel = 'About';
    this.nav.push(AboutPage);
    this.recordNavAndInitialization(this.pageName, buttonLabel);
  }

  public goCopingSkills() {
    const buttonLabel = 'List of coping skills';
    this.nav.push(CopingSkillsPage);
    this.recordNavAndInitialization(this.pageName, buttonLabel);
  }

  public goLearn() {
    const buttonLabel = 'Learn to cope with urges to smoke';
    this.nav.push(LearnPage);
    this.recordNavAndInitialization(this.pageName, buttonLabel);
  }

  public goPrompts() {
    this.nav.push(PromptsPage);
    this.recordNavAndInitialization(this.pageName, this.promptsLabel());
  }

  public goReminders() {
    const buttonLabel = 'Set your reminders';
    this.nav.push(RemindersPage);
    this.recordNavAndInitialization(this.pageName, buttonLabel);
  }
  
  public goTracker() {
    const buttonLabel = 'Track your cigarettes';
    this.nav.push(TrackerPage);
    this.recordNavAndInitialization(this.pageName, buttonLabel);
  }

  public goFacebook() {
    this.dialogs.confirm(
      "Do you want to open Facebook?",
      null,
      ['Yes', 'No']
    ).then(buttonNumber => {
      if (buttonNumber === 1) {
        const buttonLabel = 'Join our Facebook support group';

        this.recordNavAndInitialization(this.pageName, buttonLabel);
        window.open(this.constants.facebookGroupUrl, '_system');
      }
    });
  }

  public promptsLabel(): string {
    if (!this.isInitialized()) {
      return 'Start here';
    }

    return 'Check-in';
  }

  public isInitialized(): boolean {
    return window.localStorage.getItem('isInitialized') != null;
  }

  public recordInitialization() {
    if (window.localStorage.getItem('isInitialized') == null) {
      window.localStorage.setItem('isInitialized', 'true');
    }
  }

  public recordNavAndInitialization(pageName: string, buttonLabel: string) {
    this.recordNav(pageName, buttonLabel);
    this.recordInitialization();
  }
}
