// Main app component

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Dashboard from 'pages/dashboard';
import About from 'pages/about';
import Contact from 'pages/contact';
import Header from 'pages/header';
import SplashPage from 'pages/splash';
import ErrorBoundary from 'error-boundary';

export default function App() {
  return (
    <Container>
      <SplashPage />
      <Header />
      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/contact'>
          <Contact />
        </Route>
        <Route>
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        </Route>
      </Switch>
    </Container>
  );
}

// Main app container styles
const Container = styled.div`
  min-height: ${() => window.innerHeight}px;
  overflow: auto;
`;
