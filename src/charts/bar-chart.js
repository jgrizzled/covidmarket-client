// Bar Chart

import React from 'react';
import * as V from 'victory';

import chartWrapper from './chart-wrapper';

// chartDatas: [{data: array of {x, y}, style: Victory style obj},...]
const BarChart = ({
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
      standalone={false}
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

export default chartWrapper(BarChart);
