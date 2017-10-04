import { Injectable } from '@angular/core';
import { Toast } from 'ionic-native';

/*
 * Wraps the Ionic native plugin for more consistent DI and testing.
 */
@Injectable()
export class FerronToast {
  public DURATION = '5000';
  public LOCATION = 'top';

  public show(text: string): void {
    Toast.show(text, this.DURATION, this.LOCATION).subscribe(toast => {
      // noop
    });
  }
}
