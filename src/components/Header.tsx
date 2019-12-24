import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Container } from './Container';

const Nav = styled.nav`
  position: relative;
  min-height: 50px;
  margin: 0;
  background: #1587cf;
  border: 0;
  border-radius: 0;
`;

const HeaderLink = styled(Link)`
  color: #ffce1a;
  font-size: 30px;
  line-height: 23px;
  text-decoration: none;
  padding: 13.5px 15px;
  height: 50px;
  float: left;
  font-family: 'akbarplain';
`;

const Header: React.FC = () => (
  <Nav>
    <Container>
      <div>
        <HeaderLink to="/">Rebigulator</HeaderLink>
      </div>
    </Container>
  </Nav>
);

export default Header;
