import { AboutPage } from '../../pages/about/about';
import { CopingSkillsPage } from '../../pages/coping-skills/coping-skills';
import { LearnPage } from '../../pages/learn/learn';
import { RemindersPage } from '../../pages/reminders/reminders';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  public goReminders() {
    this.nav.push(RemindersPage);
  }
}
