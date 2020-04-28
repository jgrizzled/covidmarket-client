import React from 'react';
import styled from 'styled-components';

export default function DataButton({ option, setOption, active }) {
  return (
    <Button active={active} onClick={() => setOption(option)}>
      {option.name}
    </Button>
  );
}

const Button = styled.button`
  ${({ active }) => active && 'font-weight: bold;'}
`;
