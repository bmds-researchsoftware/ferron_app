/*import { FerronSqlite } from '../native-plugins/ferron-sqlite.service';
import { Store } from './store.service';
import { TestBed, inject } from '@angular/core/testing';

(<any> window).CalmCopeQuit = {
  SERVER_URL: 'http://localhost:9876'
};

describe('Store', () => {
  let store: Store;
  let stubToken = {};
  let stubDevice = {};
  let stubSqlite = {
    first(type) {
      return Promise.resolve(
        { authentication_tokens: stubToken, devices: stubDevice }[type]
      );
    },
    setPayloadResource() {},
    setPeriod() {},
    setNetwork() {},
    run() {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Store],
      providers: [{ provide: FerronSqlite, useValue: stubSqlite }]
    });
  });

  beforeEach(inject([Store], (s) => {
    store = s;
    stubToken = {};
  }));

  afterEach(() => {
    store.resetAuthentication();
  });

  describe('#authenticate', () => {
    describe('when the worker has authenticated', () => {
      it('resolves', done => {
        store.authenticate().then(done);
      });
    });

    describe('when the worker has failed to authenticate', () => {
      it('rejects', done => {
        stubToken = null;

        store.authenticate().catch(done);
      });
    });
  });
});*/
