// stateful splash page

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function SplashPage({ sv }) {
  // show splash page on first visit
  const [visited, setVisited] = useState(
    localStorage.getItem('COVID-markets-visited') === 'true'
  );
  useEffect(() => {
    // localStorage.setItem('COVID-markets-visited', 'true');
  }, []);
  if (visited) return null;

  return (
    <Container>
      <h1>COVID Markets</h1>
      <h2>Track the COVID19 pandemic's impact on US markets.</h2>
      <button onClick={() => setVisited(true)}>VIEW DATA</button>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999;
  background: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  /*
    Fluid typography formula
    min(calc(minFnt px + (maxFnt - minFnt) * (100vw - minScr px) / (maxScr - minScr), maxFnt px);
  */
  font-size: min(calc(8px + (16 - 8) * (100vw - 320px) / (800 - 320)), 16px);
  padding: 1em 0.2em 10em 0.2em;
  h1 {
    border: 5px solid ${({ theme }) => theme.color.onPrimary};
    border-radius: 10px;
    font-size: 4em;
    padding: 0.5em 1em;
    margin: 0.5em;
  }
  h2 {
    font-size: 1.8em;
  }
  button {
    font-size: 1.7em;
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.onBackground};
    border: 2px solid ${({ theme }) => theme.color.onBackground};
    border-radius: 10px;
    padding: 1em 3em;
    letter-spacing: 0.1em;
    font-weight: bold;
    &:hover {
      background-color: inherit;
      border: 2px solid ${({ theme }) => theme.color.onBackgroundLight};
      color: ${({ theme }) => theme.color.onBackgroundLight};
    }
  }
`;
