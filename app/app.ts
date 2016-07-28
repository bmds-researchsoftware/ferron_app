import { ConfigurationPage } from './pages/configuration/configuration.page';
import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class FerronApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = ConfigurationPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(FerronApp);
