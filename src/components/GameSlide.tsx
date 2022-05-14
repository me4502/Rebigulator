import React, { useState, useEffect, useMemo } from 'react';
import { getRandom, RandomResponse } from '../frinkiac/frinkiacAccess';
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';
import { Episode } from '../frinkiac/types';
import { MainButton } from './MainLink';
import { MultiChoiceBox } from './MultiChoiceBox';

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

const LinesBox = styled.div`
  font-family: 'akbarplain';
  border: 1px solid var(--theme-tertiary);
  background: var(--theme-background);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  font-size: 14pt;
  font-weight: 600;
`;

const GameBoard = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

const HintImg = styled.img`
  max-width: 100%;
  margin-top: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;

  * {
    margin: 0 0.5rem;
  }
`;

const SecondsCounter = styled.p`
  font-size: 18pt;
  margin: 0.5rem 0 1rem 0;
  font-family: 'akbarplain';
`;

function getRandomEpisode(ignore: string): string {
  let episode = undefined;
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

const GameSlideLogic: React.FC<GameSlideLogicProps> = ({
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
    <GameBoard>
      <SecondsCounter>{secondsLeft}</SecondsCounter>
      <LinesBox>
        {data.Subtitles.map((sub) => (
          <p key={`${data.Episode.Id}-${sub.Id}`}>{sub.Content}</p>
        ))}
      </LinesBox>
      <ButtonBox>
        {secondsLeft > 10 && !showImage && (
          <MainButton onClick={onShowImage}>
            Show Image Hint (10 second penalty)
          </MainButton>
        )}
        <MainButton onClick={onSkip}>Skip</MainButton>
      </ButtonBox>
      <SecondsCounter style={{ marginTop: '2rem' }}>
        Which episode is it?
      </SecondsCounter>
      <MultiChoiceBox choices={choices} onClick={checkForCorrect} />
      {showImage && (
        <HintImg
          src={`https://frinkiac.com/img/${data.Episode.Key}/${data.Frame.Timestamp}.jpg`}
        />
      )}
    </GameBoard>
  );
};

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const GameSlide: React.FC<GameSlideProps> = ({
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
      <LoadingBox>
        <p>Loading...</p>
        <LoadingSpinner />
      </LoadingBox>
    );
  }
};
