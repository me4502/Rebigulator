import type { FC, PropsWithChildren } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  BlueskyShareButton,
  BlueskyIcon,
  ThreadsShareButton,
  ThreadsIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  TumblrShareButton,
  TumblrIcon,
} from 'react-share';
import { linkShareWrapper, shareBox } from './ScoreShare.module.css';
import LinkIcon from '../images/link.svg';

const LinkShareButton: FC<
  PropsWithChildren<{
    url: string;
    title?: string;
    text?: string;
  }>
> = ({ url, title, text, children, ...props }) => {
  const useSystemShare = typeof navigator !== 'undefined' && !!navigator.share;

  const systemClickHandler = () => {
    navigator
      .share({
        url,
        title,
        text,
      })
      .catch((e) => console.error('Share failed:', e));
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

interface ScoreShareProps {
  shareUrl: string;
  shareTitle: string;
  shareDescription: string;
}

export const ScoreShare: FC<ScoreShareProps> = ({
  shareUrl,
  shareTitle,
  shareDescription,
}) => {
  return (
    <>
      <h3 style={{ marginTop: '2rem' }}>Share your score!</h3>
      <div className={shareBox}>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={shareTitle}>
          <XIcon size={32} round={true} />
        </TwitterShareButton>
        <BlueskyShareButton url={shareUrl} title={shareTitle}>
          <BlueskyIcon size={32} round={true} />
        </BlueskyShareButton>
        <ThreadsShareButton url={shareUrl} title={shareTitle}>
          <ThreadsIcon size={32} round={true} />
        </ThreadsShareButton>
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
    </>
  );
};
