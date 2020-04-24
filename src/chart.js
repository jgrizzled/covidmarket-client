// Chart

import React, { useState } from 'react';
import styled from 'styled-components';
import * as V from 'victory';
import useDimensions from 'react-use-dimensions';

/*  props:
    chartDatas: array of chartDatas
    labelY: string, 
    labelX: string
      chartData: {data: array of {x, y}, style: Victory style obj}
*/

const Chart = ({
  chartDatas,
  height,
  width,
  labelX,
  labelY,
  tickFormatX,
  tickFormatY,
  scaleX,
  scaleY,
  domainX,
  domainY
}) => {
  return (
    <V.VictoryChart
      height={height}
      width={width}
      scale={{ x: scaleX, y: scaleY }}
      padding={{ top: 0, left: 0, bottom: 50, right: 50 }}
      domain={{ x: domainX, y: domainY }}
    >
      {chartDatas.map((cd, i) => (
        <V.VictoryLine data={cd.data} x='x' y='y' key={i} style={cd.style} />
      ))}
      <V.VictoryAxis
        tickFormat={tickFormatX}
        label={labelX}
        orientation={'bottom'}
        offsetY={50}
      />
      <V.VictoryAxis
        dependentAxis
        orientation={'right'}
        tickFormat={tickFormatY}
        offsetX={50}
        labelY={labelY}
      />
    </V.VictoryChart>
  );
};

// chart fills parent container
const chartWrapper = ChartComponent => {
  return props => {
    const [containerRef, { width, height }] = useDimensions();
    return (
      <Container ref={containerRef}>
        {width && height && (
          <>
            <ChartComponent
              {...props}
              width={Number(width)}
              height={Number(height)}
            />
            <Legend chartDatas={props.chartDatas} />
          </>
        )}
      </Container>
    );
  };
};

const Container = styled.div`
  height: 100%;
  position: relative;
`;

const LegendContainer = styled.ul`
  position: absolute;
  width: 75%;
  z-index: 2;
  top: 0;
  right: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin: 0;
  list-style: none;
  padding: 0;
`;

const Item = styled.span`
  margin: 2px 4px;
  display: inline-block;
  color: ${({ color }) => color};
`;

const Legend = ({ chartDatas }) => {
  return (
    <LegendContainer>
      {chartDatas.map((cd, i) => (
        <Item color={cd.style.data.stroke} key={i}>
          {cd.name}
        </Item>
      ))}
    </LegendContainer>
  );
};

export default chartWrapper(Chart);
