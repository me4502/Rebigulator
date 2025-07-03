import type { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import Layout from '../../src/components/layout';
import SEO from '../../src/components/seo';

const GamePage: FC = () => {
  return (
    <Layout>
      <SEO title="Play the daily challenge | The Rebigulator" />
      <ToastContainer draggable={true} closeOnClick={true} />
    </Layout>
  );
};

export default GamePage;
