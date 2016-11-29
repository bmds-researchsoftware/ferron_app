import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import moment from 'moment';
import { FerronLocalNotifications } from '../../native-plugins/ferron-local-notifications.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';

/*
  Page that displays reminder time.
*/
@Component({
  templateUrl: 'reminders.html',
})
export class RemindersPage {
  public reminderTimestamp: string;
  public APP_TITLE = 'Calm. Cope. Quit.';
  public REMINDER_TEXT = 'Check-in and do your coping skill';
  public ICON = 'res://../drawable-hdpi-v4/icon.png';

  private _isDisabled = true;
  private NOTIFICATION_ID = 1;
  private TIME_FORMAT = 'HH:mm';

  constructor(
    public nav: NavController,
    public notifications: FerronLocalNotifications,
    public sqlite: FerronSqlite
  ) {
    console.log('look up notification 1');
    this.notifications.get(this.NOTIFICATION_ID).then(notification => {
      if (notification) {
        console.log('found notification scheduled at ' + notification.at);
        this.reminderTimestamp = moment.unix(notification.at).format(this.TIME_FORMAT);
      } else {
        console.log('did not find notification');
        this._isDisabled = false;
      }
    }).catch(_ => {
      console.log('error looking up notification');
      this._isDisabled = false;
    });

    setTimeout(_ => {
      console.log('after timeout checking timestamp');
      if (this.reminderTimestamp == null) {
        console.log('timestamp not set, enabling input');
        this._isDisabled = false;
      }
    }, 500);
  }

  public isDisabled() {
    return this._isDisabled;
  }

  public timeChange() {
    console.log('string is now ' + this.reminderTimestamp);
    this._isDisabled = true;
    let nextTime = moment(this.reminderTimestamp, this.TIME_FORMAT);

    if (nextTime.isBefore(moment())) {
      console.log('time is before now, adding a day');
      nextTime = nextTime.add(1, 'day');
    }

    this.notifications.schedule({
      id: this.NOTIFICATION_ID,
      title: this.APP_TITLE,
      text: this.REMINDER_TEXT,
      every: 'day',
      at: nextTime.valueOf(),
      icon: this.ICON
    });

    this.sqlite.initialize().then(() => {
      this.sqlite.persist('reminders', {
        hour: nextTime.hour().toString(),
        minute: nextTime.minute().toString()
      });
    });
  }
}
