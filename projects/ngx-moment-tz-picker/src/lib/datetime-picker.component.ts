import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
// @ts-ignore
import moment from 'moment-timezone';

@Component({
  selector: 'ngx-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {

  @Input() dateTime: moment.Moment;
  @Output() dateTimeChange = new EventEmitter<moment.Moment>();
  @Input() label: string;

  public pressentableDateTime: FormControl;
  public selectedDate: moment.Moment;
  public popupActive = false;
  public hour: FormControl;
  public minute: FormControl;

  ngOnInit() {
    this.pressentableDateTime = new FormControl(this.dateTime.format('YYYY-MM-DD HH:mm'));
    this.hour = new FormControl(this.dateTime.format('HH'));
    this.minute = new FormControl(this.dateTime.format('mm'));
    this.selectedDate = this.dateTime;
  }

  incHour() {
    const hour = parseInt(this.hour.value, 10);
    if (hour === 23) {
      return this.hour.setValue('00');
    } else {
      return this.hour.setValue((hour + 1 + '').padStart(2, '0'));
    }
  }

  decHour() {
    const hour = parseInt(this.hour.value, 10);
    if (hour === 0) {
      return this.hour.setValue('23');
    } else {
      return this.hour.setValue((hour - 1 + '').padStart(2, '0'));
    }
  }

  incMinute() {
    const minute = parseInt(this.minute.value, 10);
    if (minute === 59) {
      return this.minute.setValue('00');
    } else {
      return this.minute.setValue((minute + 1 + '').padStart(2, '0'));
    }
  }

  decMinute() {
    const minute = parseInt(this.minute.value, 10);
    if (minute === 0) {
      return this.minute.setValue('59');
    } else {
      return this.minute.setValue((minute - 1 + '').padStart(2, '0'));
    }
  }

  onSelect(event: moment.Moment) {
    this.selectedDate = event;
  }

  manuallyFromForm(dateTime: string) {
    if (!this.popupActive) {
      this.dateTime = moment(dateTime);
      this.dateTimeChange.emit(this.dateTime);
      this.hour.setValue(this.dateTime.format('HH'));
      this.minute.setValue(this.dateTime.format('mm'));
    }
  }

  save() {
    this.dateTime = this.selectedDate
      .hour(parseInt(this.hour.value, 10))
      .minute(parseInt(this.minute.value, 10))
      .second(0);

    this.pressentableDateTime = new FormControl(this.dateTime.format('YYYY-MM-DD HH:mm'));
    this.dateTimeChange.emit(this.dateTime);
    this.popupActive = false;
  }

}
