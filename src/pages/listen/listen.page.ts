import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { AudioFollowUpPage } from './audio-follow-up.page';
import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'listen.html',
})
export class ListenPage {
  public streamingAudioFiles: Promise<Array<any>>;
  public bundledAudioFiles = [
    {
      title: 'Povo Que Cas Descalo',
      url: 'assets/audio_files/Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3'
    }
  ];

  constructor(public modalController: ModalController,
              public sqlite: FerronSqlite) {
    this.sqlite.establishConnection();
  }

  public openBundledModal(audio: { url: string, title: string }) {
    let audioModal = this.modalController.create(BundledAudioPage, audio);

    audioModal.onDidDismiss(() => {
      let followUpModal = this.modalController.create(AudioFollowUpPage, audio);

      followUpModal.onDidDismiss(responses => {
        this.sqlite.persist('audio_follow_up_responses', responses);
      });
      followUpModal.present();
    });
    audioModal.present();
  }
}

// A modal that displays the selected bundled audio.
@Component({
  templateUrl: 'bundled-audio.html'
})
export class BundledAudioPage {
  constructor(public domSanitizer: DomSanitizer,
              public params: NavParams,
              public viewController: ViewController) {
  }

  /* istanbul ignore next: trivial method */
  public audioTitle(): string {
    return this.params.get('title');
  }

  /* istanbul ignore next: trivial method */
  public audioId(): string {
    return this.params.get('identifier');
  }

  /* istanbul ignore next: trivial method */
  public url() {
    return this.params.get('url');
  }

  /* istanbul ignore next: trivial method */
  public audioUrl(): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.url()
    );
  }

  /* istanbul ignore next: delegate method */
  public dismiss() {
    this.viewController.dismiss();
  }
}
