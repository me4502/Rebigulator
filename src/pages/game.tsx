import React, { useState, useMemo } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { GameSlide } from '../components/GameSlide';
import { navigate } from 'gatsby';
import { Container } from '../components/Container';
import styled from 'styled-components';

const QUESTION_COUNT = 10;

const ScoreBox = styled.div`
  font-family: 'akbarplain';
  padding: 2rem 1rem 0 1rem;
  text-align: center;
  font-size: 20pt;
`;

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
      <Container>
        <ScoreBox>
          <span>Score: {score}  &#x2E31;  Round: {questionNumber + 1}</span>
        </ScoreBox>
        <GameSlide onQuestionFinish={onQuestionFinish} handicap={handicap} />
      </Container>
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
