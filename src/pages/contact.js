// contact section

import React from 'react';
import styled from 'styled-components';

export default function Contact() {
  return (
    <Container>
      <h1>Contact</h1>
      <main>
        Made by Justin Greene
        <ul>
          <li>
            <a
              href='https://jgrizzled.github.io/portfolio'
              target='_blank'
              rel='noopener noreferrer'
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href='https://github.com/jgrizzled'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </a>
          </li>
          <li>
            <a
              href='mailto:justin.greene5@gmail.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Email
            </a>
          </li>
        </ul>
      </main>
    </Container>
  );
}

const Container = styled.div`
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.5rem;
    font-size: 1.5rem;
    ul {
      padding: 0;
      li {
        margin-bottom: 0.5rem;
      }
    }
  }
`;
