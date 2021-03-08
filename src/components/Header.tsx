import React from 'react';
import styled from 'styled-components';
import { Container } from './Container';
import Link from 'next/link';

const Nav = styled.nav`
  width: 100%;
  min-height: 50px;
  margin: 0;
  background: var(--theme-primary);
  border: 0;
  border-radius: 0;
`;

const HeaderLink = styled.a`
  color: var(--theme-secondary);
  font-size: 30px;
  line-height: 23px;
  text-decoration: none;
  padding: 13.5px 15px;
  height: 50px;
  float: left;
  font-family: 'akbarplain';
  box-sizing: border-box;
`;

const Header: React.FC = () => (
  <Nav>
    <Container>
      <div>
        <Link href="/" passHref>
          <HeaderLink>Rebigulator</HeaderLink>
        </Link>
      </div>
    </Container>
  </Nav>
);

export default Header;
