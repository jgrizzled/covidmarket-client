// stateful splash page

import React, { useEffect } from 'react';
import styled from 'styled-components';
import useLocalStorageState from 'use-local-storage-state';

export default function SplashPage() {
  // show splash page on first visit
  const [visited, setVisited] = useLocalStorageState('visited', false);

  useEffect(() => {
    setVisited(true);
    // eslint-disable-next-line
  }, []);

  if (visited) return null;

  return (
    <Container>
      <div>
        <h1>COVID Markets</h1>
      </div>
      <div>
        <h2>Track US financial markets in the COVID19 economic recession</h2>
        <h2>Compare past recessions</h2>
        <h2>Stay abreast of the unfolding pandemic</h2>
        <button onClick={() => setVisited(true)}>VIEW DATA</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: ${() => window.innerHeight}px;
  width: ${() => window.innerWidth}px;
  z-index: 999;
  background: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.primary};
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 3fr;
  /*
    Fluid typography formula
    min(calc(minFnt px + (maxFnt - minFnt) * (100vw - minScr px) / (maxScr - minScr), maxFnt px);
  */
  font-size: min(calc(8px + (16 - 8) * (100vw - 320px) / (800 - 320)), 16px);
  div:first-child {
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.color.surface};
    h1 {
      font-size: 4em;
      padding: 0.5em 1em;
      margin: 0.5em auto;
    }
  }
  div:not(:first-child) {
    padding: 1em 0.2em 10em 0.2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
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
      margin: 0.5em;
      letter-spacing: 0.1em;
      font-weight: bold;
      &:hover {
        background-color: inherit;
        border: 2px solid ${({ theme }) => theme.color.onBackgroundLight};
        color: ${({ theme }) => theme.color.onBackgroundLight};
      }
    }
  }
`;
