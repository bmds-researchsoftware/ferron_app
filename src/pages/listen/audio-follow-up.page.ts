import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

// A modal that displays the audio follow up questions.
@Component({
  templateUrl: 'audio-follow-up.html'
})
export class AudioFollowUpPage {
  public skillWasTried: boolean = null;
  public audioWasLiked: boolean = null;
  public confidenceInCoping = 3;

  constructor(public params: NavParams,
              public viewController: ViewController) {}

  public audioTitle(): string {
    return this.params.get('title');
  }

  public dismiss() {
    this.viewController.dismiss({
      did_try_skill: this.skillWasTried,
      did_like_audio: this.audioWasLiked,
      confidence_in_coping: this.confidenceInCoping,
      audio_title: this.audioTitle()
    });
  }

  public shouldShowDidTrySkill() {
    return this.skillWasTried == null;
  }

  public didTrySkill() {
    this.skillWasTried = true;
  }

  public didNotTrySkill() {
    this.skillWasTried = false;
  }

  public shouldShowDidLikeAudio() {
    return this.skillWasTried != null && this.audioWasLiked == null;
  }

  public didLikeAudio() {
    this.audioWasLiked = true;
  }

  public didNotLikeAudio() {
    this.audioWasLiked = false;
  }

  public shouldShowConfidenceInCoping() {
    return this.skillWasTried != null &&
           this.audioWasLiked != null;
  }
}