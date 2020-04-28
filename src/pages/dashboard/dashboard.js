import React, { useState } from 'react';
import styled from 'styled-components';
import randomColor from 'randomcolor';

import ZoomSelector from './zoom-selector';
import Chart from 'charts/line-chart';
import DataSelector from './data-selector';
import { useMarketData, useCOVIDdata } from 'data/hooks';

const colors = Array(10)
  .fill(0)
  .map(_ => randomColor());

const marketDataOptions = [
  { name: 'Stocks', value: 'sp500tr' },
  { name: 'Bonds', value: 'AG' },
  { name: 'Gold', value: 'GLD' },
  { name: 'Dollar', value: 'DXY' }
];

const COVIDdataOptions = [
  { name: 'Cases', value: 'cases' },
  { name: 'Deaths', value: 'deaths' },
  { name: 'Active', value: 'active' }
];

const zooms = [
  { name: '1M', value: 30 },
  { name: '3M', value: 90 },
  { name: '1Y', value: 365 },
  { name: 'Start', value: 'start' },
  { name: 'All', value: 'all' }
];

export default function Dashboard() {
  const [zoom, setZoom] = useState('start');
  const [marketDataOption, setMarketDataOption] = useState(
    marketDataOptions[0].value
  );
  const [COVIDdataOption, setCOVIDdataOption] = useState(
    COVIDdataOptions[0].value
  );

  // fetch data
  const marketData = useMarketData(marketDataOption).read();
  const COVIDdata = useCOVIDdata().read();

  // get current market data series to align COVID data
  let current = marketData.find(cd => cd.name.includes('COVID Recession'));

  // select slice of data by zoom domain (day range)
  let startDay, endDay;
  switch (zoom) {
    case 'start':
      startDay = current.data[0].day;
      endDay = current.data[current.data.length - 1].day;
      break;
    case 'all':
      startDay = 0;
      endDay = 10 ** 4;
      break;
    default:
      endDay = current.data[current.data.length - 1].day;
      startDay = endDay - zoom;
  }

  // filter market data by day #
  const filteredMarketData = marketData.map(cd => ({
    ...cd,
    data: cd.data.filter(d => d.day >= startDay && d.day <= endDay)
  }));

  current = filteredMarketData.find(cd => cd.name.includes('COVID Recession'));

  // get start/end dates of current market data series
  var startDate = current.data[0].date.toDate();
  var endDate = current.data[current.data.length - 1].date.toDate();

  // filter COVID data by date
  const filteredCOVIDdata = COVIDdata.filter(
    d => d.date.toDate() >= startDate && d.date.toDate() <= endDate
  );

  // convert market data to chartData format
  const marketChartDatas = filteredMarketData.map((h, i) => ({
    data: h.data.map(d => ({ x: d.day, y: d.totalReturn })),
    name: `${h.name} (${h.data[0].date.format('MMM DD YYYY')})`,
    style: {
      data: {
        stroke: colors[i]
      }
    }
  }));

  // convert COVID data to chartData format
  const COVIDchartDatas = [];
  COVIDchartDatas.push({
    data: filteredCOVIDdata.map(d => ({
      x: d.date,
      y: d.US[COVIDdataOption]
    })),
    name: 'US',
    style: {
      data: {
        stroke: colors[0]
      }
    }
  });
  COVIDchartDatas.push({
    data: filteredCOVIDdata.map(d => ({
      x: d.date,
      y: d.world[COVIDdataOption]
    })),
    name: 'World',
    style: {
      data: {
        stroke: colors[1]
      }
    }
  });

  return (
    <Container>
      <Header>
        <ZoomSelector zooms={zooms} zoom={zoom} setZoom={setZoom} />
      </Header>
      <ChartGroup1>
        <Chart
          chartDatas={marketChartDatas}
          labelX='Day'
          tickFormatY={t => t + '%'}
          scaleX='linear'
          legendX='right'
          legendY='top'
          legendTooltip={true}
          maxHeight={window.innerHeight / 2}
        />
        <DataSelector
          options={marketDataOptions}
          activeOption={marketDataOption}
          setOption={setMarketDataOption}
        />
      </ChartGroup1>
      <ChartGroup2>
        <Chart
          chartDatas={COVIDchartDatas}
          scaleX='time'
          scaleY='linear'
          tickFormatY={t => t / 1000000 + 'M'}
          domainX={[startDate, endDate]}
          legendX='left'
          legendY='top'
          maxHeight={window.innerHeight / 2}
        />
        <DataSelector
          options={COVIDdataOptions}
          activeOption={COVIDdataOption}
          setOption={setCOVIDdataOption}
        />
      </ChartGroup2>
    </Container>
  );
}

const Container = styled.div`
  min-height: ${() => Math.max(500, window.innerHeight - 15)}px;
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
`;
