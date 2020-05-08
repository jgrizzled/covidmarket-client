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
              <HeaderLink l={l} active={true} />
            )}
          </span>
        ))}
      </nav>
    </Container>
  );
}

const HeaderLink = ({ l, active }) => {
  const theme = useContext(ThemeContext);
  const isNotMobile = useMedia(`(min-width: ${theme.breakpoint.desktop})`);
  return (
    <>
      <Icon active={active} aria-label={l.route.replace('/', '')}>
        {l.icon}
      </Icon>
      {isNotMobile && l.name}
    </>
  );
};

const Icon = styled.span.attrs({ role: 'img' })`
  border-radius: 5px;
  padding: 4px 4px 4px 8px;
  @media (max-width: ${({ theme }) => theme.breakpoint.desktop}) {
    background-color: ${({ theme, active }) =>
      active ? theme.color.primary : theme.color.primaryDark};
  }
`;

const links = [
  { route: '/', icon: '📈', name: 'Dashboard' },
  { route: '/about', icon: '❓', name: 'About' },
  { route: '/contact', icon: '📩', name: 'Contact' }
];

const Container = styled.header`
  height: 32px;
  background-color: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.onSurface};
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  h1 {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color.primary};
    font-size: 1.2rem;
    margin: 0 10px;
    text-align: center;
    height: 100%;
  }
  a,
  a:visited {
    color: ${({ theme }) => theme.color.onBackground};
  }
  nav {
    display: flex;
    > span {
      color: ${({ theme }) => theme.color.onBackgroundLight};
      padding: 6px;
      @media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
        padding: 0 4px 0 20px;
        margin: 4px 10px;
      }
    }
  }
`;
