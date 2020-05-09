import ButtonSelector from './button-selector';

const component = (
  <ButtonSelector
    options={[{ name: 'test', value: 'test' }]}
    activeOptionValue='test'
    setOptionValue={() => {}}
  />
);

// smoke test
it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<Providers>{component}</Providers>, div);
  ReactDOM.unmountComponentAtNode(div);
});
