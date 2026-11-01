import type {
  Person,
  SoftwareSourceCode,
  Thing,
  WebApplication,
  WebSite,
} from 'schema-dts';
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

const REBIGULATOR_URL = 'https://rebigulator.org/';
const REBIGULATOR_APP_ID = 'https://rebigulator.org/#application';
const REBIGULATOR_IMAGE = 'https://rebigulator.org/logo.png';
const PERSONAL_SITE_URL = 'https://madelinemiller.dev/';
const BASE_SCHEMA = { '@context': 'https://schema.org' };
const AUTHOR = {
  '@type': 'Person',
  '@id': `${PERSONAL_SITE_URL}contact/#person`,
  name: 'Maddy Miller',
  mainEntityOfPage: `${PERSONAL_SITE_URL}contact/`,
} satisfies Person;
const STRUCTURED_DATA: Thing[] = [
  {
    ...BASE_SCHEMA,
    '@type': 'WebSite',
    '@id': REBIGULATOR_URL,
    name: 'The Rebigulator',
    url: REBIGULATOR_URL,
    author: AUTHOR,
  } satisfies WebSite,
  {
    ...BASE_SCHEMA,
    '@type': 'WebApplication',
    '@id': REBIGULATOR_APP_ID,
    name: 'The Rebigulator',
    url: REBIGULATOR_URL,
    image: REBIGULATOR_IMAGE,
    applicationCategory: 'BrowserApplication',
    license: 'https://github.com/me4502/Rebigulator/blob/master/LICENSE',
    offers: {
      '@type': 'Offer',
      price: 0,
    },
    isPartOf: {
      '@id': REBIGULATOR_URL,
    },
    author: AUTHOR,
  } satisfies WebApplication,
  {
    ...BASE_SCHEMA,
    '@type': 'SoftwareSourceCode',
    codeRepository: 'https://github.com/me4502/Rebigulator',
    targetProduct: {
      '@id': REBIGULATOR_APP_ID,
    },
  } satisfies SoftwareSourceCode,
];

const IndexPage: FC = () => (
  <Layout>
    <SEO
      title="The Rebigulator | Simpsons Trivia Game"
      titleExtra=""
      description="The Rebigulator is an online fast-paced quote-based Simpsons trivia quiz game. Play now for free!"
      structuredData={STRUCTURED_DATA}
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
          <div className={modeOption}>
            <h3 className={modeHeading}>Other places to play</h3>
            <div className={buttonRow}>
              <MainButtonLink href="https://trmnl.com/recipes/393389?ref=madelinemiller">
                Get the TRMNL plugin
              </MainButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
