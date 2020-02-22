import React, { useState, useMemo } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { GameSlide } from '../components/GameSlide';
import { navigate } from 'gatsby';
import { Container } from '../components/Container';
import styled from 'styled-components';
import { Episode } from '../frinkiac/types';
import { QuestionResult } from '../util/types';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const QUESTION_COUNT = 10;

const ScoreBox = styled.div`
  font-family: 'akbarplain';
  padding: 2rem 1rem 0 1rem;
  text-align: center;
  font-size: 20pt;
`;

const GameHandler: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [handicap, setHandicap] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const onQuestionFinish = (points: number, episode: Episode) => {
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
    results.push({ episodeTitle: episode.Title, points });
    setResults(results);
    const newQuestion = questionNumber + 1;
    if (newQuestion < QUESTION_COUNT) {
      setQuestionNumber(newQuestion);
    } else {
      navigate('/result/', {
        state: {
          score,
          results,
        },
      });
    }
  };

  const onFail = (message: string) => {
    toast(message, {
      autoClose: 2500,
      type: 'error'
    });
  };

  const Slide = useMemo(
    () => () => (
      <Container>
        <ScoreBox>
          <span>
            Score: {score} &#x2E31; Round: {questionNumber + 1}
          </span>
        </ScoreBox>
        <GameSlide
          onQuestionFinish={onQuestionFinish}
          handicap={handicap}
          onFail={onFail}
        />
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
