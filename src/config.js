const COVIDrecessionStartDate = '2020-02-20';
const numYrs = 3; // time span to get for historical crashes data

module.exports = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  COVIDrecessionStartDate,
  historicalCrashes: [
    // start on stock market previous high
    { name: 'Great Depression', start: '1929-09-17' },
    { name: '1970s Recession', start: '1973-01-12' },
    { name: 'Dotcom Bubble', start: '2000-03-24' },
    { name: 'Great Recession', start: '2007-10-10' },
    { name: 'COVID Recession', start: COVIDrecessionStartDate }
  ],
  numYrs,
  zoomOptions: [
    { name: 'Start', value: 'start' },
    { name: '1M', value: 30 },
    { name: '3M', value: 90 },
    { name: '1Y', value: 365 },
    { name: numYrs + 'Y', value: 'all' }
  ],
  COVIDdataOptions: [
    { name: 'Cases', value: 'cases' },
    { name: 'Deaths', value: 'deaths' },
    { name: 'Active', value: 'active' }
  ],
  marketDataOptions: [
    { name: 'Stocks', value: 'sp500' },
    { name: 'Bonds', value: 'bonds' },
    { name: 'Gold', value: 'gold' },
    { name: 'Dollar', value: 'usdx' }
  ]
};
