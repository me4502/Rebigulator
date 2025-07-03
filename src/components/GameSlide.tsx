import {
  useState,
  useEffect,
  useMemo,
  type FC,
  useRef,
  type RefObject,
} from 'react';
import { getRandom, type RandomResponse } from '../frinkiac/frinkiacAccess';
import LoadingSpinner from './LoadingSpinner';
import { type Episode } from '../frinkiac/types';
import { MainButton } from './MainLink';
import { MultiChoiceBox } from './MultiChoiceBox';
import {
  gameBoard,
  secondsCounter,
  linesBox,
  buttonBox,
  hintImg,
  loadingBox,
  gameBox,
} from './GameSlide.module.css';

const episodes = require('../util/episodes.json') as {
  value: string;
  label: string;
  data: undefined;
}[];

interface GameSlideProps {
  onQuestionFinish: (points: number, episode: Episode) => void;
  onFail: (message: string) => void;
  handicap: number;
  gameEnded: boolean;
}

interface GameSlideLogicProps extends Omit<GameSlideProps, 'gameEnded'> {
  data: RandomResponse;
}

const TIME_PER_SLIDE = 60;

function getRandomEpisode(ignore: string): string {
  let episode: string | undefined = undefined;
  do {
    episode = episodes[Math.floor(Math.random() * episodes.length)].label;
  } while (episode === ignore);
  return episode;
}

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface GameBoxProps {
  linesBoxRef: RefObject<HTMLDivElement>;
  data: RandomResponse;
}

const GameBox: FC<GameBoxProps> = ({ linesBoxRef, data }) => {
  return (
    <div className={gameBox}>
      <div className={linesBox} ref={linesBoxRef}>
        {data.Subtitles.map((sub) => (
          <p key={`${data.Episode.Id}-${sub.Id}`}>{sub.Content}</p>
        ))}
      </div>
      <img
        className={hintImg}
        src={`https://frinkiac.com/img/${data.Episode.Key}/${data.Frame.Timestamp}.jpg`}
        alt="Episode hint"
        onLoad={() => {
          if (linesBoxRef.current) {
            linesBoxRef.current.classList.add('loaded');
          }
        }}
      />
    </div>
  );
};

const GameSlideLogic: FC<GameSlideLogicProps> = ({
  onQuestionFinish,
  onFail,
  data,
  handicap,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(
    TIME_PER_SLIDE - handicap
  );
  const linesBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const timeRemaining = secondsLeft - 1;
      if (timeRemaining < 0) {
        onQuestionFinish(0, data.Episode);
        return;
      }
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [secondsLeft, data.Episode, onQuestionFinish]);

  const onSkip = () => {
    onQuestionFinish(0, data.Episode);
  };

  const checkForCorrect = (value: string) => {
    if (secondsLeft <= 0) {
      // Don't accept negative values.
      return;
    }
    if (value === data.Episode.Title) {
      onQuestionFinish(secondsLeft, data.Episode);
    } else {
      onFail('Wrong! Try again... -20');
      setSecondsLeft((s) => s - 20);
    }
  };

  const choices = useMemo(
    () =>
      shuffle([
        getRandomEpisode(data.Episode.Title),
        getRandomEpisode(data.Episode.Title),
        getRandomEpisode(data.Episode.Title),
        data.Episode.Title,
      ]),
    [data.Episode.Title]
  );

  return (
    <div className={gameBoard}>
      <p className={secondsCounter}>{secondsLeft}</p>
      <GameBox data={data} linesBoxRef={linesBoxRef} />
      <p className={secondsCounter} style={{ marginTop: '2rem' }}>
        Which episode is it?
      </p>
      <MultiChoiceBox choices={choices} onClick={checkForCorrect} />
      <div className={buttonBox}>
        <MainButton onClick={onSkip}>Skip</MainButton>
      </div>
    </div>
  );
};

export const GameSlide: FC<GameSlideProps> = ({
  onQuestionFinish,
  handicap,
  onFail,
  gameEnded = false,
}) => {
  const [data, setData] = useState<RandomResponse>(undefined);

  useEffect(() => {
    getRandom()
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  }, []);

  if (data && !gameEnded) {
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
      <div className={loadingBox}>
        <p>Loading...</p>
        <LoadingSpinner />
      </div>
    );
  }
};
