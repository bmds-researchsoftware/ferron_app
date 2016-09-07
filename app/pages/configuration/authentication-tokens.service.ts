import { Injectable } from '@angular/core';

type serverResponse = {
  data: { value: string }
}

/*
 * Wraps the cache_and_sync_love AuthenticationTokensResource for more
 * consistent DI and testing.
 */
@Injectable()
export class AuthenticationTokens {
  private resource;

  constructor() {
    let cbit = (<any> window).cbit || {};
    this.resource = Object.create(cbit.AuthenticationTokensResource);
  }

  public setUrl(url: string) {
    this.resource.setUrl(url);
  }

  public setClientUuid(uuid: string) {
    this.resource.setClientUuid(uuid);
  }

  public create(token: string): Promise<serverResponse> {
    return this.resource.create(token);
  }
}
