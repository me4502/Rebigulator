import {
  useState,
  useMemo,
  useCallback,
  type FC,
  useEffect,
  Suspense,
} from 'react';

import Layout from '../src/components/layout';
import SEO from '../src/components/seo';
import { GameSlide } from '../src/components/game/GameSlide';
import { Container } from '../src/components/Container.module.css';
import type { Episode } from '../src/frinkiac/types';
import type { QuestionResult } from '../src/util/types';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { scoreBox } from './game.module.css';
import { LoadingBox } from '../src/components/LoadingSpinner';

const QUESTION_COUNT = 10;

const GameHandler: FC = () => {
  const [score, setScore] = useState<number>(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const router = useRouter();

  const onQuestionFinish = useCallback(
    (points: number, episode: Episode) => {
      if (points > 0) {
        setScore((s) => s + points);
      }

      setResults((oldResults) => [...oldResults, [episode.Key, points]]);

      const newQuestion = questionNumber + 1;
      if (newQuestion < QUESTION_COUNT) {
        setQuestionNumber(newQuestion);
      } else {
        setGameEnded(true);
      }
    },
    [questionNumber]
  );

  useEffect(() => {
    if (gameEnded) {
      router
        .push({
          pathname: `/result/${btoa(JSON.stringify({ s: score, r: results }))}`,
        })
        .catch((err) => {
          console.error('Error navigating to results:', err);
        });
    }
  }, [gameEnded, router, results, score]);

  const onFail = useCallback((message: string) => {
    toast(message, {
      autoClose: 2500,
      type: 'error',
    });
  }, []);

  const Slide = useMemo(
    // eslint-disable-next-line react/no-unstable-nested-components, react/display-name
    () => () => (
      <div className={Container}>
        <div className={scoreBox}>
          <span>
            Score: {score} &#x2E31; Round: {questionNumber + 1}
          </span>
        </div>
        <Suspense fallback={<LoadingBox />}>
          <GameSlide
            onQuestionFinish={onQuestionFinish}
            onFail={onFail}
            gameEnded={gameEnded}
          />
        </Suspense>
        <p
          style={{
            textAlign: 'center',
            textWrap: 'balance',
            fontFamily: 'akbarplain',
            textTransform: 'uppercase',
          }}
        >
          Guess the episode of The Simpsons shown in the image! You have 60
          seconds to answer each question, and you can skip a question if you
          don't know the answer. The game ends after 10 questions, and your
          score is based on how many you get right.
        </p>
      </div>
    ),
    [questionNumber, gameEnded, onQuestionFinish, score, onFail]
  );

  return <Slide />;
};

const GamePage: FC = () => {
  return (
    <Layout>
      <SEO title="Play" />
      <ToastContainer draggable={true} closeOnClick={true} />
      <GameHandler />
    </Layout>
  );
};

export default GamePage;
