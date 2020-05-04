import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useMedia } from 'react-use';

export default function Header() {
  const { pathname } = useLocation();
  return (
    <Container>
      <Link to='/'>
        <h1>COVID Markets</h1>
      </Link>
      <nav>
        {links.map((l, i) => (
          <span key={i}>
            {pathname !== l.route ? (
              <Link to={l.route}>
                <HeaderLink l={l} />
              </Link>
            ) : (
              <HeaderLink l={l} />
            )}
          </span>
        ))}
      </nav>
    </Container>
  );
}

const HeaderLink = ({ l }) => {
  const theme = useContext(ThemeContext);
  const isNotMobile = useMedia(`(min-width: ${theme.breakpoint.desktop})`);
  return (
    <>
      <span role='img' aria-label={l.route.replace('/', '')}>
        {l.icon}
      </span>
      {isNotMobile && l.name}
    </>
  );
};

const links = [
  { route: '/', icon: '📈', name: 'Dashboard' },
  { route: '/about', icon: '🤔', name: 'About' },
  { route: '/contact', icon: '📩', name: 'Contact' }
];

const Container = styled.header`
  background-color: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.onSurface};

  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 1.2rem;
    margin: 0;
  }
  a,
  a:visited {
    color: ${({ theme }) => theme.color.primary};
    font-size: 1.1rem;
  }
  nav {
    display: flex;
    > span {
      background-color: ${({ theme }) => theme.color.primaryDark};
      border-radius: 10px;
      padding: 4px;
      margin: 0 10px;
    }
  }
`;
