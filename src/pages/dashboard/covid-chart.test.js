import { Suspense } from 'react';
import COVIDchart from './covid-chart';

const component = (
  <Suspense fallback={<div />}>
    <COVIDchart
      startDate={new Date()}
      endDate={new Date()}
      COVIDdataOption='cases'
      COVIDdataType='total'
    />
  </Suspense>
);

// smoke test
it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<Providers>{component}</Providers>, div);
  ReactDOM.unmountComponentAtNode(div);
});
