const colors = [
  '#252525',
  '#525252',
  '#737373',
  '#969696',
  '#bdbdbd',
  '#d9d9d9',
  '#f0f0f0'
];
const charcoal = '#252525';
const grey = '#969696';

// Typography
const sansSerif =
  "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const letterSpacing = 'normal';
const fontSize = 14;

// Layout
const baseProps = {
  colorScale: colors
};

// Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: charcoal,
  stroke: 'transparent'
};
const centeredLabelStyles = assign({ textAnchor: 'middle' }, baseLabelStyles);

// Strokes
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

// Put it all together...
const theme = {
  axis: assign(
    {
      style: {
        axis: {
          fill: 'transparent',
          stroke: charcoal,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin
        },
        axisLabel: assign({}, centeredLabelStyles, {
          padding: 25
        }),
        grid: {
          fill: 'none',
          stroke: 'none',
          pointerEvents: 'painted'
        },
        ticks: {
          fill: 'transparent',
          size: 1,
          stroke: 'transparent'
        },
        tickLabels: baseLabelStyles
      }
    },
    baseProps
  ),
  bar: assign(
    {
      style: {
        data: {
          fill: charcoal,
          padding: 8,
          strokeWidth: 0
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),

  chart: baseProps,
  group: assign(
    {
      colorScale: colors
    },
    baseProps
  ),
  line: assign(
    {
      style: {
        data: {
          fill: 'transparent',
          stroke: charcoal,
          strokeWidth: 2
        },
        labels: centeredLabelStyles
      }
    },
    baseProps
  )
};

export default theme;
