import { Observable, of, empty, timer } from "rxjs";
import { expand, skip } from "rxjs/operators";
import { MINUTE, HOUR, DAY } from "./util";

export abstract class TimagoClock {
  abstract tick(then: number): Observable<any>;
}

export class TimeAgoDefaultClock extends TimagoClock {
  tick(then: number): Observable<any> {
    return of(0).pipe(
      expand(() => {
        const now = Date.now();
        const seconds = Math.round(Math.abs(now - then) / 1000);
        const period =
          seconds < MINUTE
            ? 1000
            : seconds < HOUR
            ? 1000 * MINUTE
            : seconds < DAY
            ? 1000 * HOUR
            : 0;
        return period ? timer(period) : empty();
      }),
      skip(1)
    );
  }
}
