import React from "react";
import { dateParser } from "./util";
import { filter } from "rxjs/operators";
import { TimeagoIntl } from "./TimeAgoIntl";
import { Subscription, Subject } from "rxjs";
import { TimeAgoDefaultClock } from "./TimeAgoClock";
import { TimeagoDefaultFormatter } from "./TimeAgoFormatter";
interface Props {
  date: number;
  live?: boolean;
}

const TimeAgo: React.FC<Props> = ({ date, live = true }) => {
  const [timeAgoIntl] = React.useState(new TimeagoIntl());
  const [formatter] = React.useState(new TimeagoDefaultFormatter());
  const [clock] = React.useState(new TimeAgoDefaultClock());
  const [clockSub, setClockSub] = React.useState<Subscription | undefined>();
  const [intlSubscription, setSub] = React.useState<Subscription | undefined>();
  const [value, setValue] = React.useState<string>("");
  const stateChanges = React.useRef<Subject<void>>(new Subject<void>());

  React.useEffect(() => {
    const _date = dateParser(date).valueOf();
    console.log(_date);
    stateChanges.current.subscribe(() => {
      const newValue = formatter.format(date);
      console.log(newValue);
      setValue(newValue);
    });
    setSub(timeAgoIntl.changes.subscribe(() => stateChanges.current.next()));

    if (_date) {
      if (clockSub) {
        clockSub.unsubscribe();
        setClockSub(undefined);
      }
      setClockSub(
        clock
          .tick(_date)
          .pipe(filter(() => live))
          .subscribe(() => stateChanges.current.next())
      );
    }
    return () => {
      stateChanges.current.complete();
      intlSubscription?.unsubscribe();
      clockSub?.unsubscribe();
      setClockSub(undefined);
      setSub(undefined);
    };
  }, [date]);

  return <div>{value}</div>;
};

export default TimeAgo;

// export class TimeagoPipe {
//     private intlSubscription: Subscription;
//     private clockSubscription: Subscription;

//     private date: number;
//     private value: string;
//     private live = true;

//     /**
//      * Emits on:
//      * - Input change
//      * - Intl change
//      * - Clock tick
//      */
//     stateChanges = new Subject<void>();

//     constructor(
//         intl: TimeagoIntl,
//         formatter: TimeagoFormatter,
//         private clock: TimeagoClock
//     ) {
//         if (intl) {
//             this.intlSubscription = intl.changes.subscribe(() =>
//                 this.stateChanges.next()
//             );
//         }
//         this.stateChanges.subscribe(() => {
//             this.value = formatter.format(this.date);
//             cd.markForCheck();
//         });
//     }

//     transform(date: any, ...args: any[]) {
//         const _date = dateParser(date).valueOf();
//         let _live: boolean;

//         _live = isDefined(args[0]) ? coerceBooleanProperty(args[0]) : this.live;

//         if (this.date === _date && this.live === _live) {
//             return this.value;
//         }

//         this.date = _date;
//         this.live = _live;

//         if (this.date) {
//             if (this.clockSubscription) {
//                 this.clockSubscription.unsubscribe();
//                 this.clockSubscription = undefined;
//             }
//             this.clockSubscription = this.clock
//                 .tick(this.date)
//                 .pipe(filter(() => this.live, this))
//                 .subscribe(() => this.stateChanges.next());
//             this.stateChanges.next();
//         } else {
//             throw new SyntaxError(
//                 `Wrong parameter in TimeagoPipe. Expected a valid date, received: ${date}`
//             );
//         }

//         return this.value;
//     }

//     ngOnDestroy() {
//         if (this.intlSubscription) {
//             this.intlSubscription.unsubscribe();
//             this.intlSubscription = undefined;
//         }
//         if (this.clockSubscription) {
//             this.clockSubscription.unsubscribe();
//             this.clockSubscription = undefined;
//         }
//         this.stateChanges.complete();
//     }
// }
