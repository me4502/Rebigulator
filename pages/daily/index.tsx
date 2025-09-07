import type { FC } from 'react';

import Layout from '../../src/components/layout';
import SEO from '../../src/components/seo';
import { Container } from '../../src/components/Container.module.css';
import { MainButtonLink } from '../../src/components/MainLink';
import BrandSvg from '../../src/images/brand.svg';
import { bannerImage, centreDiv } from '../index.module.css';

const IndexPage: FC = () => (
  <Layout>
    <SEO title="The Rebigulator Daily Mode" />
    <div className={Container}>
      <BrandSvg className={bannerImage} />
      <div className={centreDiv}>
        <h1>
          The Rebigulator Daily Mode is a daily online fast-paced quote-based
          Simpsons Trivia Quiz Game, with a new challenge every day!
        </h1>
        <h2 style={{ marginBottom: '3rem' }}>
          Guess the daily episode from the shown frame. Each wrong guess you
          make will show you a new frame from the episode.
        </h2>
        <MainButtonLink href="/daily/game/">Get started now!</MainButtonLink>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
