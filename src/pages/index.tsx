import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Container } from '../components/Container';
import styled from 'styled-components';
import { MainButtonLink } from '../components/MainLink';

const BannerImage = styled.img`
  max-width: 600px;
  width: 80%;
  display: block;
  margin: 2rem auto;
`;

const CentreDiv = styled.div`
  text-align: center;
`;

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="The Rebigulator | Simpsons Trivia Game" />
    <Container>
      <BannerImage src="/brand.svg" alt="The Rebigulator" loading={'eager'} />
      <CentreDiv>
        <h1>The Rebigulator is a quote-based Simpsons Trivia Game</h1>
        <h2 style={{ marginBottom: '3rem' }}>
          Guess the episode title from a quote, with an image hint
        </h2>
        <MainButtonLink to="/game/">Get Started Now!</MainButtonLink>
      </CentreDiv>
    </Container>
  </Layout>
);

export default IndexPage;
