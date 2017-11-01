import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { FerronSqlite } from '../../native-plugins/ferron-sqlite.service';
import { TrackerFormPage } from './tracker-form';
import { Tracking } from '../tracking';

const SUNDAY = 0, SATURDAY = 6,
      WEEK_STARTS_ON = SUNDAY,
      WEEK_ENDS_ON = SATURDAY;

function addDays(startDate, count) {
  return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + count, 12);
};

/*
  Page that displays tracker calendar.
*/
@Component({
  templateUrl: 'tracker.html',
})
export class TrackerPage extends Tracking {
  public MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  public TRACKED_CIGARETTES_TABLE = "tracked_cigarettes";

  private weeks: Promise<Array<any>>|null = null;
  private date = new Date();
  private pageName = 'Cigarette Tracker';
  
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public sqlite: FerronSqlite
  ) {
    super(sqlite);
    this.sqlite.initialize().then(() => {
      this.recalculate();
    }).catch(error => {
      console.log('error initializing: ' + error);
    });
  }
  
  private recalculate() {
    this.weeks = this.sqlite.fetchAll(this.TRACKED_CIGARETTES_TABLE).then(counts => {
      let weeks = [];
      
      for (let w = this.calendarStartDate(); w < this.calendarEndDate(); w = addDays(w, 7)) {
        let week = [];

        for (let d = w, a = 1; a <= 7; d = addDays(w, a++)) {
          let count = counts.find(count => {
            return d.valueOf() === new Date(count.date).setHours(12);
          });
          week.push({ date: d, count: (count || {}).count, uuid: (count || {}).uuid });
        }
        weeks.push(week);
      }

      return weeks;
    });
  }

  public previousPeriod() {
    const buttonLabel = 'Previous Month';
    this.date = addDays(this.monthStartDate(), -1);
    this.recordNav(this.pageName, buttonLabel);
    this.recalculate();
  }

  public nextPeriod() {
    const buttonLabel = 'Next Month';
    this.date = addDays(this.monthEndDate(), 1);
    this.recordNav(this.pageName, buttonLabel);
    this.recalculate();
  }

  public showFormModal(day: { date: Date, count: number }) {
    let modal = this.modal.create(TrackerFormPage, day);
    modal.onDidDismiss(trackedCigarettes => {
      if (trackedCigarettes == null) {
        return;
      }
      this.sqlite.persist('tracked_cigarettes', trackedCigarettes);
      this.recalculate();
    });
    modal.present();
    this.recordNav(this.pageName, day.date.toISOString());
  }

  private monthStartDate(): Date {
    return new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  }

  private monthEndDate(): Date {
    return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  }

  private calendarStartDate() {
    let diff =  WEEK_STARTS_ON - this.monthStartDate().getDay();

    return new Date(this.date.getFullYear(), this.date.getMonth(), 1 + diff);
  }

  private calendarEndDate() {
    let diff =  WEEK_ENDS_ON - this.monthEndDate().getDay();

    return new Date(this.date.getFullYear(), this.date.getMonth(), this.monthEndDate().getDate() + diff);
  }
}
