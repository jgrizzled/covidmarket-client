# COVID Markets Client

Front end client for COVID Markets - a dashboard for tracking US markets in the 2020 COVID19 pandemic.

COVID Markets displays historical performance of major US asset classes during past and current recessions alongside COVID19 case data, providing a single-page view for insight into the market's reaction to the pandemic. Data is updated daily.

[Live Demo](https://covidmarkets.now.sh)

Technologies: React.js, Styled Components, Victory Charts, HTML5, CSS3

[Server Repository](https://github.com/jgrizzled/covidmarkets-server)

## Install

`yarn install` or `npm install`

Specify development API URL (defaults to http://localhost:8000):

1. `cp sample.env .env.development`
2. Input development URL

Specify production API URL for local builds:

1. `cp sample.env .env.production`
2. Input production URL

Specify production API URL for Zeit.co:

1. `cp sample.now.json now.json`
2. Input production URL

## Scripts

Develop: `yarn start` or `npm run start`

Build: `yarn build` or `npm run build`

Deploy to Zeit: `yarn deploy` or `npm run deploy`

Test: `yarn test` or `npm run test`
