// global app styles

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.color.background};
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
    color: ${props => props.theme.color.onBackground};
  }

  body > div {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  a {
    color: ${props => props.theme.color.link};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;
