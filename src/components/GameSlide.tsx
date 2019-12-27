import React, { useState, useEffect, useMemo } from 'react';
import { getRandom, RandomResponse } from '../frinkiac/frinkiacAccess';
import styled from 'styled-components';
import { ValueType, OptionTypeBase, createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';

const episodes = require('../util/episodes.json') as {
  value: string;
  label: string;
  data: undefined;
}[];

interface GameSlideProps {
  onQuestionFinish: (points: number) => void;
  handicap: number;
}

interface GameSlideLogicProps extends GameSlideProps {
  data: RandomResponse;
}

const TIME_PER_SLIDE = 60;

const LinesBox = styled.div`
  font-family: 'akbarplain';
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

  button {
    margin: 0 0.5rem;
  }
`;

const GameSlideLogic: React.FC<GameSlideLogicProps> = ({
  onQuestionFinish,
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
        onQuestionFinish(0);
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
    onQuestionFinish(0);
  };

  const checkForCorrect = (value: ValueType<OptionTypeBase>) => {
    if (value['value'] === data.Episode.Key) {
      onQuestionFinish(secondsLeft);
    }
  };

  const loadOptions = async (input: string) =>
    episodes.filter(ep => filter(ep, input));

  return (
    <GameBoard>
      <p>{secondsLeft}</p>
      <LinesBox>
        {data.Subtitles.map(sub => (
          <p key={`${data.Episode.Id}-${sub.Id}`}>{sub.Content}</p>
        ))}
      </LinesBox>
      <AsyncSelect loadOptions={loadOptions} onChange={checkForCorrect} />
      <ButtonBox>
        {secondsLeft > 10 && !showImage && (
          <button onClick={onShowImage}>
            Show Image Hint (10 second penalty)
          </button>
        )}
        <button onClick={onSkip}>Skip</button>
      </ButtonBox>
      {showImage && (
        <HintImg
          src={`https://frinkiac.com/img/${data.Episode.Key}/${data.Frame.Timestamp}.jpg`}
        />
      )}
    </GameBoard>
  );
};

export const GameSlide: React.FC<GameSlideProps> = ({
  onQuestionFinish,
  handicap,
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
        data={data}
        handicap={handicap}
      />
    );
  } else {
    return <p>Loading!</p>;
  }
};
