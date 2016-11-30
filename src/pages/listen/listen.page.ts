import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { AudioFollowUpPage } from './audio-follow-up.page';
import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';
import { Tracking } from '../tracking';

@Component({
  templateUrl: 'listen.html',
})
export class ListenPage extends Tracking {
  public streamingAudioFiles: Promise<Array<any>>;
  public bundledAudioFiles = [
    {
      title: 'Urge Surfing',
      url: 'assets/audio_files/01_Urge_Surfing.mp3'
    },
    {
      title: 'Loving Kindness',
      url: 'assets/audio_files/02_Loving_Kindness.mp3'
    },
    {
      title: 'The Beauty of Nature',
      url: 'assets/audio_files/03_The_Beauty_of_Nature.mp3'
    },
    {
      title: 'Daily Tasks',
      url: 'assets/audio_files/04_Daily_Tasks.mp3'
    },
    {
      title: 'Opening Your Ears to Sound',
      url: 'assets/audio_files/05_Opening_Your_Ears_to_Sound.mp3'
    },
    {
      title: 'Mindful Immersion',
      url: 'assets/audio_files/06_Mindful_Immersion.mp3'
    },
    {
      title: 'Awakening Your Senses',
      url: 'assets/audio_files/07_Awakening_Your_Senses.mp3'
    },
    {
      title: 'Seated Walking',
      url: 'assets/audio_files/08_Seated_Walking.mp3'
    },
    {
      title: 'The Four Elements',
      url: 'assets/audio_files/09_The_Four_Elements.mp3'
    },
    {
      title: 'Breathing in, Breathing out',
      url: 'assets/audio_files/10_Breathing_in_Breathing_out.mp3'
    },
    {
      title: 'Relaxed Deep Breathing',
      url: 'assets/audio_files/11_Relaxed_Deep_Breathing.mp3'
    },
    {
      title: 'The Whoosh Breath',
      url: 'assets/audio_files/12_The_Whoosh_Breath.mp3'
    },
    {
      title: 'Observing Our Cravings',
      url: 'assets/audio_files/13_Observing_Our_Cravings.mp3'
    },
    {
      title: 'The Cycle of Addiction',
      url: 'assets/audio_files/14_The_Cycle_of_Addiction.mp3'
    },
    {
      title: 'Walking',
      url: 'assets/audio_files/15_Walking.mp3'
    },
    {
      title: 'Gratitude',
      url: 'assets/audio_files/16_Gratitude.mp3'
    },
    {
      title: 'Mindful Sensing',
      url: 'assets/audio_files/17_Mindful_Sensing.mp3'
    },
    {
      title: 'Body Scan',
      url: 'assets/audio_files/18_Body_Scan.mp3'
    },
  ];
  public pageName = 'Listen to quit';

  constructor(public modalController: ModalController,
              public sqlite: FerronSqlite) {
    super(sqlite);
  }

  public openBundledModal(audio: { url: string, title: string }) {
    let audioModal = this.modalController.create(BundledAudioPage, audio);
    const buttonLabel = `Open audio file: ${audio.title}`;
    this.recordNav(this.pageName, buttonLabel);

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
