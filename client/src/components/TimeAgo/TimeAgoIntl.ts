import { Subject } from "rxjs";
import { StringOrFn, NumberArray } from "./TimeAgoFormatter";

export interface IL10nsStrings {
  prefixAgo?: StringOrFn;
  prefixFromNow?: StringOrFn;
  suffixFromNow?: StringOrFn;
  suffixAgo?: StringOrFn;
  second?: StringOrFn;
  seconds?: StringOrFn;
  minute?: StringOrFn;
  minutes?: StringOrFn;
  months?: StringOrFn;
  hours?: StringOrFn;
  hour?: StringOrFn;
  day?: StringOrFn;
  days?: StringOrFn;
  week?: StringOrFn;
  weeks?: StringOrFn;
  month?: StringOrFn;
  year?: StringOrFn;
  years?: StringOrFn;
  wordSeparator?: string;
  numbers?: NumberArray;
}

export class TimeagoIntl {
  strings: IL10nsStrings = {
    suffixAgo: "ago",
    suffixFromNow: "from now",
    seconds: "less than a minute",
    minute: "about a minute",
    minutes: "%d minutes",
    hour: "about an hour",
    hours: "about %d hours",
    day: "a day",
    days: "%d days",
    month: "about a month",
    months: "%d months",
    year: "about a year",
    years: "%d years",
    wordSeparator: " ",
  };
  readonly changes: Subject<void> = new Subject<void>();
}
