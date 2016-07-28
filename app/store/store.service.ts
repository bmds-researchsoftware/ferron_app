/*
 * Acts as a proxy for the Web Worker side of things. Passes messages to the
 * StoreWorker.
 */
import { Injectable } from '@angular/core';

const CACHE_WORKER_SCRIPT: string = 'build/js/store-worker.js';

function randomId(): number {
  return Math.floor(Math.random() * 1000000000);
}

type WorkerRequestHandle = {
  requestId: number,
  onReject: (reason?: any) => void,
  onResolve: (value?: {} | PromiseLike<{}>) => void,
  promise: Promise<{}>
}

type WorkerRequest = {
  argument?: string,
  method: string,
  resource: string,
  id?: number
}

type WorkerResponse = {
  status: string,
  requestId: number,
  result: any
}

@Injectable()
export class Store {
  private static authentication: Promise<{}>;
  private static authenticated: (value?: {} | PromiseLike<{}>) => void;
  private static notAuthenticated: (reason?: any) => void;
  private static cacheWorker: Worker;
  private static RequestHandles: {
    [requestId: number]: WorkerRequestHandle
  } = {};

  public STATUSES = {
    Authenticated: 'authenticated',
    Initialized: 'initialized',
    MessageResolved: 'message_resolved'
  };

  public NAMES = {
    AuthenticationTokens: 'AuthenticationTokens',
    Devices: 'Devices'
  };

  public save(resourceType: string, data: any): Promise<{}> {
    const PERSIST: string = 'persist';

    return this.createRequest({
      argument: data,
      method: PERSIST,
      resource: resourceType
    });
  }

  public createRequest(request: WorkerRequest): Promise<{}> {
    if (Store.cacheWorker == null) {
      throw new Error('Expected reference to a Worker was null');
    }

    let requestHandle: WorkerRequestHandle = {
      onReject: null,
      onResolve: null,
      promise: null,
      requestId: randomId()
    };
    requestHandle.promise = new Promise(function(resolve, reject) {
      requestHandle.onResolve = resolve;
      requestHandle.onReject = reject;
    });
    Store.RequestHandles[requestHandle.requestId] = requestHandle;
    request.id = requestHandle.requestId;
    Store.cacheWorker.postMessage(request);

    return requestHandle.promise;
  }

  public authenticate(): Promise<{}> {
    if (Store.authentication == null) {
      Store.authentication = new Promise(function(resolve, reject) {
        Store.authenticated = resolve;
        Store.notAuthenticated = reject;
      });
      this.loadWorker();
      this.initializeCache();
    }

    return Store.authentication;
  }

  public loadWorker(loader?: Worker): void {
    if (Store.cacheWorker != null) {
      return;
    }

    Store.cacheWorker = loader || new Worker(CACHE_WORKER_SCRIPT);
    Store.cacheWorker.onmessage = this.onWorkerMessage.bind(this);
    Store.cacheWorker.onerror = this.onWorkerError;
  }

  public terminateWorker(): void {
    if (Store.cacheWorker == null) {
      return;
    }

    Store.cacheWorker.terminate();
    Store.cacheWorker = null;
  }

  public resetAuthentication(): void {
    Store.authentication = null;
  }

  private onWorkerMessage(event: { data: WorkerResponse }): void {
    if (event.data.status === this.STATUSES.Authenticated) {
      Store.authenticated();
    } else if (event.data.status === this.STATUSES.Initialized) {
      Store.notAuthenticated();
      Store.authentication = null;
      Store.authenticated = null;
      Store.notAuthenticated = null;
    } else if (event.data.status === this.STATUSES.MessageResolved) {
      let handle = Store.RequestHandles[event.data.requestId];
      handle.onResolve(event.data.result);
      delete Store.RequestHandles[event.data.requestId];
    }
  }

  private onWorkerError(event: ErrorEvent): void {
    window.alert('An error occurred: ' + event.message);
    Store.notAuthenticated();
  }

  private initializeCache() {
    let initializeCache: WorkerRequest = {
      method: 'initialize',
      resource: 'cache'
    };

    Store.cacheWorker.postMessage(initializeCache);
  }
}
