import type { FC } from 'react';
import styled from 'styled-components';
import { Container } from './Container';
import Link from 'next/link';

const Nav = styled.header`
  width: 100%;
  background: var(--theme-primary);
`;

const HeaderLink = styled(Link)`
  color: var(--theme-secondary);
  font-size: 30px;
  line-height: 23px;
  text-decoration: none;
  padding: 13.5px 15px;
  height: 50px;
  float: left;
  font-family: 'akbarplain';
  box-sizing: border-box;
  text-align: center;
`;

const Header: FC = () => (
  <Nav>
    <Container>
      <nav style={{ display: 'flex', justifyContent: 'center' }}>
        <HeaderLink href="/">Rebigulator</HeaderLink>
      </nav>
    </Container>
  </Nav>
);

export default Header;
