import { Injectable } from '@angular/core';
import { LocalNotifications } from 'ionic-native';

/*
 * Wraps the Ionic native plugin for more consistent DI and testing.
 */
@Injectable()
export class FerronLocalNotifications {
  public schedule(
    options: {
      id: number,
      title: string,
      text: string,
      every: string,
      at: number,
      icon: string
    }
  ) {
    LocalNotifications.schedule(options);
  }

  public get(notificationId: number): Promise<{ at: number }> {
    return LocalNotifications.get(notificationId).then(notification => {
      return { at: notification.at };
    });
  }

  public on(eventName: string, callback: Function) {
    LocalNotifications.on(eventName, callback);
  }
}
