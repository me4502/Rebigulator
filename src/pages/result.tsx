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
} from 'react-share';

const CentreDiv = styled.div`
  text-align: center;
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
  [0, 'Better luck next time!'],
  [50, `You're getting there!`],
  [100, 'Decent effort!'],
  [200, 'Wow! Good job!'],
  [300, `Incredible! You're a Simpsons export!`],
] as [number, string][];

const ResultPage: React.FC<{ location: Location }> = ({ location }) => {
  let score = -1;

  if (typeof window !== 'undefined') {
    if (location['state'] && !isNaN(location['state']['score'])) {
      score = location['state']['score'];
    }
    if (score < 0) {
      navigate('/');
      return <></>;
    }
  }

  const scoreMessage = scoreCutoffs.find(cutoff => cutoff[0] < score);
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
          <h3>Share your score!</h3>
          <ShareBox>
            <FacebookShareButton url={shareUrl} quote={shareDescription}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
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
