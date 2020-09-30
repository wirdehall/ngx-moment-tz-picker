import { Component, OnInit } from '@angular/core';

// @ts-ignore
import moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public dateTime1: moment.Moment;
  public dateTime2: moment.Moment;
  public dateTime3: moment.Moment;
  public lastEvent: string;

  public errorMessages = [];
  public disabled = true;

  ngOnInit() {
    moment.tz.setDefault('America/Los_Angeles');
    this.dateTime1 = null; // moment(1582629300000);
    this.dateTime2 = moment(1582629300000);
    this.dateTime3 = null;
  }

  changed(event: moment.Moment) {
    console.log(event);
    if (event === null) {
      this.lastEvent = '';
    } else {
      this.lastEvent = event.format('YYYY-MM-DD HH:mm (z)');
    }
  }

}
