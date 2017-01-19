import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { FerronNetwork } from '../../native-plugins/ferron-network.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { BundledVideoPage } from './bundled-video.page';
import { StreamingVideoPage } from './streaming-video.page';
import { VideoFollowUpPage } from './video-follow-up.page';
import { Tracking } from '../tracking';

@Component({
  templateUrl: 'watch.html',
})
export class WatchPage extends Tracking {
  public streamingVideos: Promise<Array<any>>;
  public bundledVideos = [
    // waiting for content
    // { title: 'Bunny', url: 'assets/videos/big_buck_bunny.mp4' }
  ];
  public pageName = 'Watch to learn';

  public unavailableClass = 'danger';
  public availableClass = 'secondary';
  public onlineVideoClassName = this.unavailableClass;

  constructor(public modalController: ModalController,
              public network: FerronNetwork,
              public sqlite: FerronSqlite) {
    super(sqlite);
    this.sqlite.initialize().then(() => {
      this.refreshVideos();
    }).catch(error => {
      console.log('error initializing: ' + error);
    });
    if (this.network.isConnected()) {
      this.onlineVideoClassName = this.availableClass;
    }
  }

  public openBundledModal(video: { url: string, title: string }) {
    let videoModal = this.modalController.create(BundledVideoPage, video);
    const buttonLabel = `Open video file: ${video.title}`;
    this.recordNav(this.pageName, buttonLabel);

    videoModal.onDidDismiss(() => {
      let followUpModal = this.modalController.create(VideoFollowUpPage, video);

      followUpModal.onDidDismiss(responses => {
        this.sqlite.persist('video_follow_up_responses', responses);
      });
      followUpModal.present();
    });
    videoModal.present();
  }

  public openStreamingModal(video: { identifier: string, title: string }) {
    if (!this.network.isConnected()) {
      return;
    }

    let modal = this.modalController.create(StreamingVideoPage, video);
    const buttonLabel = `Open streaming video: ${video.title}`;
    this.recordNav(this.pageName, buttonLabel);

    modal.onDidDismiss(() => {
      let followUpModal = this.modalController.create(VideoFollowUpPage, video);

      followUpModal.onDidDismiss(responses => {
        this.sqlite.persist('video_follow_up_responses', responses);
      });
      followUpModal.present();
    });
    modal.present();
  }

  public onlineVideoClass(): string {
    return this.onlineVideoClassName;
  }

  public refreshVideos() {
    this.streamingVideos = this.sqlite.fetchAll('videos');
  }
}
