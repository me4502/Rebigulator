import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { navigate } from 'gatsby';
import { Container } from '../components/Container';

const ResultPage: React.FC<{ location: Location }> = ({ location }) => {
  let score = 0;

  if (typeof window !== 'undefined') {
    if (!location['state'] || isNaN(location['state']['score'])) {
      navigate('/');
      return <></>;
    }
    score = location['state']['score'];
  }

  return (
    <Layout>
      <SEO title="Your Score | The Rebigulator" />
      <Container>
        <h1 style={{ textAlign: 'center' }}>You Scored {score}!</h1>
      </Container>
    </Layout>
  );
};

export default ResultPage;
