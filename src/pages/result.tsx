import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { navigate } from 'gatsby';
import { Container } from '../components/Container';
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
import { MainButtonLink } from '../components/MainLink';
import { QuestionResult } from '../util/types';

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

const ResultPage: React.FC<{ location: Location }> = ({ location }) => {
  let score = -1;
  const results: QuestionResult[] = [];

  if (typeof window !== 'undefined') {
    if (location['state'] && !isNaN(location['state']['score'])) {
      score = location['state']['score'];
      if (location['state']['results']) {
        results.push(...location['state']['results']);
      }
    }
    if (score < 0) {
      navigate('/');
      return <></>;
    }
  }

  const scoreMessage = scoreCutoffs.find(cutoff => cutoff[0] <= score)[1];
  const shareUrl = `https://rebigulator.org/challenge/?${
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
                  <div>
                    <p>
                      {i + 1}) {res.episodeTitle} - {res.points} Points
                    </p>
                  </div>
                ))}
              </div>
            )}
          </ResultsDiv>
          <MainButtonLink to="/game/">Want to try again?</MainButtonLink>
          <h3 style={{ marginTop: '2rem'}}>Share your score!</h3>
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

export default ResultPage;
