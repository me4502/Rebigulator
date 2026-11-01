import type { FC, PropsWithChildren } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  FacebookLegacyIcon,
  XShareButton,
  XLegacyIcon,
  BlueskyShareButton,
  BlueskyLegacyIcon,
  ThreadsShareButton,
  ThreadsLegacyIcon,
  WhatsappShareButton,
  WhatsappLegacyIcon,
  RedditShareButton,
  RedditLegacyIcon,
  TumblrShareButton,
  TumblrLegacyIcon,
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
}

export const ScoreShare: FC<ScoreShareProps> = ({ shareUrl, shareTitle }) => {
  return (
    <>
      <h3 style={{ marginTop: '2rem' }}>Share your score!</h3>
      <div className={shareBox}>
        <FacebookShareButton url={shareUrl}>
          <FacebookLegacyIcon size={32} round={true} />
        </FacebookShareButton>
        <XShareButton url={shareUrl} text={shareTitle}>
          <XLegacyIcon size={32} round={true} />
        </XShareButton>
        <BlueskyShareButton url={shareUrl} text={shareTitle}>
          <BlueskyLegacyIcon size={32} round={true} />
        </BlueskyShareButton>
        <ThreadsShareButton url={shareUrl} text={shareTitle}>
          <ThreadsLegacyIcon size={32} round={true} />
        </ThreadsShareButton>
        <WhatsappShareButton url={shareUrl} message={shareTitle}>
          <WhatsappLegacyIcon size={32} round={true} />
        </WhatsappShareButton>
        <RedditShareButton url={shareUrl} shareTitle={shareTitle}>
          <RedditLegacyIcon size={32} round={true} />
        </RedditShareButton>
        <TumblrShareButton
          url={shareUrl}
          postTitle={shareTitle}
          caption={shareTitle}
        >
          <TumblrLegacyIcon size={32} round={true} />
        </TumblrShareButton>
        <LinkShareButton aria-label="link" url={shareUrl} title={shareTitle}>
          <LinkIcon width={16} height={16} alt={'Link share icon'} />
        </LinkShareButton>
      </div>
    </>
  );
};
