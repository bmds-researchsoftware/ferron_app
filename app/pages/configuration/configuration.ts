import { HomePage } from '../../pages/home/home';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/configuration/configuration.html',
})
export class ConfigurationPage {

  constructor(private nav: NavController) {

  }

  public goHome() {
    this.nav.push(HomePage);
  }

}
