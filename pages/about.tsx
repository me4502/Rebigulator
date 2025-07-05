import type { FC } from 'react';

import Layout from '../src/components/layout';
import SEO from '../src/components/seo';
import { Container } from '../src/components/Container.module.css';
import { MainLink } from '../src/components/MainLink';

const AboutPage: FC = () => (
  <Layout>
    <SEO title="About" />
    <div className={Container}>
      <h1>About the Rebigulator</h1>
      <p>
        The Rebigulator is a Simpsons trivia game I decided to make, after a few
        people mentioned to me that I seem to have an unsettling ability to
        identify what episode of the Simpsons random scenes happen in.
      </p>
      <p>
        The game is partially powered by the APIs backing{' '}
        <MainLink href="https://frinkiac.com/">Frinkiac</MainLink>, and is{' '}
        <MainLink href="https://github.com/Me4502/Rebigulator/">
          Open Source
        </MainLink>
        .
      </p>
      <p>
        It also makes use of the Akbar typeface,{' '}
        <MainLink href="https://www.wobblymusic.com/groening/akbar.html">
          available here
        </MainLink>
        .
      </p>
      <p>
        I do not own The Simpsons, or any related media. This website is
        unofficial and is not endorsed by, or related to, the creators of The
        Simpsons.
      </p>
    </div>
  </Layout>
);

export default AboutPage;
