import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Container } from '../components/Container';
import styled from 'styled-components';
import { MainButtonLink } from '../components/MainLink';
import Link from 'next/link';
import BrandSvg from '../images/brand.svg';

const BannerImage = styled(BrandSvg)`
  max-width: 600px;
  width: 80%;
  display: block;
  margin: 2rem auto;

  path:not(.brand_svg__cls-1) {
    fill: var(--theme-text);
  }

  path.brand_svg__cls-1 {
    fill: var(--theme-primary);
  }
`;

const CentreDiv = styled.div`
  text-align: center;
`;

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="The Rebigulator | Simpsons Trivia Game" />
    <Container>
      <BannerImage />
      <CentreDiv>
        <h1>The Rebigulator is a fast-paced quote-based Simpsons Trivia Game</h1>
        <h2 style={{ marginBottom: '3rem' }}>
          Guess the episode title from a quote, with an image hint
        </h2>
        <Link href="/game/">
          <MainButtonLink>Get started now!</MainButtonLink>
        </Link>
      </CentreDiv>
    </Container>
  </Layout>
);

export default IndexPage;
