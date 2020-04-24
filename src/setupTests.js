import '@testing-library/jest-dom/extend-expect';
import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;
import { act } from 'react-dom/test-utils';
global.act = act;
import renderer from 'react-test-renderer';
global.renderer = renderer;
import Enzyme from 'enzyme';
global.Enzyme = Enzyme;
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

import theme from 'styles/theme';

global.Providers = props => (
  <ThemeProvider theme={theme}>
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      {props.children}
    </MemoryRouter>
  </ThemeProvider>
);

// fixes media query error
global.window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
}));
