import Legend from './legend';

const component = (
  <Legend
    chartDatas={[
      {
        data: [],
        style: { data: {} },
        name: 'test'
      }
    ]}
    legendX='top'
    legendY='right'
    tooltip={false}
  />
);

// smoke test
it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<Providers>{component}</Providers>, div);
  ReactDOM.unmountComponentAtNode(div);
});
