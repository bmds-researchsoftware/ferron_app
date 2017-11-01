import { ApplicationRef, Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

// A modal that displays the selected bundled audio.
@Component({
  templateUrl: 'bundled-audio.html'
})
export class BundledAudioPage {
  public currentPosition = '00:00';

  private file: MediaPlugin;
  private PLAYING = 'playing';
  private PAUSED = 'paused';
  private PLAY_ACTION = 'Play';
  private PAUSE_ACTION = 'Pause';
  private PLAY_ICON = 'play';
  private PAUSE_ICON = 'pause';
  private UPDATE_PERIOD_IN_MS = 250;
  private currentState = this.PAUSED;
  private interval: any;

  constructor(public params: NavParams,
              public viewController: ViewController,
              private ref: ApplicationRef) {
    this.file = new MediaPlugin(this.params.get('url'), (status) => {
      this.onUpdate(status);
    });
  }

  public audioTitle(): string {
    return this.params.get('title');
  }

  public imageUrl(): string {
    return this.params.get('image');
  }

  public dismiss() {
    this.stopPositionUpdates();
    this.viewController.dismiss();
  }

  ionViewWillLeave() {
    if (!this.isPaused()) {
      this.file.pause();
      this.currentState = this.PAUSED;
      this.stopPositionUpdates();
    }
  }

  public doNextAction() {
    if (this.isPaused()) {
      this.file.play();
      this.currentState = this.PLAYING;
      this.startPositionUpdates();
    } else {
      this.file.pause();
      this.currentState = this.PAUSED;
      this.stopPositionUpdates();
    }
  }

  public nextActionName(): string {
    if (this.isPaused()) {
      return this.PLAY_ACTION;
    }

    return this.PAUSE_ACTION;
  }

  public nextActionIcon(): string {
    if (this.isPaused()) {
      return this.PLAY_ICON;
    }

    return this.PAUSE_ICON;
  }

  public duration(): string {
    if (this.file.getDuration() > 0) {
      return this.formatTime(this.file.getDuration());
    } else {
      return '00:00';
    }
  }

  private isPaused(): boolean {
    return this.currentState === this.PAUSED;
  }

  private onUpdate(status: number) {
    if (status === MediaPlugin.MEDIA_STOPPED) {
      this.currentState = this.PAUSED;
      this.stopPositionUpdates();
      // the following is required, otherwise the view will not be updated
      this.ref.tick();
    }
  }

  private updatePosition() {
    this.file.getCurrentPosition().then((position) => {
      if (position > 0) {
        this.currentPosition = this.formatTime(<number> position);
      }
    });
  }

  private startPositionUpdates() {
    this.interval = setInterval(() => {
      this.updatePosition();
    }, this.UPDATE_PERIOD_IN_MS);
  }

  private stopPositionUpdates() {
    clearTimeout(this.interval);
  }

  private formatTime(seconds: number): string {
    let date = new Date(null);
    date.setSeconds(seconds);

    return date.toISOString().substr(14, 5);
  }
}