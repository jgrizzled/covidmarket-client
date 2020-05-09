import LineChart from './line-chart';

const component = (
  <LineChart
    chartDatas={[
      {
        data: [{ x: 1, y: 1 }],
        style: { data: {} },
        name: 'test'
      }
    ]}
    height={100}
    width={100}
    scaleX='linear'
    scaleY='linear'
    legendX='top'
    legendY='right'
    legendTooltip={false}
  />
);

// smoke test
it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<Providers>{component}</Providers>, div);
  ReactDOM.unmountComponentAtNode(div);
});
