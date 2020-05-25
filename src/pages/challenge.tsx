import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { navigate } from 'gatsby';
import { Container } from '../components/Container';
import styled from 'styled-components';
import { MainButtonLink } from '../components/MainLink';

const CentreDiv = styled.div`
  text-align: center;
`;

const ChallengePage: React.FC<{ location: Location }> = ({ location }) => {
  let score = -1;

  if (typeof window !== 'undefined') {
    if (location.search) {
      try {
        if (typeof atob !== 'undefined') {
          score = JSON.parse(atob(location.search.substring(1))).score;
        } else {
          score = 0;
        }
      } catch (e) {
        console.log('Invalid score URL given.');
      }
    }
    if (score < 0) {
      navigate('/');
      return <></>;
    }
  }

  return (
    <Layout>
      <SEO title={`The Rebigulator | Simpsons Trivia Game`} />
      <Container>
        <CentreDiv>
          <h1>Think you can beat {score}?</h1>
          <h2><MainButtonLink to="/">Get started here</MainButtonLink></h2>
        </CentreDiv>
      </Container>
    </Layout>
  );
};

export default ChallengePage;
