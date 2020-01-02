import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Container } from '../components/Container';

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found | The Rebigulator" />
    <Container>
      <h1>Jesus, Mary and glaven!</h1>
      <p>This page doesn't exist.</p>
    </Container>
  </Layout>
);

export default NotFoundPage;
