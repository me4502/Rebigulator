import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { navigate } from 'gatsby';

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
      <h1>You Scored {score}!</h1>
    </Layout>
  );
};

export default ResultPage;
