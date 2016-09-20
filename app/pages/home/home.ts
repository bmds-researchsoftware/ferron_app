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
  providers: [FerronSqlite],
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public pageName = 'Main page';

  constructor(private nav: NavController, private sqlite: FerronSqlite) {
  }

  public goAbout() {
    const buttonLabel = 'About';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(AboutPage);
  }

  public goCopingSkills() {
    const buttonLabel = 'List of coping skills';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(CopingSkillsPage);
  }

  public goLearn() {
    const buttonLabel = 'Learn to cope with urges to smoke';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(LearnPage);
  }

  public goPrompts() {
    const buttonLabel = 'Start here';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(PromptsPage);
  }

  public goReminders() {
    const buttonLabel = 'Set your reminders';
    this.recordNav(this.pageName, buttonLabel);
    this.nav.push(RemindersPage);
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
