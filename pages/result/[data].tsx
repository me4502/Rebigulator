import type { FC, PropsWithChildren } from 'react';
import Layout from '../../src/components/layout';
import SEO from '../../src/components/seo';
import { Container } from '../../src/components/Container.module.css';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  TumblrIcon,
  TumblrShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from 'react-share';
import { MainButtonLink } from '../../src/components/MainLink';
import { type QuestionResult } from '../../src/util/types';
import { type GetStaticPaths, type GetStaticProps } from 'next';
import LinkIcon from '../../src/images/link.svg';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  centreDiv,
  resultsDiv,
  shareBox,
  linkShareWrapper,
} from './[data].module.css';

const episodes = new Map(
  (
    require('../../src/util/episodes.json') as {
      value: string;
      label: string;
    }[]
  ).map(({ value, label }) => [value, label])
);

const LinkShareButton: FC<
  PropsWithChildren<{
    url: string;
    title?: string;
    text?: string;
  }>
> = ({ url, title, text, children, ...props }) => {
  const useSystemShare = typeof navigator !== 'undefined' && !!navigator.share;

  const systemClickHandler = () => {
    navigator.share({
      url,
      title,
      text,
    });
  };

  if (useSystemShare) {
    return (
      <button
        className={linkShareWrapper}
        onClick={systemClickHandler}
        {...props}
      >
        <div>{children}</div>
      </button>
    );
  } else {
    return (
      <CopyToClipboard text={url}>
        <button className={linkShareWrapper} {...props}>
          <div>{children}</div>
        </button>
      </CopyToClipboard>
    );
  }
};

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

  const scoreMessage = scoreCutoffs.find((cutoff) => cutoff[0] <= score)[1];
  const shareUrl = `https://rebigulator.org/challenge/${
    typeof btoa !== 'undefined' ? btoa(JSON.stringify({ score })) : ''
  }`;

  const shareTitle = `Bet you can't beat ${score} | The Rebigulator`;
  const shareDescription = `Try to beat my score of ${score} on the Rebigulator!`;

  return (
    <Layout>
      <SEO title="Your Score | The Rebigulator" />
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
                      {i + 1}) {episodes.get(res.e)} - {res.s} Points
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <MainButtonLink href="/game/">Want to try again?</MainButtonLink>
          <h3 style={{ marginTop: '2rem' }}>Share your score!</h3>
          <div className={shareBox}>
            <FacebookShareButton url={shareUrl}>
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
            <LinkShareButton
              aria-label="link"
              url={shareUrl}
              title={shareTitle}
              text={shareDescription}
            >
              <LinkIcon width={16} height={16} alt={'Link share icon'} />
            </LinkShareButton>
          </div>
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

  let parsedData = undefined;

  try {
    parsedData = JSON.parse(Buffer.from(data, 'base64').toString());
  } catch (_ignored) {
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
