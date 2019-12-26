import React, { useState, useEffect, useMemo } from 'react';
import { getRandom, RandomResponse } from '../frinkiac/frinkiacAccess';
import styled from 'styled-components';
import { ValueType, OptionTypeBase, createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';

const episodes = require('../util/episodes.json').map(ep => ({
  value: ep,
  label: ep,
})) as { value: string; label: string; data: undefined }[];

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
    onQuestionFinish(-10);
  };

  const checkForCorrect = (value: ValueType<OptionTypeBase>) => {
    const val = value['value'];
    if (!val) {
      return;
    }
    if (val.toLowerCase() === data.Episode.Title.toLowerCase()) {
      onQuestionFinish(secondsLeft);
    }
  };

  const loadOptions = async (input: string) =>
    episodes.filter(ep => filter(ep, input));

  useEffect(() => {
    if (!episodes.find(ep => ep.value === data.Episode.Title)) {
      episodes.push({
        label: data.Episode.Title,
        value: data.Episode.Title,
        data: undefined,
      });
    }
  }, [data.Episode.Title]);

  return (
    <>
      <p>Time left: {secondsLeft}</p>
      <LinesBox>
        {data.Subtitles.map(sub => (
          <p key={`${data.Episode.Id}-${sub.Id}`}>{sub.Content}</p>
        ))}
      </LinesBox>
      <AsyncSelect loadOptions={loadOptions} onChange={checkForCorrect} />
      {secondsLeft > 10 && !showImage && (
        <button onClick={onShowImage}>Show Image Hint</button>
      )}
      <button onClick={onSkip}>Skip (10 second penalty)</button>
      {showImage && (
        <img
          src={`https://frinkiac.com/img/${data.Episode.Key}/${data.Frame.Timestamp}.jpg`}
        />
      )}
    </>
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
