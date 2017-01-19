import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NavParams, ViewController } from 'ionic-angular';

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