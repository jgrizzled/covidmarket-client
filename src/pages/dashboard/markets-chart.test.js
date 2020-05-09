import { Suspense } from 'react';
import MarketsChart from './markets-chart';

const component = (
  <Suspense fallback={<div />}>
    <MarketsChart startDay={1} endDay={2} marketDataOption='sp500' />
  </Suspense>
);

// smoke test
it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<Providers>{component}</Providers>, div);
  ReactDOM.unmountComponentAtNode(div);
});
