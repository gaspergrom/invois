import dayjs, { OpUnitType, QUnitType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

class DateService {
  constructor() {
    /* eslint-disable import/no-named-as-default-member */
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(customParseFormat);
  }

  // eslint-disable-next-line class-methods-use-this
  get instance() {
    return dayjs;
  }

  getTimezone() {
    return this.instance.tz.guess();
  }

  getUTCOffset() {
    const offset = this.instance().utcOffset() / 60;
    return offset < 0 ? `-${offset}` : `+${offset}`;
  }

  format(date: any, format: string) {
    return this.instance(date).format(format);
  }

  diff(date: any, unit: QUnitType | OpUnitType) {
    return this.instance(date).diff(this.instance(), unit);
  }

  getTimeByUtc(utcValue: string) {
    return this.instance().utc().add(parseFloat(utcValue.replace('UTC', '')), 'hour');
  }
}

// eslint-disable-next-line import/prefer-default-export
export const DATE_SERVICE = new DateService();
