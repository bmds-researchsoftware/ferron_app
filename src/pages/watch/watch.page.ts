import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { FerronNetwork } from '../../native-plugins/ferron-network.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { VideoFollowUpPage } from './video-follow-up.page';
import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'watch.html',
})
export class WatchPage {
  public streamingVideos: Promise<Array<any>>;
  public bundledVideos = [
    { title: 'Bunny', url: 'assets/videos/big_buck_bunny.mp4' }
  ];

  public unavailableClass = 'danger';
  public availableClass = 'secondary';
  public onlineVideoClassName = this.unavailableClass;

  constructor(public modalController: ModalController,
              public network: FerronNetwork,
              public sqlite: FerronSqlite) {
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
    modal.present();
  }

  public onlineVideoClass(): string {
    return this.onlineVideoClassName;
  }

  public refreshVideos() {
    this.streamingVideos = this.sqlite.fetchAll('videos');
  }
}

// A modal that displays the selected bundled video.
@Component({
  templateUrl: 'bundled-video.html'
})
export class BundledVideoPage {
  constructor(public domSanitizer: DomSanitizer,
              public params: NavParams,
              public viewController: ViewController) {
  }

  /* istanbul ignore next: trivial method */
  public videoTitle(): string {
    return this.params.get('title');
  }

  /* istanbul ignore next: trivial method */
  public videoId(): string {
    return this.params.get('identifier');
  }

  /* istanbul ignore next: trivial method */
  public url() {
    return this.params.get('url');
  }

  /* istanbul ignore next: trivial method */
  public videoUrl(): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.url()
    );
  }

  /* istanbul ignore next: delegate method */
  public dismiss() {
    this.viewController.dismiss();
  }
}

// A modal that displays the selected streaming video.
@Component({
  templateUrl: 'streaming-video.html'
})
export class StreamingVideoPage {
  constructor(public domSanitizer: DomSanitizer,
              public params: NavParams,
              public viewController: ViewController) {
  }

  /* istanbul ignore next: trivial method */
  public videoTitle(): string {
    return this.params.get('title');
  }

  /* istanbul ignore next: trivial method */
  public videoId(): string {
    return this.params.get('identifier');
  }

  /* istanbul ignore next: trivial method */
  public videoUrl(): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      'https://player.vimeo.com/video/' +
      this.videoId() + '?color=5dc0f5&portrait=0'
    );
  }

  /* istanbul ignore next: delegate method */
  public dismiss() {
    this.viewController.dismiss();
  }
}
