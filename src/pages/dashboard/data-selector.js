import React from 'react';
import styled from 'styled-components';

// give setData function from app
// options = [{name: string, value: string}]
export default function DataSelector({ options, activeOption, setOption }) {
  return (
    <Container>
      {options.map((o, i) => (
        <DataButton
          key={i}
          active={o.value === activeOption}
          onClick={() => setOption(o.value)}
        >
          {o.name}
        </DataButton>
      ))}
    </Container>
  );
}

const Container = styled.div``;

const DataButton = styled.button`
  ${({ active }) => active && 'font-weight: bold;'}
`;
