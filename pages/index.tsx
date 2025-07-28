import type { FC } from 'react';

import Layout from '../src/components/layout';
import SEO from '../src/components/seo';
import { Container } from '../src/components/Container.module.css';
import { MainButtonLink } from '../src/components/MainLink';
import BrandSvg from '../src/images/brand.svg';
import { bannerImage, centreDiv } from './index.module.css';

const IndexPage: FC = () => (
  <Layout>
    <SEO
      title="The Rebigulator | Simpsons Trivia Game"
      titleExtra=""
      description="The Rebigulator is an online fast-paced quote-based Simpsons trivia quiz game. Play now for free!"
    />
    <div className={Container}>
      <BrandSvg className={bannerImage} />
      <div className={centreDiv}>
        <h1>
          The Rebigulator is an online fast-paced quote-based Simpsons Trivia
          Quiz Game
        </h1>
        <h2 style={{ marginBottom: '3rem' }}>
          Guess the episode title from a single frame and a quote
        </h2>
        <MainButtonLink href="/game/">Get started now!</MainButtonLink>{' '}
        <MainButtonLink href="/daily/game/">
          Or try the new daily mode!
        </MainButtonLink>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
