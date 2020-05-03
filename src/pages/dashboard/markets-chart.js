import React, { useMemo } from 'react';
import randomColor from 'randomcolor';

import Chart from 'charts/line-chart';
import { useMarketData } from 'data/hooks';

export default function MarketsChart({ startDay, endDay, marketDataOption }) {
  const marketData = useMarketData(marketDataOption).read();

  const { min, max, marketChartDatas } = useMemo(() => {
    // convert market data to chartData format
    const marketChartDatas = marketData.map((h, i) => {
      if (h.data.length < 1) return {};
      return {
        data: h.data.map(d => ({ x: d.day, y: d.totalReturn })),
        name: `${h.name} (${h.data[0].date.format('MMM DD YYYY')})`,
        style: {
          data: {
            stroke: colors[i],
            strokeDasharray: h.name.includes('COVID') ? undefined : '1,1',
            strokeWidth: h.name.includes('COVID') ? 3 : 2
          }
        }
      };
    });

    // calc y domain
    const values = marketChartDatas.reduce(
      (acc, cd) => [
        ...acc,
        ...cd.data
          .filter(day => day.x >= startDay && day.x <= endDay)
          .map(d => d.y)
      ],
      []
    );
    const min = Math.min(...values);
    const max = Math.max(...values);

    return { min, max, marketChartDatas };
    // eslint-disable-next-line
  }, [startDay, endDay, marketDataOption]);

  return (
    <Chart
      chartDatas={marketChartDatas}
      labelX='Day'
      tickFormatY={t => t + '%'}
      scaleX='linear'
      legendX='right'
      legendY='top'
      legendTooltip={true}
      maxHeight={window.innerHeight / 2}
      domainX={[startDay, endDay]}
      domainY={[min, max]}
    />
  );
}

const colors = Array(10)
  .fill(0)
  .map(_ => randomColor());
