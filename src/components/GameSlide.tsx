import React, { useState, useEffect, useMemo } from 'react';
import { getRandom, RandomResponse } from '../frinkiac/frinkiacAccess';
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';
import { Episode } from '../frinkiac/types';
import { MainButton } from './MainLink';
import { LIGHT_THEME } from '../util/color';

const episodes = require('../util/episodes.json') as {
  value: string;
  label: string;
  data: undefined;
}[];

interface GameSlideProps {
  onQuestionFinish: (points: number, episode: Episode) => void;
  onFail: (message: string) => void;
  handicap: number;
}

interface GameSlideLogicProps extends GameSlideProps {
  data: RandomResponse;
}

const TIME_PER_SLIDE = 60;

const LinesBox = styled.div`
  font-family: 'akbarplain';
  border: 1px solid var(--theme-secondary);
  background: var(--theme-tertiary);
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
  margin: 0.5rem 0 1.0rem 0;
  font-family: 'akbarplain';
`;

const MultiChoiceGrid = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  grid-gap: 4px;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function getRandomEpisode(ignore: string): string {
  let episode = undefined;
  do {
    episode = episodes[Math.floor(Math.random() * episodes.length)].label;
  } while (episode === ignore);
  return episode;
}

interface MultiChoiceBoxProps {
  choices: string[];
  onClick: (value: string) => void;
}

const boxColors = [LIGHT_THEME.primary, '#cf5615', '#88cf15', '#5c15cf'];

const MultiChoiceBox: React.FC<MultiChoiceBoxProps> = ({
  choices,
  onClick,
}) => {
  return (
    <MultiChoiceGrid>
      {choices.map((choice, i) => (
        <MainButton
          key={`choice-${i}`}
          onClick={() => onClick(choice)}
          style={{ backgroundColor: boxColors[i] }}
        >
          {choice}
        </MainButton>
      ))}
    </MultiChoiceGrid>
  );
};

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
      setSecondsLeft(timeRemaining);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [secondsLeft]);

  const onShowImage = () => {
    setSecondsLeft(secondsLeft - 10);
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
      setSecondsLeft(secondsLeft - 20);
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
    [data.Episode.Id]
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
      <SecondsCounter style={{ marginTop: '2rem' }}>Which episode is it?</SecondsCounter>
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
}) => {
  const [data, setData] = useState<RandomResponse>(undefined);

  useEffect(() => {
    getRandom()
      .then((data) => {
        setData(data);
      })
      .catch((e) => console.log(e));
  }, []);

  if (data) {
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
        <p>Loading your questions...</p>
        <LoadingSpinner />
      </LoadingBox>
    );
  }
};
