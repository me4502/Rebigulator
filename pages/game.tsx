import { useState, useMemo, useCallback, type FC } from 'react';

import Layout from '../src/components/layout';
import SEO from '../src/components/seo';
import { GameSlide } from '../src/components/GameSlide';
import { Container } from '../src/components/Container.module.css';
import { type Episode } from '../src/frinkiac/types';
import { type QuestionResult } from '../src/util/types';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { scoreBox } from './game.module.css';

const QUESTION_COUNT = 10;

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
    () => () => (
      <div className={Container}>
        <div className={scoreBox}>
          <span>
            Score: {score} &#x2E31; Round: {questionNumber + 1}
          </span>
        </div>
        <GameSlide
          onQuestionFinish={onQuestionFinish}
          handicap={handicap}
          onFail={onFail}
          gameEnded={gameEnded}
        />
      </div>
    ),
    [questionNumber, gameEnded, handicap, onQuestionFinish, score]
  );

  return <Slide />;
};

const GamePage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Play | The Rebigulator" />
      <ToastContainer draggable={true} closeOnClick={true} />
      <GameHandler />
    </Layout>
  );
};

export default GamePage;
