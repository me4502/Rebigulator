import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Layout from '../../src/components/layout';
import SEO from '../../src/components/seo';
import {
  type EpisodeInfoResponse,
  getEpisodeInfo,
} from '../../src/frinkiac/frinkiacAccess';
import { DailyGameSlide } from '../../src/components/game/DailyGameSlide';
import { useRouter } from 'next/router';
import { scoreBox, loadingBox } from './game.module.css';
import { Container } from '../../src/components/Container.module.css';
import {
  generateDailyResults,
  getDailyTimestampHashes,
  getDateString,
  ROUND_COUNT,
  useDailyEpisode,
} from '../../src/util/daily';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import { useSuspenseQuery } from '@tanstack/react-query';

interface GameHandlerProps {
  episodeData: EpisodeInfoResponse;
}

const GameHandler: FC<GameHandlerProps> = ({ episodeData }) => {
  const dailyTimestampHashes = useMemo(() => getDailyTimestampHashes(), []);
  const [results, setResults] = useState<(string | null)[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);

  const router = useRouter();

  const onSuccess = useCallback(() => {
    setResults((oldResults) => [...oldResults, episodeData.Episode.Key]);
    setWon(true);
    setGameEnded(true);
  }, [episodeData.Episode.Key]);

  useEffect(() => {
    if (gameEnded) {
      router
        .push({
          pathname: `/daily/result/${generateDailyResults(
            attempts,
            results,
            episodeData.Episode.Key,
            won,
            getDateString()
          )}`,
        })
        .catch((err) => {
          console.error('Error navigating to results:', err);
        });
    }
  }, [gameEnded, router, results, attempts, won, episodeData.Episode.Key]);

  const onFail = useCallback(
    (guess: string | null) => {
      setResults((oldResults) => [...oldResults, guess]);

      if (attempts + 1 >= ROUND_COUNT) {
        setGameEnded(true);
        return;
      }

      if (guess) {
        toast('Not quite! Try again!', {
          autoClose: 2500,
          type: 'error',
        });
      }

      setAttempts((a) => a + 1);
    },
    [attempts]
  );

  const Slide = useMemo(
    // eslint-disable-next-line react/no-unstable-nested-components, react/display-name
    () => () => (
      <div className={Container}>
        <div className={scoreBox}>
          <span>
            Attempts: {attempts} / {ROUND_COUNT}
          </span>
        </div>
        <DailyGameSlide
          onFail={onFail}
          onSuccess={onSuccess}
          gameEnded={gameEnded}
          dailyTimestampHashes={dailyTimestampHashes}
          episodeData={episodeData}
          round={attempts}
        />
        <p
          style={{
            textAlign: 'center',
            textWrap: 'balance',
            fontFamily: 'akbarplain',
            textTransform: 'uppercase',
          }}
        >
          Guess the episode of The Simpsons shown in the image. You have{' '}
          {ROUND_COUNT} attempts, and each attempt will show you a new image
          from the same episode. You can skip if you don't know the answer, but
          skipping will count as an attempt.
        </p>
      </div>
    ),
    [attempts, gameEnded, onSuccess, onFail, dailyTimestampHashes, episodeData]
  );

  return <Slide />;
};

const GameInstance = () => {
  const dailyEpisode = useDailyEpisode();
  const { data: episodeData } = useSuspenseQuery<EpisodeInfoResponse>({
    queryKey: ['dailyEpisodeData', dailyEpisode.value],
    queryFn: () => getEpisodeInfo(dailyEpisode.value),
  });

  return <GameHandler episodeData={episodeData} />;
};

const LoadingIndicator: FC = () => (
  <div className={loadingBox}>
    <p>Loading daily challenge...</p>
    <LoadingSpinner />
  </div>
);

const GamePage: FC = () => {
  return (
    <Layout>
      <SEO title="Play the daily challenge" />
      <ToastContainer draggable={true} closeOnClick={true} />
      <Suspense fallback={<LoadingIndicator />}>
        <GameInstance />
      </Suspense>
    </Layout>
  );
};

export default GamePage;
