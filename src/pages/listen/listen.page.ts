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
      url: '01_Urge_Surfing',
      image: 'wave-1913559_1280'
    },
    {
      title: 'Loving Kindness',
      url: '02_Loving_Kindness',
      image: 'heart-268151_1280'
    },
    {
      title: 'Daily Tasks',
      url: '03_Daily_Tasks',
      image: 'cleaning-268126_1280'
    },
    {
      title: 'Opening Your Ears',
      url: '04_Open_Your_Ears_to_Sound',
      image: 'manhattan-1674404_1280'
    },
    {
      title: 'Mindful Immersion',
      url: '05_Mindful_Immersion',
      image: 'meditation-1837347_1920'
    },
    {
      title: 'Awakening Senses',
      url: '06_Awaken_Your_Senses',
      image: 'adult-19033_1920'
    },
    {
      title: 'Seated Walking',
      url: '07_Seated_Walking',
      image: 'amazing-736886_1280'
    },
    {
      title: 'Four Elements',
      url: '08_The_Four_Elements',
      image: 'amazing-736886_1280'
    },
    {
      title: 'Relaxed Deep Breathing',
      url: '11_Relaxed_Deep_Breathing',
      image: 'woman-570883_1920'
    },
    {
      title: 'Observing Our Cravings',
      url: '13_Observing_Our_Cravings',
      image: 'meditate-1851165_1920'
    },
    {
      title: 'Walking',
      url: '15_Walking',
      image: 'woods-2023264_1920'
    },
    {
      title: 'Gratitude',
      url: '16_Gratitude',
      image: 'grateful-1987667_1920'
    },
    {
      title: 'Mindful Sensing',
      url: '17_Mindful_Sensing',
      image: 'prairie-679014_1280'
    },
    {
      title: 'Body Scan',
      url: '18_Body_Scan',
      image: 'meditation-1287207_1920'
    }
  ];
  public pageName = 'Listen to quit';

  constructor(public modalController: ModalController,
              public sqlite: FerronSqlite,
              public platform: Platform) {
    super(sqlite);
  }

  public openBundledModal(audio: { url: string, title: string, image: string }) {
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
        url: `${prefix}assets/audio_files/${entry.url}.mp3`,
        image: `${prefix}assets/images/${entry.image}.jpg`
      };
    });
  }
}
