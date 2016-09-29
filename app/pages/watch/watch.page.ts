import { DomSanitizationService } from "@angular/platform-browser";
import { FerronNetwork } from '../../native-plugins/ferron-network.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';

@Component({
  providers: [FerronNetwork, FerronSqlite],
  templateUrl: 'build/pages/watch/watch.html',
})
export class WatchPage {
  public streamingVideos: Promise<Array<any>>;
  public bundledVideos = [
    { title: 'Bunny', url: 'videos/big_buck_bunny.mp4' }
  ];

  private unavailableClass = 'unavailable';
  private availableClass = 'available';
  private onlineVideoClassName = this.unavailableClass;

  constructor(private modalController: ModalController,
              private network: FerronNetwork,
              private sqlite: FerronSqlite) {
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
    let modal = this.modalController.create(BundledVideoPage, video);
    modal.present();
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

  private refreshVideos() {
    this.streamingVideos = this.sqlite.fetchAll('videos');
  }
}

// A modal that displays the selected bundled video.
@Component({
  templateUrl: 'build/pages/watch/streaming-video.html'
})
class BundledVideoPage {
  constructor(private domSanitizer: DomSanitizationService,
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
  public videoUrl() {
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
  templateUrl: 'build/pages/watch/streaming-video.html'
})
class StreamingVideoPage {
  constructor(private domSanitizer: DomSanitizationService,
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
  public videoUrl() {
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
