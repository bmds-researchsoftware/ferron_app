import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>
          {{ MONTH_NAMES[date.getMonth()] }} {{ date.getDate() }}, {{ date.getFullYear() }}
        </ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content padding>
      <div style="text-align: center;">
        <button ion-button (click)="incrementCount()">
          <ion-icon name="add"></ion-icon>
        </button>
        <input type="number" class="cigarette-count" [(ngModel)]="count" />
        <button ion-button (click)="decrementCount()">
          <ion-icon name="remove"></ion-icon>
        </button>
      </div>
      <div style="text-align: center;">
        <button ion-button (click)="zero()">
          Did not smoke, click here
        </button>
      </div>
      <div style="text-align: center;">
        <button ion-button outline (click)="save()">
          Done
        </button>
      </div>
    </ion-content>
  `
})
export class TrackerFormPage {
  public date: Date;
  public count: number;
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

  constructor(
    public viewController: ViewController,
    public navParams: NavParams
  ) {
    this.date = navParams.data.date;
  }

  incrementCount() {
    if (this.count == null) {
      this.count = 1;
    } else {
      this.count++;
    }
  }
  
  decrementCount() {
    if (this.count == null) {
      this.count = 0;
    } else if (this.count > 0) {
      this.count--;
    }
  }

  zero() {
    this.count = 0;
  }

  save() {
    this.viewController.dismiss({
      count: this.count,
      date: this.date
    });
  }
}