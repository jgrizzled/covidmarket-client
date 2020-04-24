import { API_URL } from 'config';
import moment from 'moment-timezone';

export const COVIDrecessionStartDate = '20200220';

export const fetchCOVIDdata = async () =>
  fetchTimeseries(
    'covid',
    COVIDrecessionStartDate,
    formatDate(new Date(), 'UTC')
  );

export const fetchSP500TRs = async () => {
  const numYrs = 3;
  const getEnd = start =>
    moment.tz(start, 'America/New_York').add(numYrs, 'y').format('YYYYMMDD');

  const historicalCrashes = [
    { name: 'Great Depression', start: '1929-09-17' },
    { name: '1970s Recession', start: '1973-01-12' },
    { name: 'Dotcom Bubble', start: '2000-03-24' },
    { name: 'Great Recession', start: '2007-10-10' },
    { name: 'COVID Recession', start: COVIDrecessionStartDate }
  ];

  const data = await Promise.all(
    historicalCrashes.map(c =>
      fetchTimeseries(
        'sp500tr',
        formatDate(c.start, 'America/New_York'),
        getEnd(c.start)
      )
    )
  );

  return historicalCrashes.map((c, i) => ({ ...c, data: data[i] }));
};

const fetchTimeseries = async (type, start, end) => {
  const response = await fetch(`${API_URL}/timeseries/${type}/${start}/${end}`);
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.data;
};

const formatDate = (date, tz) => moment.tz(date, tz).format('YYYYMMDD');
