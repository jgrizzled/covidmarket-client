import React, { useState, Suspense } from 'react';
import styled from 'styled-components';

import ButtonSelector from './button-selector';
import MarketsChart from './markets-chart';
import COVIDchart from './covid-chart';
import {
  zoomOptions,
  COVIDdataOptions,
  marketDataOptions,
  COVIDrecessionStartDate,
  numYrs
} from 'config';

export default function Dashboard() {
  const [zoom, setZoom] = useState(zoomOptions[0].value);
  const [marketDataOption, setMarketDataOption] = useState(
    marketDataOptions[0].value
  );
  const [COVIDdataOption, setCOVIDdataOption] = useState(
    COVIDdataOptions[0].value
  );
  const [COVIDdataType, setCOVIDdataType] = useState('TOTAL');

  // calc zoom windows
  let endDate = new Date();
  let startDate = new Date(COVIDrecessionStartDate);
  const currentDay = msToDays(endDate - startDate);
  let startDay = 0,
    endDay = numYrs * 365;
  switch (zoom) {
    case 'start':
      endDay = msToDays(endDate - startDate);
      break;
    case 'all':
      break;
    default:
      if (zoom < currentDay) {
        startDate = new Date(endDate - daysToMs(zoom));
        endDay = currentDay;
        startDay = endDay - zoom;
      } else {
        endDay = zoom;
      }
  }

  return (
    <Container>
      <Header>
        <ButtonSelector
          options={zoomOptions}
          activeOptionValue={zoom}
          setOptionValue={setZoom}
        />
      </Header>
      <ChartGroup1>
        <Suspense fallback={<Loading />}>
          <MarketsChart
            startDay={startDay}
            endDay={endDay}
            marketDataOption={marketDataOption}
          />
        </Suspense>
        <ButtonSelector
          options={marketDataOptions}
          activeOptionValue={marketDataOption}
          setOptionValue={setMarketDataOption}
        />
      </ChartGroup1>
      <ChartGroup2>
        <Suspense fallback={<Loading />}>
          <COVIDchart
            startDate={startDate}
            endDate={endDate}
            COVIDdataOption={COVIDdataOption}
            COVIDdataType={COVIDdataType}
          />
        </Suspense>
        <div>
          <ToggleButton
            onClick={() =>
              setCOVIDdataType(COVIDdataType === 'TOTAL' ? 'NEW' : 'TOTAL')
            }
          >
            {COVIDdataType}
          </ToggleButton>
          <ButtonSelector
            options={COVIDdataOptions}
            activeOptionValue={COVIDdataOption}
            setOptionValue={setCOVIDdataOption}
          />
        </div>
      </ChartGroup2>
    </Container>
  );
}

const Loading = () => <b style={{ height: '100%' }}>Loading...</b>;

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.onSurface};
  min-height: ${() => Math.max(500, window.innerHeight - 32)}px;
  display: grid;
  grid-template-rows: auto 1fr 1fr;
  grid-template-areas:
    'header'
    'chart1'
    'chart2';
`;

const Header = styled.header`
  grid-area: header;
`;

const ChartGroup1 = styled.div`
  grid-area: chart1;
  display: grid;
  grid-template-rows: 1fr auto;
`;

const ChartGroup2 = styled.div`
  grid-area: chart2;
  display: grid;
  grid-template-rows: 1fr auto;
  div:last-child {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
`;

const ToggleButton = styled.button`
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.onBackgroundLight};
  font-weight: bold;
  padding: 10px;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.color.onBackground};
`;

const msPerDay = 1000 * 60 * 60 * 24;
const msToDays = ms => parseInt(ms / msPerDay);
const daysToMs = days => days * msPerDay;
