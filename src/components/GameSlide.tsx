import { useState, useEffect, useMemo, type FC } from 'react';
import { getRandom, type RandomResponse } from '../frinkiac/frinkiacAccess';
import LoadingSpinner from './LoadingSpinner';
import { type Episode } from '../frinkiac/types';
import { MainButton } from './MainLink';
import { MultiChoiceBox } from './MultiChoiceBox';
import {
  gameBoard,
  secondsCounter,
  linesBox,
  buttonBox,
  hintImg,
  loadingBox,
} from './GameSlide.module.css';

const episodes = require('../util/episodes.json') as {
  value: string;
  label: string;
  data: undefined;
}[];

interface GameSlideProps {
  onQuestionFinish: (points: number, episode: Episode) => void;
  onFail: (message: string) => void;
  handicap: number;
  gameEnded: boolean;
}

interface GameSlideLogicProps extends Omit<GameSlideProps, 'gameEnded'> {
  data: RandomResponse;
}

const TIME_PER_SLIDE = 60;

function getRandomEpisode(ignore: string): string {
  let episode: string | undefined = undefined;
  do {
    episode = episodes[Math.floor(Math.random() * episodes.length)].label;
  } while (episode === ignore);
  return episode;
}

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const GameSlideLogic: FC<GameSlideLogicProps> = ({
  onQuestionFinish,
  onFail,
  data,
  handicap,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(
    TIME_PER_SLIDE - handicap
  );
  const [showImage, setShowImage] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const timeRemaining = secondsLeft - 1;
      if (timeRemaining < 0) {
        onQuestionFinish(0, data.Episode);
        return;
      }
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [secondsLeft, data.Episode, onQuestionFinish]);

  const onShowImage = () => {
    setSecondsLeft((s) => s - 10);
    setShowImage(true);
  };

  const onSkip = () => {
    onQuestionFinish(0, data.Episode);
  };

  const checkForCorrect = (value: string) => {
    if (secondsLeft <= 0) {
      // Don't accept negative values.
      return;
    }
    if (value === data.Episode.Title) {
      onQuestionFinish(secondsLeft, data.Episode);
    } else {
      onFail('Wrong! Try again... -20');
      setSecondsLeft((s) => s - 20);
    }
  };

  const choices = useMemo(
    () =>
      shuffle([
        getRandomEpisode(data.Episode.Title),
        getRandomEpisode(data.Episode.Title),
        getRandomEpisode(data.Episode.Title),
        data.Episode.Title,
      ]),
    [data.Episode.Title]
  );

  return (
    <div className={gameBoard}>
      <link
        rel="preload"
        as="image"
        href={`https://frinkiac.com/img/${data.Episode.Key}/${data.Frame.Timestamp}.jpg`}
      />
      <p className={secondsCounter}>{secondsLeft}</p>
      <div className={linesBox}>
        {data.Subtitles.map((sub) => (
          <p key={`${data.Episode.Id}-${sub.Id}`}>{sub.Content}</p>
        ))}
      </div>
      <div className={buttonBox}>
        {secondsLeft > 10 && !showImage && (
          <MainButton onClick={onShowImage}>
            Show Image Hint (10 second penalty)
          </MainButton>
        )}
        <MainButton onClick={onSkip}>Skip</MainButton>
      </div>
      <p className={secondsCounter} style={{ marginTop: '2rem' }}>
        Which episode is it?
      </p>
      <MultiChoiceBox choices={choices} onClick={checkForCorrect} />
      {showImage && (
        <img
          className={hintImg}
          src={`https://frinkiac.com/img/${data.Episode.Key}/${data.Frame.Timestamp}.jpg`}
          alt="Episode hint"
        />
      )}
    </div>
  );
};

export const GameSlide: FC<GameSlideProps> = ({
  onQuestionFinish,
  handicap,
  onFail,
  gameEnded = false,
}) => {
  const [data, setData] = useState<RandomResponse>(undefined);

  useEffect(() => {
    getRandom()
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  }, []);

  if (data && !gameEnded) {
    return (
      <GameSlideLogic
        onQuestionFinish={onQuestionFinish}
        onFail={onFail}
        data={data}
        handicap={handicap}
      />
    );
  } else {
    return (
      <div className={loadingBox}>
        <p>Loading...</p>
        <LoadingSpinner />
      </div>
    );
  }
};
