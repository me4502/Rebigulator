import type { FC } from 'react';

import Layout from '../src/components/layout';
import SEO from '../src/components/seo';
import { Container } from '../src/components/Container.module.css';

const NotFoundPage: FC = () => (
  <Layout>
    <SEO title="404: Not found | The Rebigulator" />
    <div className={Container}>
      <h1>Jesus, Mary and glaven!</h1>
      <p>This page doesn't exist.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
