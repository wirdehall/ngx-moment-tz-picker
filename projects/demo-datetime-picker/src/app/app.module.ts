import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

// import { DatetimePickerModule } from 'projects/datetime-picker/src/lib/datetime-picker.module';
import { DatetimePickerModule } from 'dist/ngx-moment-tz-picker';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatMomentDateModule,
    DatetimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
