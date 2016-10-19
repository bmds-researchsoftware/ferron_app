import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { BundledVideoPage } from '../watch/watch.page';

/*
 * The page for nicotine replacement.
 */
@Component({
  templateUrl: 'nicotine-replacement.html'
})
export class NicotineReplacementPage {
  public bundledVideos = [
    {
      title: 'Nicotine Replacement Patch',
      url: 'assets/videos/big_buck_bunny.mp4'
    },
    {
      title: 'Nicotine Replacement Gum',
      url: 'assets/videos/big_buck_bunny.mp4'
    },
    {
      title: 'Nicotine Replacement Lozenge',
      url: 'assets/videos/big_buck_bunny.mp4'
    }
  ];

  constructor(public modalController: ModalController) {}

  public openBundledModal(video: { url: string, title: string }) {
    let modal = this.modalController.create(BundledVideoPage, video);
    modal.present();
  }
}
