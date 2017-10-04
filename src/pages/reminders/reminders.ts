import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import moment from 'moment';
import { FerronLocalNotifications } from '../../native-plugins/ferron-local-notifications.service';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { FerronToast } from '../../native-plugins/ferron-toast.service';

const TIME_FORMAT = 'HH:mm';

function getMoment(timestamp: string): moment.Moment {
  return moment(timestamp, TIME_FORMAT);
}

/*
  Page that displays reminder time.
*/
@Component({
  templateUrl: 'reminders.html',
})
export class RemindersPage {
  public APP_TITLE = 'Calm. Cope. Quit.';
  public REMINDER_TEXT = 'Check-in and do your coping skill';
  public ICON = 'res://../drawable-hdpi-v4/icon.png';

  private reminders = [
    { timestamp: '', id: 1 },
    { timestamp: '', id: 2 },
    { timestamp: '', id: 3 }
  ];
  private US_TIME_FORMAT = 'h:mm a';

  constructor(
    public nav: NavController,
    public notifications: FerronLocalNotifications,
    public sqlite: FerronSqlite,
    public toast: FerronToast
  ) {
    this.reminders.forEach(reminder => {
      this.notifications.get(reminder.id).then(notification => {
        if (notification) {
          reminder.timestamp = this.formatTimestamp(notification.at);
        }
      });
    });
  }

  public saveTime(reminder: { timestamp: string, id: number }) {
    let nextTime = getMoment(reminder.timestamp);

    this.reminders.some(existingReminder => {
      if (reminder.id !== existingReminder.id &&
          existingReminder.timestamp !== '') {
        let existingTime = getMoment(existingReminder.timestamp).dayOfYear(nextTime.dayOfYear());
        if (nextTime.isBetween(moment(existingTime).subtract(30, 'minutes'),
                               moment(existingTime).add(30, 'minutes'))) {
          reminder.timestamp = '';
          this.toast.show('notifications must be 30 minutes apart');
          return true;
        }
      }
    });

    if (nextTime.isBefore(moment())) {
      nextTime = nextTime.add(1, 'day');
    }

    this.notifications.schedule({
      id: reminder.id,
      title: this.APP_TITLE,
      text: this.REMINDER_TEXT,
      every: 'day',
      at: nextTime.valueOf(),
      icon: this.ICON
    });

    this.sqlite.initialize().then(() => {
      this.sqlite.persist('reminders', {
        hour: nextTime.hour().toString(),
        minute: nextTime.minute().toString(),
        is_deleted: false
      });
    });
  }
  
  public formatUSTimestamp(at: string) {
    return getMoment(at).format(this.US_TIME_FORMAT);
  }

  public deleteReminder(reminder: { timestamp: string, id: number }) {
    let momentTime = getMoment(reminder.timestamp);

    this.notifications.cancel(reminder.id).then(() => {
      this.reminders[reminder.id - 1].timestamp = '';
      this.sqlite.initialize().then(() => {
        this.sqlite.persist('reminders', {
          hour: momentTime.hour().toString(),
          minute: momentTime.minute().toString(),
          is_deleted: true
        });
      });
    });
  }

  private formatTimestamp(at: number) {
    return moment.unix(at).format(TIME_FORMAT);
  }
}
