import * as api from './api';
import moment from 'moment-timezone';

export default async function fetchData() {
  const [SP500, COVID] = await Promise.all([
    api.fetchSP500TRs(),
    api.fetchCOVIDdata()
  ]);
  // convert dates to moment and total return to %
  const COVIDdata = COVID.map(d => {
    const date = moment.tz(d.date, 'UTC');
    return {
      ...d,
      date
    };
  });

  const SP500data = SP500.map(h => {
    const startDate = moment.tz(h.data[0].date, 'America/New_York');
    return {
      ...h,
      data: h.data.map(d => {
        const date = moment.tz(d.date, 'America/New_York');
        return {
          ...d,
          totalReturn: (d.totalReturn - 1) * 100,
          date,
          day: date.diff(startDate, 'days')
        };
      })
    };
  });

  return {
    SP500: SP500data,
    COVID: COVIDdata
  };
}
