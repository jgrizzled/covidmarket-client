// Main app component

import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Dashboard from './pages/dashboard/dashboard';

export default function App() {
  return (
    <Container>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Dashboard />
      </Suspense>
    </Container>
  );
}

// Main app container styles
const Container = styled.div`
  overflow: auto;
`;
