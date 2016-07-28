import { Store } from './store.service';
import {
  beforeEachProviders,
  describe,
  inject,
  it
} from '@angular/core/testing';

describe('Store', () => {
  let store: Store;

  function StubLoader() {
    this.addEventListener = null;
    this.dispatchEvent = null;
    this.onerror = null;
    this.onmessage = null;
    this.postMessage = null;
    this.removeEventListener = null;
    this.terminate = () => { return; };
  }

  beforeEachProviders(() => [
    Store
  ]);

  beforeEach(inject([Store], (s) => {
    store = s;
  }));

  afterEach(() => {
    store.terminateWorker();
    store.resetAuthentication();
  });

  describe('#save', () => {
    describe('when a worker has been loaded', () => {
      it('posts a message to the worker', () => {
        let mockLoader = new StubLoader();
        mockLoader.postMessage = jasmine.createSpy('postMessage');
        let data = { bar: 'asdf', foo: 1 };
        store.loadWorker(mockLoader);
        store.save('FooType', data);

        expect(mockLoader.postMessage).toHaveBeenCalledWith({
          argument: data,
          id: jasmine.anything(),
          method: 'persist',
          resource: 'FooType'
        });
      });
    });

    describe('when a Worker has not been loaded', () => {
      it('throws an error', () => {
        let data = { bar: 'asdf', foo: 1 };

        expect(() => {
          store.save('FooType', data);
        }).toThrowError(/Expected reference to a Worker/);
      });
    });
  });

  describe('#authenticate', () => {
    describe('when the worker has authenticated', () => {
      it('resolves', done => {
        let mockLoader = new StubLoader();
        mockLoader.postMessage = function() {
          setTimeout(() => {
            this.onmessage({
              data: { status: store.STATUSES.Authenticated }
            });
          }, 0);
        };
        store.loadWorker(mockLoader);

        store.authenticate().then(done);
      });
    });

    describe('when the worker has failed to authenticate', () => {
      it('rejects', done => {
        let mockLoader = new StubLoader();
        mockLoader.postMessage = function() {
          setTimeout(() => {
            this.onmessage({
              data: { status: store.STATUSES.Initialized }
            });
          }, 0);
        };
        store.loadWorker(mockLoader);

        store.authenticate().catch(done);
      });
    });

    describe('when there is an error', () => {
      it('generates an alert', done => {
        let mockLoader = new StubLoader();
        mockLoader.postMessage = function() {
          setTimeout(() => {
            this.onerror(new ErrorEvent());
          }, 0);
        };
        store.loadWorker(mockLoader);

        store.authenticate().catch(done);
      });
    });
  });

  describe('#createRequest', () => {
    describe('when a worker message related to the request is received', () => {
      it('resolves the original promise', done => {
        let mockLoader = new StubLoader();
        let request = {
          id: null,
          method: 'foo',
          resource: 'Bar'
        };
        mockLoader.postMessage = function() {
          setTimeout(() => {
            this.onmessage({
              data: {
                requestId: request.id,
                status: store.STATUSES.MessageResolved
              }
            });
          });
        };
        store.loadWorker(mockLoader);

        store.createRequest(request).then(done);
      });
    });
  });
});
