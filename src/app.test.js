import App from './app';

const component = <App themes={theme} />;

// smoke test
it('renders without crashing', async () => {
  const div = document.createElement('div');
  // wait for async calls to finish
  await act(async () => {
    ReactDOM.render(<Providers>{component}</Providers>, div);
  });
  ReactDOM.unmountComponentAtNode(div);
});
