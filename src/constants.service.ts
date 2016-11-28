import { Injectable } from '@angular/core';

let CalmCopeQuit = (<any> window).CalmCopeQuit || {};
let stage = CalmCopeQuit.STAGE;
let server = CalmCopeQuit.SERVER_URL;

/*
 * Wraps the global constants defined at build time to make DI and testing more
 * straightforward.
 */
@Injectable()
export class Constants {
  public appStage: string = stage;
  public serverUrl: string = server;
  public facebookGroupUrl = 'https://www.facebook.com/groups/143743129437039/';
}
