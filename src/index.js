import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyle from 'styles/global-style';
import App from 'app';
// static base styles
import 'normalize.css';

const root = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  root
);
