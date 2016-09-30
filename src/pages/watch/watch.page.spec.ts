import { FerronNetwork } from '../../native-plugins/ferron-network.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { WatchPage } from './watch.page';
import { TestBed, inject } from '@angular/core/testing';
import { ModalController } from 'ionic-angular';

describe('WatchPage', () => {
  let watchPage: WatchPage;
  let stubModalController = { create() { return void 0; } };
  let mockVideos = [{ id: '123', title: 'abc' }];
  let stubSqlite = {
    initialize() { return Promise.resolve(); },
    fetchAll(table) { return Promise.resolve(mockVideos); }
  };
  let stubNetwork = {
    isConnected() { return true; }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchPage],
      providers: [
        { provide: FerronNetwork, useValue: stubNetwork },
        { provide: FerronSqlite, useValue: stubSqlite },
        { provide: ModalController, useValue: stubModalController }
      ]
    });
  });

  beforeEach(inject([WatchPage], watch => {
    watchPage = watch;
  }));

  it('loads the list of streaming videos', done => {
    stubSqlite.fetchAll(null).then(() => {
      watchPage.streamingVideos.then(videos => {
        expect(videos).toEqual([{ id: '123', title: 'abc' }]);
        done();
      });
    });
  });
});
