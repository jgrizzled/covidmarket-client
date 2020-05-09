// Line Chart

import React, { useContext } from 'react';
import propTypes from 'prop-types';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  LineSegment,
  VictoryVoronoiContainer
} from 'victory';
import { ThemeContext } from 'styled-components';

import chartWrapper from './chart-wrapper';

// chartDatas: [{data: array of {x, y}, style: Victory style obj, name: string},...]
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
  const theme = useContext(ThemeContext);
  return (
    <VictoryChart
      height={height}
      width={width}
      scale={{ x: scaleX, y: scaleY }}
      padding={{ top: 10, left: 0, bottom: 20, right: 30 }}
      domain={{ x: domainX, y: domainY }}
      standalone={true}
      containerComponent={
        <VictoryVoronoiContainer
          responsive={false}
          width={width}
          height={height}
        />
      }
      theme={{
        axis: {
          style: {
            grid: {
              stroke: theme.color.onSurface,
              strokeDasharray: '10,5',
              strokeOpacity: 0.5
            },
            axis: {
              stroke: 'transparent'
            },
            axisLabel: {
              fill: theme.color.onSurfaceLight
            },
            tickLabels: {
              fill: theme.color.onSurfaceLight
            }
          }
        },
        line: {
          style: {
            labels: {
              fill: theme.color.onSurfaceLight
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
        style={{
          axisLabel: {
            padding: 30
          },
          tickLabels: {
            padding: 30
          }
        }}
      />
      <VictoryAxis
        dependentAxis
        orientation={'right'}
        tickFormat={tickFormatY}
        offsetX={50}
        labelY={labelY}
        style={{
          tickLabels: {
            padding: 20
          }
        }}
        gridComponent={<LineSegment type='grid' x1={0} x2={width - 40} />}
      />
    </VictoryChart>
  );
};

LineChart.propTypes = {
  chartDatas: propTypes.arrayOf(
    propTypes.shape({
      data: propTypes.array.isRequired,
      style: propTypes.object.isRequired,
      name: propTypes.string.isRequired
    })
  ).isRequired,
  height: propTypes.number.isRequired,
  width: propTypes.number.isRequired,
  labelX: propTypes.string,
  labelY: propTypes.string,
  tickFormatX: propTypes.func,
  tickFormatY: propTypes.func,
  scaleX: propTypes.string,
  scaleY: propTypes.string,
  domainX: propTypes.any,
  domainY: propTypes.any
};

export default chartWrapper(LineChart);
