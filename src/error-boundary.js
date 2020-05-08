import React from 'react';
import styled from 'styled-components';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <ErrorMessage>Something went wrong!</ErrorMessage>;
    }
    return this.props.children;
  }
}

const ErrorMessage = styled.h1`
  color: red;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
