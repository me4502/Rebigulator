import type { FC } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Container } from '../components/Container';
import { MainLink } from '../components/MainLink';

const AboutPage: FC = () => (
  <Layout>
    <SEO title="About | The Rebigulator" />
    <Container>
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
    </Container>
  </Layout>
);

export default AboutPage;
