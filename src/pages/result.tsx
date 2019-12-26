import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { navigate } from 'gatsby';

const ResultPage: React.FC<{ location: Location }> = ({ location }) => {
  if (!location['state'] || isNaN(location['state']['score'])) {
    navigate('/');
    return <></>;
  }
  return (
    <Layout>
      <SEO title="Home" />
      <h1>You Scored {((location as unknown) as any).state.score}!</h1>
    </Layout>
  );
};

export default ResultPage;
