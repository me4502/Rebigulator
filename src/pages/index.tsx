import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Container } from '../components/Container';
import styled from 'styled-components';
import { Link } from 'gatsby';

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
    <SEO title="The Rebigulator" />
    <Container>
      <BannerImage src="/brand.svg" alt="The Rebigulator" />
      <CentreDiv>
        <h1>The Rebigulator [BETA] is a quote-based Simpsons Trivia Game</h1>
        <h2>Guess the episode title from a quote, and an optional image</h2>

        <Link to="/game/">Get Started Now!</Link>
      </CentreDiv>
    </Container>
  </Layout>
);

export default IndexPage;
