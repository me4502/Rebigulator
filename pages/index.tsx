import type { FC } from 'react';

import Layout from '../src/components/layout';
import SEO from '../src/components/seo';
import { Container } from '../src/components/Container.module.css';
import { MainButtonLink } from '../src/components/MainLink';
import BrandSvg from '../src/images/brand.svg';
import {
  bannerImage,
  buttonRow,
  buttonRows,
  centreDiv,
  modeHeading,
  modeOption,
} from './index.module.css';

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
        <div className={buttonRows}>
          <div className={modeOption}>
            <h3 className={modeHeading}>Daily mode</h3>
            <div className={buttonRow}>
              <MainButtonLink href="/daily/game/">
                Try the challenge!
              </MainButtonLink>
            </div>
          </div>
          <div className={modeOption}>
            <h3 className={modeHeading}>Random mode</h3>
            <div className={buttonRow}>
              <MainButtonLink href="/game/?mode=classic">
                Classic episodes (S1 - S11)
              </MainButtonLink>
              <MainButtonLink href="/game/">
                All episodes (S1 - S34 + Movie)
              </MainButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
