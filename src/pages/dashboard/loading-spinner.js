import React from 'react';
import styled from 'styled-components';

export default function LoadingSpinner() {
  return (
    <Spinner>
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <div key={i}></div>
        ))}
    </Spinner>
  );
}

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    transform-origin: 40px 40px;
    animation: spinner 1.2s linear infinite;
  }

  div:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: ${({ theme }) => theme.color.primary};
  }

  ${() => {
    let css = '';
    for (let i = 1; i <= 12; i++) {
      css += `
      div:nth-child(${i}) {
        transform: rotate(${(i - 1) * 30}deg);
        animation-delay: ${-1.2 + 0.1 * i}s;
      }
      `;
    }
    return css;
  }}

  @keyframes spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
