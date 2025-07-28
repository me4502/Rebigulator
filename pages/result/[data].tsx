import { useMemo, type FC } from 'react';
import Layout from '../../src/components/layout';
import SEO from '../../src/components/seo';
import { Container } from '../../src/components/Container.module.css';
import { MainButtonLink } from '../../src/components/MainLink';
import type { QuestionResult } from '../../src/util/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { centreDiv, resultsDiv } from './[data].module.css';
import { cleanupEpisodeTitle } from '../../src/util/string';
import { ScoreShare } from '../../src/components/ScoreShare';

const episodes = new Map(
  (
    require('../../src/util/episodes.json') as {
      value: string;
      label: string;
    }[]
  ).map(({ value, label }) => [value, label])
);

const scoreCutoffs = [
  [400, `Incredible! You're a Simpsons expert!`],
  [250, 'Wow! Good job!'],
  [150, 'Decent effort!'],
  [75, `You're getting there!`],
  [0, 'Better luck next time!'],
  [-100, ''],
] as [number, string][];

interface ResultPageProps {
  data: { results: QuestionResult[]; score: number };
}

const ResultPage: FC<ResultPageProps> = ({ data }) => {
  const score = data.score;
  const results = data.results;

  const scoreMessage = useMemo(
    () => scoreCutoffs.find((cutoff) => cutoff[0] <= score)[1],
    [score]
  );
  const shareUrl = `https://rebigulator.org/challenge/${
    typeof btoa === 'undefined' ? '' : btoa(JSON.stringify({ score }))
  }`;

  const shareTitle = `Try to beat my score of ${score} on the Rebigulator!`;

  return (
    <Layout>
      <SEO title="Your results" />
      <div className={Container}>
        <div className={centreDiv}>
          <h1>{scoreMessage}</h1>
          <h2>You scored {score}</h2>
          <div className={resultsDiv}>
            {results.length > 0 && (
              <div>
                {results.map((res, i) => (
                  <div key={`result-${i}`}>
                    <p>
                      {i + 1}
                      {')'} {cleanupEpisodeTitle(episodes.get(res.e))} - {res.s}{' '}
                      Points
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <MainButtonLink href="/game/">Want to try again?</MainButtonLink>
          <ScoreShare shareUrl={shareUrl} shareTitle={shareTitle} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<unknown, { data: string }> = ({
  params,
}) => {
  const { data } = params;

  if (!data) {
    return {
      notFound: true,
    };
  }

  let parsedData;

  try {
    parsedData = JSON.parse(Buffer.from(data, 'base64').toString());
  } catch {
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

export default ResultPage;
