import { useState, useEffect, useMemo, type FC, useCallback } from 'react';
import { getRandom, type RandomResponse } from '../../frinkiac/frinkiacAccess';
import LoadingSpinner from '../LoadingSpinner';
import type { Episode } from '../../frinkiac/types';
import { MainButton } from '../MainLink';
import { MultiChoiceBox } from '../MultiChoiceBox';
import {
  gameBoard,
  secondsCounter,
  buttonBox,
  loadingBox,
} from './GameSlide.module.css';
import { shuffle } from '../../util/array';
import { GameBox } from './GameBox';

const episodes = require('../../util/episodes.json') as {
  value: string;
  label: string;
}[];

interface GameSlideProps {
  onQuestionFinish: (points: number, episode: Episode) => void;
  onFail: (message: string) => void;
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

const GameSlideLogic: FC<GameSlideLogicProps> = ({
  onQuestionFinish,
  onFail,
  data,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(TIME_PER_SLIDE);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    if (started) {
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
    }
  }, [started, secondsLeft, data.Episode, onQuestionFinish]);

  const onSkip = useCallback(() => {
    onQuestionFinish(0, data.Episode);
  }, [data.Episode, onQuestionFinish]);

  const onStart = useCallback(() => {
    setStarted(true);
  }, [setStarted]);

  const checkForCorrect = useCallback(
    (value: string) => {
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
    },
    [secondsLeft, data.Episode, onQuestionFinish, onFail]
  );

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
      <p className={secondsCounter}>{Math.max(0, secondsLeft)}</p>
      <GameBox data={data} onStart={onStart} />
      <p className={secondsCounter} style={{ marginTop: '2rem' }}>
        Which episode is it?
      </p>
      <MultiChoiceBox choices={choices} onClick={checkForCorrect} />
      <div className={buttonBox}>
        <MainButton onClick={onSkip}>Skip</MainButton>
      </div>
    </div>
  );
};

export const GameSlide: FC<GameSlideProps> = ({
  onQuestionFinish,
  onFail,
  gameEnded = false,
}) => {
  const [data, setData] = useState<RandomResponse>();

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
