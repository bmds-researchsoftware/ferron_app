import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

// A modal that displays the video follow up questions.
@Component({
  templateUrl: 'video-follow-up.html'
})
export class VideoFollowUpPage {
  public skillWasTried: boolean = null;
  public videoWasLiked: boolean = null;
  public confidenceInCoping = 3;

  constructor(public params: NavParams,
              public viewController: ViewController) {}

  public videoTitle(): string {
    return this.params.get('title');
  }

  public dismiss() {
    this.viewController.dismiss({
      did_try_skill: this.skillWasTried,
      did_like_video: this.videoWasLiked,
      confidence_in_coping: this.confidenceInCoping,
      video_title: this.videoTitle()
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

  public shouldShowDidLikeVideo() {
    return this.skillWasTried != null && this.videoWasLiked == null;
  }

  public didLikeVideo() {
    this.videoWasLiked = true;
  }

  public didNotLikeVideo() {
    this.videoWasLiked = false;
  }

  public shouldShowConfidenceInCoping() {
    return this.skillWasTried != null &&
           this.videoWasLiked != null;
  }
}