import React from 'react';
import styled from 'styled-components';
import { Container } from './Container';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

const FooterWrapper = styled.footer`
  justify-content: center;
  border-top: 1px solid #FCFCFC;
  padding: 10px 25px 40px;
  margin: 150px 0 0;
`;

const ContainerFlex = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Footer: React.FC = () => (
  <FooterWrapper>
    <ContainerFlex>
      <p>
        Powered by{' '}
        <OutboundLink href="https://frinkiac.com/">Frinkiac</OutboundLink>{' '}
      </p>
      <p>
        Made by{' '}
        <OutboundLink href="https://matthewmiller.dev/">Me4502</OutboundLink>
      </p>
    </ContainerFlex>
  </FooterWrapper>
);

export default Footer;
