import { Suspense, type FC } from 'react';
import Layout from '../../../src/components/layout';
import SEO from '../../../src/components/seo';
import { Container } from '../../../src/components/Container.module.css';
import { MainButtonLink } from '../../../src/components/MainLink';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { centreDiv, resultsDiv } from './[data].module.css';
import { cleanupEpisodeTitle } from '../../../src/util/string';
import { ScoreShare } from '../../../src/components/ScoreShare';
import { getDateString, type DailyResults } from '../../../src/util/daily';
import { useSuspenseQuery } from '@tanstack/react-query';

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

const EpisodeTitle: FC<{ episode: string }> = ({ episode }) => {
  const { data: title } = useSuspenseQuery({
    queryKey: ['frinkiacEpisodeTitleMap'],
    queryFn: async () => {
      const episodes = await import('../../../src/util/frinkiacEpisodes.json', {
        with: { type: 'json' },
      }).then((mod) => mod.default);
      return new Map(episodes.map(({ value, label }) => [value, label]));
    },
    select: (data) => data.get(episode),
  });

  return <>{cleanupEpisodeTitle(title)}</>;
};

const ResultsDisplay: FC<{ results: (string | null)[] }> = ({ results }) => {
  return (
    <div className={resultsDiv}>
      <Suspense fallback={<p>Loading results...</p>}>
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
                    {')'} <EpisodeTitle episode={res} />
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

const ResultPage: FC<ResultPageProps> = ({ data }) => {
  const attempts = data.a;
  const results = data.r;
  const episode = data.e;
  const won = data.w;
  const date = (data.d ?? getDateString()).replaceAll('-', '/'); // Format date for display

  const shareUrl = `https://rebigulator.org/daily/game`;

  const shareTitle = won
    ? `I won the Rebigulator daily challenge for ${date} on the ${numeralWorlds.get(attempts + 1)} try! Try it for yourself! `
    : `I lost the Rebigulator daily challenge for ${date} :(. See if you can do better!`;

  return (
    <Layout>
      <SEO title="Your daily challenge results" />
      <div className={Container}>
        <div className={centreDiv}>
          {won ? (
            <h1>You've won, on your {numeralWorlds.get(attempts + 1)} try!</h1>
          ) : (
            <h1>You've lost, why not try again tomorrow!</h1>
          )}
          <h2>
            The episode was:{' '}
            <Suspense fallback={<>Loading...</>}>
              <EpisodeTitle episode={episode} />
            </Suspense>
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
