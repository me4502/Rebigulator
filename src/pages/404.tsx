import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found | The Rebigulator" />
    <h1>Jesus, Mary and glaven!</h1>
    <p>This page doesn't exist.</p>
  </Layout>
);

export default NotFoundPage;
