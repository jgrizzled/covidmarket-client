// Line Chart

import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

import chartWrapper from './chart-wrapper';

// chartDatas: [{data: array of {x, y}, style: Victory style obj},...]
const LineChart = ({
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
    <VictoryChart
      height={height}
      width={width}
      scale={{ x: scaleX, y: scaleY }}
      padding={{ top: 0, left: 0, bottom: 50, right: 50 }}
      domain={{ x: domainX, y: domainY }}
      standalone={false}
      theme={{
        axis: {
          style: {
            grid: {
              stroke: '#cccccc',
              strokeDasharray: '10,5',
              fillOpacity: 0.1
            },
            axis: {
              fill: 'none'
            }
          }
        }
      }}
    >
      {chartDatas.map((cd, i) => (
        <VictoryLine data={cd.data} x='x' y='y' key={i} style={cd.style} />
      ))}
      <VictoryAxis
        tickFormat={tickFormatX}
        label={labelX}
        orientation={'bottom'}
        offsetY={50}
      />
      <VictoryAxis
        dependentAxis
        orientation={'right'}
        tickFormat={tickFormatY}
        offsetX={50}
        labelY={labelY}
      />
    </VictoryChart>
  );
};

export default chartWrapper(LineChart);
