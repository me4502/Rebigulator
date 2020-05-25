import React, { useState, useEffect, useMemo } from 'react';
import { getRandom, RandomResponse } from '../frinkiac/frinkiacAccess';
import styled from 'styled-components';
import { ValueType, OptionTypeBase, createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';
import LoadingSpinner from './LoadingSpinner';
import { Episode } from '../frinkiac/types';
import { MainButton } from './MainLink';

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
  border: 1px solid #ffce1a;
  background: #e8eef2;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
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
  margin: 0.5rem 0;
  font-family: 'akbarplain';
`;

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
  const filter = createFilter({
    ignoreAccents: false,
  });

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

  const checkForCorrect = (value: ValueType<OptionTypeBase>) => {
    if (value['value'] === data.Episode.Key) {
      onQuestionFinish(secondsLeft, data.Episode);
    } else {
      onFail('Wrong! Try again...');
    }
  };

  const loadOptions = async (input: string) =>
    episodes.filter(ep => filter(ep, input));

  return (
    <GameBoard>
      <SecondsCounter>{secondsLeft}</SecondsCounter>
      <LinesBox>
        {data.Subtitles.map(sub => (
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
      <AsyncSelect
        loadOptions={loadOptions}
        onChange={checkForCorrect}
        placeholder={'Enter an episode name...'}
      />
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
      .then(data => {
        setData(data);
      })
      .catch(e => console.log(e));
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
