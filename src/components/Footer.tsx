import type { FC } from 'react';
import styled from 'styled-components';
import { Container } from './Container';
import { MainLink } from './MainLink';

const FooterWrapper = styled.footer`
  justify-content: center;
  border-top: 1px solid var(--theme-tertiary);
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

const Footer: FC = () => (
  <FooterWrapper>
    <ContainerFlex>
      <p>
        Powered by <MainLink href="https://frinkiac.com/">Frinkiac</MainLink>{' '}
      </p>
      <p>
        Made by <MainLink href="https://madelinemiller.dev/">Me4502</MainLink>
      </p>
    </ContainerFlex>
  </FooterWrapper>
);

export default Footer;
