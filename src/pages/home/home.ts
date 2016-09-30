import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { AboutPage } from '../../pages/about/about';
import { CopingSkillsPage } from '../../pages/coping-skills/coping-skills';
import { LearnPage } from '../../pages/learn/learn';
import { PromptsPage } from '../../pages/prompts/prompts.page';
import { RemindersPage } from '../../pages/reminders/reminders';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
 * The primary landing page of the application.
 */
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  public pageName = 'Main page';

  constructor(public nav: NavController, public sqlite: FerronSqlite) {
  }

  public goAbout() {
    const buttonLabel = 'About';
    this.nav.push(AboutPage);
    this.recordNav(this.pageName, buttonLabel);
  }

  public goCopingSkills() {
    const buttonLabel = 'List of coping skills';
    this.nav.push(CopingSkillsPage);
    this.recordNav(this.pageName, buttonLabel);
  }

  public goLearn() {
    const buttonLabel = 'Learn to cope with urges to smoke';
    this.nav.push(LearnPage);
    this.recordNav(this.pageName, buttonLabel);
  }

  public goPrompts() {
    this.nav.push(PromptsPage);
    this.recordNav(this.pageName, this.promptsLabel());
  }

  public goReminders() {
    const buttonLabel = 'Set your reminders';
    this.nav.push(RemindersPage);
    this.recordNav(this.pageName, buttonLabel);
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

  public recordNav(pageName: string, buttonLabel: string) {
    this.sqlite.initialize().then(() => {
      this.sqlite.persist('button_presses', {
        button_label: buttonLabel,
        current_page: pageName
      });
    });
    this.recordInitialization();
  }
}
