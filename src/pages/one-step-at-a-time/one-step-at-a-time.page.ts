import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Component } from '@angular/core';

@Component({
  templateUrl: 'one-step-at-a-time.html',
})
export class OneStepAtATimePage {
  public audioUrl: SafeResourceUrl;
  public AUDIO_URL = 'assets/audio_files/Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3';

  constructor(public domSanitizer: DomSanitizer) {
    this.audioUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.AUDIO_URL
    );
  }
}
