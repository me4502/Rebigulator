import React from 'react';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { Container } from '../../components/Container';
import styled from 'styled-components';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  TelegramShareButton,
  TelegramIcon,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  TumblrIcon,
  TumblrShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from 'react-share';
import { MainButtonLink } from '../../components/MainLink';
import { QuestionResult } from '../../util/types';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

const episodes = new Map(
  (require('../../util/episodes.json') as {
    value: string;
    label: string;
  }[]).map(({ value, label }) => [value, label])
);

const CentreDiv = styled.div`
  text-align: center;
`;

const ResultsDiv = styled.div`
  margin-bottom: 2rem;
`;

const ShareBox = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 300px;
  margin-top: 1rem;

  div {
    cursor: pointer;
    margin-bottom: 0.5rem;
  }
`;

const scoreCutoffs = [
  [300, `Incredible! You're a Simpsons export!`],
  [200, 'Wow! Good job!'],
  [100, 'Decent effort!'],
  [50, `You're getting there!`],
  [0, 'Better luck next time!'],
  [-100, ''],
] as [number, string][];

interface ResultPageProps {
  data: { results: QuestionResult[]; score: number };
}

const ResultPage: React.FC<ResultPageProps> = ({ data }) => {
  const score = data.score;
  const results = data.results;

  const scoreMessage = scoreCutoffs.find((cutoff) => cutoff[0] <= score)[1];
  const shareUrl = `https://rebigulator.org/challenge/${
    typeof btoa !== 'undefined' ? btoa(JSON.stringify({ score })) : ''
  }`;

  const shareTitle = `Bet you can't beat ${score} | The Rebigulator`;
  const shareDescription = `Try to beat my score of ${score} on the Rebigulator!`;

  return (
    <Layout>
      <SEO title="Your Score | The Rebigulator" />
      <Container>
        <CentreDiv>
          <h1>{scoreMessage}</h1>
          <h2>You scored {score}</h2>
          <ResultsDiv>
            {results.length > 0 && (
              <div>
                {results.map((res, i) => (
                  <div key={`result-${i}`}>
                    <p>
                      {i + 1}) {episodes.get(res.e)} - {res.s} Points
                    </p>
                  </div>
                ))}
              </div>
            )}
          </ResultsDiv>
          <Link href="/game/">
            <MainButtonLink>Want to try again?</MainButtonLink>
          </Link>
          <h3 style={{ marginTop: '2rem' }}>Share your score!</h3>
          <ShareBox>
            <FacebookShareButton url={shareUrl} quote={shareDescription}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <FacebookMessengerShareButton
              url={shareUrl}
              appId={`609865043173658`}
            >
              <FacebookMessengerIcon size={32} round={true} />
            </FacebookMessengerShareButton>
            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <TelegramShareButton url={shareUrl} title={shareTitle}>
              <TelegramIcon size={32} round={true} />
            </TelegramShareButton>
            <WhatsappShareButton url={shareUrl} title={shareTitle}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <RedditShareButton url={shareUrl} title={shareTitle}>
              <RedditIcon size={32} round={true} />
            </RedditShareButton>
            <TumblrShareButton
              url={shareUrl}
              caption={shareDescription}
              title={shareTitle}
            >
              <TumblrIcon size={32} round={true} />
            </TumblrShareButton>
          </ShareBox>
        </CentreDiv>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{}, { data: string }> = async ({
  params,
}) => {
  const { data } = params!;

  if (!data) {
    return {
      notFound: true,
    };
  }

  let parsedData = undefined;

  try {
    parsedData = JSON.parse(Buffer.from(data, 'base64').toString());
  } catch (ignored) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default ResultPage;
