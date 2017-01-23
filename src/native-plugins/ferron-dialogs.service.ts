import { Injectable } from '@angular/core';
import { Dialogs } from 'ionic-native';

/*
 * Wraps the Ionic native plugin for more consistent DI and testing.
 */
@Injectable()
export class FerronDialogs {
  public confirm(
    message: any,
    title?: string,
    buttonLabels?: string[]
  ): Promise<number> {
    return Dialogs.confirm(message, title, buttonLabels);
  }
}