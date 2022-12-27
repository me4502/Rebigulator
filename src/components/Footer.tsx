import type { FC } from 'react';
import styled from 'styled-components';

import { Container } from './Container';
import { MainLink, MainNextLink } from './MainLink';

const FooterWrapper = styled.footer`
  border-top: 1px solid var(--theme-tertiary);
  padding: 10px 10px;
`;

const ContainerFlex = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
`;

const Footer: FC = () => (
  <FooterWrapper>
    <ContainerFlex>
      <p>
        <MainNextLink href="/about/">About</MainNextLink>
      </p>
      <p>
        Made with ❤️ by{' '}
        <MainLink href="https://madelinemiller.dev/">Maddy</MainLink>
      </p>
    </ContainerFlex>
  </FooterWrapper>
);

export default Footer;
