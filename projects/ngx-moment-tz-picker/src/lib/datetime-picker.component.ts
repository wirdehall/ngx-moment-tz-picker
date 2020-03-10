import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import { FormControl } from '@angular/forms';
// @ts-ignore
import moment from 'moment-timezone';

import MyErrorStateMatcher from './errorStateMatcher';

@Component({
  selector: 'ngx-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
})
export class DatetimePickerComponent implements OnChanges, OnInit {

  @Input() dateTime: moment.Moment;
  @Input() label: string;
  @Input() errorMessages?: ReadonlyArray<string>;

  @Output() dateTimeChange = new EventEmitter<moment.Moment>();

  public pressentableDateTime: FormControl;
  public selectedDate: moment.Moment;
  public popupActive = false;
  public hour: FormControl;
  public minute: FormControl;
  public errorStateMatcher: MyErrorStateMatcher;
  public isInvalid = false;

  ngOnInit() {
    if (this.dateTime.isValid()) {
      this.pressentableDateTime = new FormControl(this.dateTime.format('YYYY-MM-DD HH:mm'));
      this.hour = new FormControl(this.dateTime.format('HH'));
      this.minute = new FormControl(this.dateTime.format('mm'));
    } else {
      this.pressentableDateTime = new FormControl('');
      this.hour = new FormControl(0);
      this.minute = new FormControl(0);
    }
    this.selectedDate = this.dateTime;
  }

  ngOnChanges() {
    this.errorStateMatcher = new MyErrorStateMatcher(this.errorMessages);
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
      if (dateTime.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)) {
        this.dateTime = moment(dateTime);
        this.dateTimeChange.emit(this.dateTime);
        this.hour.setValue(this.dateTime.format('HH'));
        this.minute.setValue(this.dateTime.format('mm'));
      } else if (dateTime === '') {
        this.dateTime = moment('');
        this.dateTimeChange.emit(null);
        this.hour.setValue(0);
        this.minute.setValue(0);
      } else {
        this.dateTime = moment('');
        this.hour.setValue(0);
        this.minute.setValue(0);
        this.dateTimeChange.emit(this.dateTime);
      }
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
