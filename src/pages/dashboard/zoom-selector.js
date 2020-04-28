import React from 'react';
import styled from 'styled-components';

export default function ZoomSelector({ zooms, zoom, setZoom }) {
  return (
    <Container>
      {zooms.map((z, i) => (
        <Button
          active={z.value === zoom}
          onClick={() => setZoom(z.value)}
          key={i}
        >
          {z.name}
        </Button>
      ))}
    </Container>
  );
}

const Container = styled.div``;

const Button = styled.button`
  ${({ active }) => active && 'font-weight: bold;'}
`;
