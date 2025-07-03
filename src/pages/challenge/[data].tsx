import type { FC } from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { Container } from '../../components/Container';
import styled from 'styled-components';
import { MainButtonLink } from '../../components/MainLink';
import type { GetStaticPaths, GetStaticProps } from 'next';

const CentreDiv = styled.div`
  text-align: center;
`;

interface ChallengePageProps {
  data: {
    score: number;
  };
}

const ChallengePage: FC<ChallengePageProps> = ({ data }) => (
  <Layout>
    <SEO
      title={`You've been challenged! Think you can beat a score of ${data.score}? | The Rebigulator; Simpsons Trivia Game`}
      description={`You've been challenged! Think you can beat a score of ${data.score}? | The Rebigulator; Simpsons Trivia Game powered by Frinkiac`}
    />
    <Container>
      <CentreDiv>
        <h1>
          The Rebigulator is a fast-paced quote-based Simpsons Trivia Game
        </h1>
        <h2 style={{ marginBottom: '3rem' }}>
          Guess the episode title from a quote, with an image hint
        </h2>
        <h2>
          You've been challenged! Think you can beat a score of {data.score}?
        </h2>
        <MainButtonLink href="/game/">Let's do it!</MainButtonLink>
      </CentreDiv>
    </Container>
  </Layout>
);

export const getStaticProps: GetStaticProps<unknown, { data: string }> = ({
  params,
}) => {
  const { data } = params;

  if (!data) {
    return {
      notFound: true,
    };
  }

  let parsedData = undefined;

  try {
    parsedData = JSON.parse(Buffer.from(data, 'base64').toString());
  } catch (_e) {
    return {
      notFound: true,
    };
  }

  if (!parsedData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: parsedData,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default ChallengePage;
