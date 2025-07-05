import type { FC } from 'react';
import Layout from '../../../src/components/layout';
import SEO from '../../../src/components/seo';
import { Container } from '../../../src/components/Container.module.css';
import { MainButtonLink } from '../../../src/components/MainLink';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { centreDiv, resultsDiv } from './[data].module.css';
import { cleanupEpisodeTitle } from '../../../src/util/string';
import { ScoreShare } from '../../../src/components/ScoreShare';
import type { DailyResults } from '../../../src/util/daily';

const episodes = new Map(
  (
    require('../../../src/util/episodes.json') as {
      value: string;
      label: string;
    }[]
  ).map(({ value, label }) => [value, label])
);

interface ResultPageProps {
  data: DailyResults;
}

const numeralWorlds = new Map([
  [1, 'first'],
  [2, 'second'],
  [3, 'third'],
  [4, 'fourth'],
  [5, 'fifth'],
  [6, 'sixth'],
]);

const ResultsDisplay: FC<{ results: (string | null)[] }> = ({ results }) => {
  return (
    <div className={resultsDiv}>
      {results.length > 0 && (
        <div>
          {results.map((res, i) => (
            <div key={`result-${i}`}>
              {res === null ? (
                <p>
                  {i + 1}
                  {')'} Skip
                </p>
              ) : (
                <p>
                  {i + 1}
                  {')'} {cleanupEpisodeTitle(episodes.get(res))} ({res})
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ResultPage: FC<ResultPageProps> = ({ data }) => {
  const attempts = data.a;
  const results = data.r;
  const episode = data.e;
  const won = data.w;

  const shareUrl = `https://rebigulator.org/daily/game`;

  const shareTitle = won
    ? `I won today's Rebigulator daily mode on the ${numeralWorlds.get(attempts + 1)} try! Try it for yourself! `
    : `I lost today's Rebigulator daily mode :(. See if you can do better!`;

  return (
    <Layout>
      <SEO title="Your results" />
      <div className={Container}>
        <div className={centreDiv}>
          {won ? (
            <h1>You've won, on your {numeralWorlds.get(attempts + 1)} try!</h1>
          ) : (
            <h1>You've lost, why not try again tomorrow!</h1>
          )}
          <h2>
            The episode was: {cleanupEpisodeTitle(episodes.get(episode))} (
            {episode})
          </h2>
          <p>Your guesses were:</p>
          <ResultsDisplay results={results} />
          <MainButtonLink href="/game/">Play random mode!</MainButtonLink>
          <ScoreShare shareUrl={shareUrl} shareTitle={shareTitle} />
          <p>
            To avoid spoilers, the share links won't include your guesses or the
            episode title. If you want to share that, copy the URL from your
            browser's address bar.
          </p>
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
