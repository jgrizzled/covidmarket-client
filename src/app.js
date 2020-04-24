// Main app component

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import randomColor from 'randomcolor';
import fetchData from './fetchData';
import Chart from './chart';

const colors = Array(10)
  .fill(0)
  .map(_ => randomColor());

export default function App() {
  const [data, setData] = useState(null);
  // fetch data
  useEffect(() => {
    const fd = async () => {
      try {
        const data = await fetchData();
        setData(data);
      } catch (e) {
        console.error(e);
      }
    };
    fd();
    // eslint-disable-next-line
  }, []);

  const [zoomDomain, setZoomDomain] = useState([0, 10000]);

  if (!data) return 'Loading...';

  var filteredData = {};
  const [startDay, endDay] = zoomDomain;
  filteredData.SP500 = data.SP500.map(cd => ({
    ...cd,
    data: cd.data.filter(d => d.day >= startDay && d.day <= endDay)
  }));

  const current = filteredData.SP500.find(cd =>
    cd.name.includes('COVID Recession')
  );

  var startDate = current.data[0].date.toDate();
  var endDate = current.data[current.data.length - 1].date.toDate();

  filteredData.COVID = data.COVID.filter(
    d => d.date.toDate() >= startDate && d.date.toDate() <= endDate
  );

  const SP500ChartDatas = filteredData.SP500.map((h, i) => ({
    data: h.data.map(d => ({ x: d.day, y: d.totalReturn })),
    name: `${h.name} (${h.data[0].date.format('MMM DD YYYY')})`,
    style: {
      data: {
        stroke: colors[i]
      }
    }
  }));

  const COVIDchartDatas = [];

  COVIDchartDatas.push({
    data: filteredData.COVID.map(d => ({ x: d.date, y: d.US.cases })),
    name: 'US',
    style: {
      data: {
        stroke: colors[0]
      }
    }
  });

  COVIDchartDatas.push({
    data: filteredData.COVID.map(d => ({ x: d.date, y: d.world.cases })),
    name: 'World',
    style: {
      data: {
        stroke: colors[1]
      }
    }
  });

  return (
    <Container>
      <HeaderContainer>
        <button onClick={() => setZoomDomain([0, 30])}>1M</button>
        <button onClick={() => setZoomDomain([0, 90])}>3M</button>
        <button onClick={() => setZoomDomain([0, 365])}>1Y</button>
        <button onClick={() => setZoomDomain([0, 10000])}>All</button>
      </HeaderContainer>
      <Chart1Container>
        <Chart
          chartDatas={SP500ChartDatas}
          labelX='Days from high'
          tickFormatY={t => t + '%'}
          scaleX='linear'
        />
      </Chart1Container>
      <Chart2Container>
        <Chart
          chartDatas={COVIDchartDatas}
          labelX='Total Cases'
          scaleX='time'
          scaleY='linear'
          tickFormatY={t => t / 1000000 + 'M'}
          domainX={[startDate, endDate]}
        />
      </Chart2Container>
    </Container>
  );
}

// Main app container styles
const Container = styled.div`
  height: ${() => window.innerHeight}px;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr 10fr 10fr;
  grid-template-areas:
    'header'
    'chart1'
    'chart2';
`;

const HeaderContainer = styled.div``;

const Chart1Container = styled.div`
  height: 100%;
  grid-area: chart1;
`;

const Chart2Container = styled.div`
  height: 100%;
  grid-area: chart2;
`;
