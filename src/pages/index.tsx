import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Container } from '../components/Container';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="The Rebigulator" />
    <Container>
      <h1 style={{ textAlign: 'center' }}>Coming Soon</h1>
    </Container>
  </Layout>
);

export default IndexPage;
