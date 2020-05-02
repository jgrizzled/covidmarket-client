// radio button selector of options

import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

// options = [{name: string, value: string}]
export default function ButtonSelector({
  options,
  activeOptionValue,
  setOptionValue
}) {
  const [id] = useState(() => uuid());
  return (
    <Container length={options.length}>
      {options.map((o, i) => (
        <span>
          <input
            id={id + i}
            type='radio'
            name={id + 'option'}
            key={i}
            checked={o.value === activeOptionValue}
            onClick={() => setOptionValue(o.value)}
          />
          <label for={id + i}>{o.name}</label>
        </span>
      ))}
    </Container>
  );
}

const Container = styled.span`
  display: grid;
  grid-template-columns: repeat(${({ length }) => length}, 1fr);
  input {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  label {
    cursor: pointer;
    width: 100%;
    text-align: center;
    display: inline-block;
    padding: 10px;
    margin: 0;
    border: 1px solid black;
    user-select: none;
  }
  label:not(:first-child) {
    border-left: 0;
  }
  input:checked + label {
    font-weight: bold;
  }
`;
