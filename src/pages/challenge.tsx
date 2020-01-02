import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { navigate, Link } from 'gatsby';
import { Container } from '../components/Container';
import styled from 'styled-components';

const CentreDiv = styled.div`
  text-align: center;
`;

const ChallengePage: React.FC<{ location: Location }> = ({ location }) => {
  let score = -1;

  if (typeof window !== 'undefined') {
    if (location.search) {
      try {
        if (typeof atob !== 'undefined') {
          score = JSON.parse(atob(location.search)).score;
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
      <SEO title={`Bet you can't beat ${score}! | The Rebigulator`} />
      <Container>
        <CentreDiv>
          <h1>Think you can beat {score}?</h1>
          <h2><Link to="/">Get started here</Link></h2>
        </CentreDiv>
      </Container>
    </Layout>
  );
};

export default ChallengePage;
