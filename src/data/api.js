// Backend API fetchers

import { API_URL } from 'config';
import moment from 'moment-timezone';

export const COVIDrecessionStartDate = '20200220';

const historicalCrashes = [
  { name: 'Great Depression', start: '1929-09-17' },
  { name: '1970s Recession', start: '1973-01-12' },
  { name: 'Dotcom Bubble', start: '2000-03-24' },
  { name: 'Great Recession', start: '2007-10-10' },
  { name: 'COVID Recession', start: COVIDrecessionStartDate }
];

const numYrs = 3; // time span to get for historical crashes

export const fetchCOVIDdata = async () => {
  const data = await fetchTimeseries(
    'covid',
    COVIDrecessionStartDate,
    formatDate(new Date(), 'UTC')
  );

  // convert dates and calc active cases
  return data.map(d => {
    const date = moment.tz(d.date, 'UTC');
    return {
      world: {
        ...d.world,
        active: d.world.cases - d.world.recovered - d.world.deaths
      },
      US: {
        ...d.US,
        active: d.US.cases - d.US.recovered - d.US.deaths
      },
      date
    };
  });
};

export const fetchMarketData = async market => {
  const data = await Promise.all(
    historicalCrashes.map(c =>
      fetchTimeseries(
        market,
        formatDate(c.start, 'America/New_York'),
        getEnd(c.start)
      )
    )
  );

  // convert dates and total return to %
  return historicalCrashes.map((c, i) => {
    const startDate = moment.tz(c.start, 'America/New_York');
    return {
      name: c.name,
      startDate,
      data: data[i].map(day => {
        const date = moment.tz(day.date, 'America/New_York');
        return {
          totalReturn: day.totalReturn * 100,
          date,
          day: date.diff(startDate, 'days')
        };
      })
    };
  });
};

const fetchTimeseries = async (type, start, end) => {
  const response = await fetch(`${API_URL}/timeseries/${type}/${start}/${end}`);
  if (!response.ok)
    throw new Error(`${response.status}: ${response.statusText}`);
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.data;
};

const formatDate = (date, tz) => moment.tz(date, tz).format('YYYYMMDD');

const getEnd = start =>
  moment.tz(start, 'America/New_York').add(numYrs, 'y').format('YYYYMMDD');
