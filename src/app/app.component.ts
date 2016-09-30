import { ConfigurationPage } from '../pages/configuration/configuration.page';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class FerronApp {
  rootPage = ConfigurationPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
