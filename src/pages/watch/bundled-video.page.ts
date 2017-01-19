import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NavParams, ViewController } from 'ionic-angular';

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