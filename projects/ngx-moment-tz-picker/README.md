# Ngx-moment-tz-picker

A library created for providing a datetime picker using momentjs with it's timezone plugin and Angular-material calander as the datepicker.
Used when the project needs timezone dependent datetime picker instead of using the the browser timezone / offset.

Take a look at a demo: [Stackblitz link](https://angular-ssmzzz.stackblitz.io).

## Dependencies needed in your project to use this lib
 - Angular
 - Angular material
 - Angular/material-moment-adapter
 - moment-timezone

## Usage example

First of all you want to set the default timezone using moment timezone.
Perferably somewhere centralized for you entire application.
If your using NGRX an effect might be a good choice as you run your action to set it in your store.

Example:
```
moment.tz.setDefault('America/Los_Angeles');
```

Later in you component.ts file you want to set a startdate like so:
```
this.dateTime1 = moment(1582629300000);
```

In your template:
```
<ngx-datetime-picker
  [(dateTime)]="dateTime1"
  label="test"
></ngx-datetime-picker>
```

## API
| Name             | Type                                       | Description                                                          |
| ---------------- |:-------------------------------------------|:---------------------------------------------------------------------|
| datetime         | Two way binding (momentjs object)          | The inital datetime object, also automaticly updates.                |
| title            | @Input() title: string                     | The title of the input field                                         |
| dateTimeChange   | @Output() dateTimeChange: ($event) => void | If you want to hook anything up to the event of `datetime` changing. |


## Known limitations:

At the moment there are not alot of differant choices that can be done, not like the regular datepicker in angular-material for example.
I build this because i needed it for a project and that specific use-case and thought i could publish it because i thought it was crasy that I couldn't find a lib that already did this.
One thing I would guess alot of people would like is the ability to choose datetime formats in the input field. It's probably verry easy to implement and if the needs arrises we could do it.

## Updating the lib with more functunality to suit your needs

I will keep updating this lib with what I need and i encurage anyone too do the same.
Feel free to create a merge request on github: [https://github.com/wirdehall/ngx-moment-tz-picker/pulls](https://github.com/wirdehall/ngx-moment-tz-picker/pulls)
