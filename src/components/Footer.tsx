import React from 'react';
import styled from 'styled-components';
import { Container } from './Container';
import { MainOutboundLink } from './MainLink';

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
        <MainOutboundLink href="https://frinkiac.com/">Frinkiac</MainOutboundLink>{' '}
      </p>
      <p>
        Made by{' '}
        <MainOutboundLink href="https://matthewmiller.dev/">Me4502</MainOutboundLink>
      </p>
    </ContainerFlex>
  </FooterWrapper>
);

export default Footer;
