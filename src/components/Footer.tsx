import React from 'react';
import styled from 'styled-components';
import { Container } from './Container';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

const FooterWrapper = styled.footer`
  justify-content: center;
  border-top: 1px solid #e7e7e7;
  padding: 10px 25px 40px;
  margin: 200px 0 0;
`;

const ContainerFlex = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  @media (min-width: 768px) {
    flex-direction: row-reverse;
  }
`;

const Footer: React.FC = () => (
  <FooterWrapper>
    <ContainerFlex>
      <p>
        Made by{' '}
        <OutboundLink href="https://matthewmiller.dev/">Me4502</OutboundLink>
      </p>
    </ContainerFlex>
  </FooterWrapper>
);

export default Footer;
