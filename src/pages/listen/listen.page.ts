import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { AudioFollowUpPage } from './audio-follow-up.page';
import { BundledAudioPage } from './bundled-audio.page';
import { Component } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { Tracking } from '../tracking';

@Component({
  templateUrl: 'listen.html',
})
export class ListenPage extends Tracking {
  public streamingAudioFiles: Promise<Array<any>>;
  public bundledAudioFiles = [
    {
      title: 'Urge Surfing',
      url: '01_Urge_Surfing.mp3'
    },
    {
      title: 'Loving Kindness',
      url: '02_Loving_Kindness.mp3'
    },
    {
      title: 'The Beauty of Nature',
      url: '03_The_Beauty_of_Nature.mp3'
    },
    {
      title: 'Daily Tasks',
      url: '04_Daily_Tasks.mp3'
    },
    {
      title: 'Opening Your Ears to Sound',
      url: '05_Opening_Your_Ears_to_Sound.mp3'
    },
    {
      title: 'Mindful Immersion',
      url: '06_Mindful_Immersion.mp3'
    },
    {
      title: 'Awakening Your Senses',
      url: '07_Awakening_Your_Senses.mp3'
    },
    {
      title: 'Seated Walking',
      url: '08_Seated_Walking.mp3'
    },
    {
      title: 'The Four Elements',
      url: '09_The_Four_Elements.mp3'
    },
    {
      title: 'Breathing in, Breathing out',
      url: '10_Breathing_in_Breathing_out.mp3'
    },
    {
      title: 'Relaxed Deep Breathing',
      url: '11_Relaxed_Deep_Breathing.mp3'
    },
    {
      title: 'The Whoosh Breath',
      url: '12_The_Whoosh_Breath.mp3'
    },
    {
      title: 'Observing Our Cravings',
      url: '13_Observing_Our_Cravings.mp3'
    },
    {
      title: 'The Cycle of Addiction',
      url: '14_The_Cycle_of_Addiction.mp3'
    },
    {
      title: 'Walking',
      url: '15_Walking.mp3'
    },
    {
      title: 'Gratitude',
      url: '16_Gratitude.mp3'
    },
    {
      title: 'Mindful Sensing',
      url: '17_Mindful_Sensing.mp3'
    },
    {
      title: 'Body Scan',
      url: '18_Body_Scan.mp3'
    },
  ];
  public pageName = 'Listen to quit';

  constructor(public modalController: ModalController,
              public sqlite: FerronSqlite,
              public platform: Platform) {
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

  public bundledAudioFilePaths(): any[] {
    let prefix = this.platform.is('android') ? '/android_asset/www/' : '';

    return this.bundledAudioFiles.map((entry) => {
      return {
        title: entry.title,
        url: `${prefix}assets/audio_files/${entry.url}`
      };
    });
  }
}
