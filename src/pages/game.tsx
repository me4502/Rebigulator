import React, { useState, useMemo } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { GameSlide } from '../components/GameSlide';
import { navigate } from 'gatsby';

const QUESTION_COUNT = 10;

const GameHandler: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [handicap, setHandicap] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const onQuestionFinish = (points: number) => {
    if (points > 0) {
      setScore(score + points);
    }
    if (points >= 0) {
      if (handicap != 0) {
        setHandicap(0);
      }
    } else {
      setHandicap(-points);
    }
    const newQuestion = questionNumber + 1;
    if (newQuestion < QUESTION_COUNT) {
      setQuestionNumber(newQuestion);
    } else {
      navigate('/result/', {
        state: {
          score,
        },
      });
    }
  };

  const Slide = useMemo(
    () => () => (
      <>
        <p>Score: {score}</p>
        <p>Round: {questionNumber + 1}</p>
        <GameSlide onQuestionFinish={onQuestionFinish} handicap={handicap} />
      </>
    ),
    [questionNumber]
  );

  return <Slide />;
};

const GamePage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Play | The Rebigulator" />
      <GameHandler />
    </Layout>
  );
};

export default GamePage;
