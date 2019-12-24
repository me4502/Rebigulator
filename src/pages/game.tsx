import React, { useState, useEffect } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { getRandom } from '../frinkiac/frinkiacAccess';

const GamePage: React.FC = () => {
  const [episodeData, setEpisodeData] = useState<string>(undefined);

  useEffect(() => {
    getRandom()
      .then(data => {
        setEpisodeData(data.Episode.Title);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Coming Soon</h1>
      {episodeData}
    </Layout>
  );
};

export default GamePage;