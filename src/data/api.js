// Backend API fetchers

import {
  API_URL,
  COVIDrecessionStartDate,
  historicalCrashes,
  numYrs
} from 'config';
import moment from 'moment-timezone';

export const fetchCOVIDdata = async () => {
  const response = await fetch(
    `${API_URL}/covid/${formatDate(
      COVIDrecessionStartDate,
      'UTC'
    )}/${formatDate(new Date(), 'UTC')}`
  );
  if (!response.ok)
    throw new Error(`${response.status}: ${response.statusText}`);
  const json = await response.json();
  if (json.error) throw new Error(json.error);

  // convert dates and calc active cases
  return json.data.map(d => {
    const date = moment.tz(d.date, 'UTC');
    return {
      ...d,
      date
    };
  });
};

export const fetchMarketData = async market => {
  const data = await Promise.all(
    historicalCrashes.map(c =>
      fetchTotalReturns(
        market,
        formatDate(c.start, 'America/New_York'),
        getEnd(c.start)
      )
    )
  );

  // convert dates and total return to %
  return historicalCrashes
    .map((c, i) => {
      const startDate = moment.tz(c.start, 'America/New_York');
      return {
        name: c.name,
        color: c.color,
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
    })
    .filter(hc => hc.data.length > 0);
};

const fetchTotalReturns = async (type, start, end) => {
  const response = await fetch(
    `${API_URL}/totalreturns/${type}/${start}/${end}`
  );
  if (!response.ok)
    throw new Error(`${response.status}: ${response.statusText}`);
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.data;
};

const formatDate = (date, tz) => moment.tz(date, tz).format('YYYYMMDD');

const getEnd = start =>
  moment.tz(start, 'America/New_York').add(numYrs, 'y').format('YYYYMMDD');
