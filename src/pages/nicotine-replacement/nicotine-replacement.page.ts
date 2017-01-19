import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { BundledVideoPage } from '../watch/bundled-video.page';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { Tracking } from '../tracking';

/*
 * The page for nicotine replacement.
 */
@Component({
  templateUrl: 'nicotine-replacement.html'
})
export class NicotineReplacementPage extends Tracking {
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
  public pageName = 'Nicotice replacement';

  constructor(
    public modalController: ModalController,
    public sqlite: FerronSqlite
  ) {
    super(sqlite);
  }

  public openBundledModal(video: { url: string, title: string }) {
    let modal = this.modalController.create(BundledVideoPage, video);
    const buttonLabel = `Open video file: ${video.title}`;
    this.recordNav(this.pageName, buttonLabel);

    modal.present();
  }
}
