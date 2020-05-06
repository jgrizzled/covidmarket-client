import React, { useMemo, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import Chart from 'charts/line-chart';
import { useCOVIDdata } from 'data/hooks';

const geos = [
  { name: 'World ex-US', value: 'worldExUS' },
  { name: 'US', value: 'US' }
];

export default function COVIDchart({
  startDate,
  endDate,
  COVIDdataOption,
  COVIDdataType
}) {
  const theme = useContext(ThemeContext);
  const COVIDdata = useCOVIDdata().read();

  const startDateTime = startDate.getTime();
  const endDateTime = endDate.getTime();

  // convert data to chartData format
  const { COVIDchartDatas, min, max } = useMemo(() => {
    const COVIDchartDatas = geos.map((g, i) => ({
      data: COVIDdata.map(d => ({
        x: d.date.toDate(),
        y: d[g.value][COVIDdataOption]
      })),
      name: g.name,
      style: {
        data: {
          stroke: theme.color.chart[i],
          strokeWidth: 3
        }
      }
    }));

    if (COVIDdataType === 'NEW') {
      COVIDchartDatas.forEach(
        cd =>
          (cd.data = cd.data.map((d, i) => ({
            ...d,
            y: i > 0 ? d.y - cd.data[i - 1].y : 0
          })))
      );
    }

    // calc y domain
    const values = COVIDchartDatas.reduce(
      (acc, cd) => [
        ...acc,
        ...cd.data.filter(d => d.x >= startDate && d.x <= endDate).map(d => d.y)
      ],
      []
    );
    const min = Math.min(...values);
    const max = Math.max(...values);

    return { COVIDchartDatas, min, max };
    // eslint-disable-next-line
  }, [startDateTime, endDateTime, COVIDdataOption, COVIDdataType]);

  return (
    <Chart
      chartDatas={COVIDchartDatas}
      scaleX='time'
      scaleY='linear'
      tickFormatY={t => {
        if (max > 10 ** 6) return t / 10 ** 6 + 'M';
        if (max > 10 ** 3) return t / 10 ** 3 + 'k';
        return t;
      }}
      domainX={[startDate, endDate]}
      domainY={[min, max]}
      legendX='left'
      legendY='top'
      maxHeight={window.innerHeight / 2}
    />
  );
}
