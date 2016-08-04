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
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private nav: NavController) {
  }

  public goAbout() {
    this.nav.push(AboutPage);
  }

  public goCopingSkills() {
    this.nav.push(CopingSkillsPage);
  }

  public goLearn() {
    this.nav.push(LearnPage);
  }

  public goPrompts() {
    this.nav.push(PromptsPage);
  }

  public goReminders() {
    this.nav.push(RemindersPage);
  }
}
