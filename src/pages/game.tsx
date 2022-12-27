import { useState, useMemo, useCallback, type FC } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { GameSlide } from '../components/GameSlide';
import { Container } from '../components/Container';
import styled from 'styled-components';
import { type Episode } from '../frinkiac/types';
import { type QuestionResult } from '../util/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const QUESTION_COUNT = 10;

const ScoreBox = styled.div`
  font-family: 'akbarplain';
  padding: 0rem 1rem 0 1rem;
  text-align: center;
  font-size: 20pt;
`;

const GameHandler: FC = () => {
  const [score, setScore] = useState<number>(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [handicap, setHandicap] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const router = useRouter();

  const onQuestionFinish = useCallback(
    (points: number, episode: Episode) => {
      if (points > 0) {
        setScore((s) => s + points);
      }
      if (points >= 0) {
        if (handicap != 0) {
          setHandicap(0);
        }
      } else {
        setHandicap(-points);
      }

      results.push({ e: episode.Key, s: points });
      setResults(results);
      const newQuestion = questionNumber + 1;
      if (newQuestion < QUESTION_COUNT) {
        setQuestionNumber(newQuestion);
      } else {
        setGameEnded(true);
        router.push({
          pathname: `/result/${btoa(JSON.stringify({ score, results }))}`,
        });
      }
    },
    [handicap, results, score, router, questionNumber]
  );

  const onFail = (message: string) => {
    toast(message, {
      autoClose: 2500,
      type: 'error',
    });
  };

  const Slide = useMemo(
    () => () =>
      (
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
            gameEnded={gameEnded}
          />
        </Container>
      ),
    [questionNumber, gameEnded, handicap, onQuestionFinish, score]
  );

  return <Slide />;
};

const GamePage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Play | The Rebigulator" />
      <ToastContainer />
      <GameHandler />
    </Layout>
  );
};

export default GamePage;
