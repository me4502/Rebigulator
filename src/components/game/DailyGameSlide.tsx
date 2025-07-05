import { type FC, useCallback, useState, useEffect } from 'react';
import {
  type EpisodeInfoResponse,
  getScreencap,
  type ScreencapResponse,
} from '../../frinkiac/frinkiacAccess';
import LoadingSpinner from '../LoadingSpinner';
import { MainButton } from '../MainLink';
import { gameBoard, buttonBox, loadingBox } from './GameSlide.module.css';
import { GameBox } from './GameBox';
import { EpisodeDropdown } from '../EpisodeDropdown';

interface DailyGameSlideLogicProps
  extends Omit<
    DailyGameSlideProps,
    'gameEnded' | 'dailyTimestampHashes' | 'round' | 'episodeData'
  > {
  data: ScreencapResponse;
}

const DailyGameSlideLogic: FC<DailyGameSlideLogicProps> = ({
  onSuccess,
  onFail,
  data,
}) => {
  const onSkip = useCallback(() => {
    onFail(null);
  }, [onFail]);

  const checkForCorrect = useCallback(
    (value: string) => {
      if (value === data.Episode.Key) {
        onSuccess();
      } else {
        onFail(value);
      }
    },
    [data.Episode, onSuccess, onFail]
  );

  return (
    <div className={gameBoard}>
      <GameBox data={data} />
      <p
        style={{
          marginTop: '2rem',
          fontSize: '18pt',
          fontFamily: 'akbarplain',
        }}
      >
        Which episode is it?
      </p>
      <EpisodeDropdown onSelect={checkForCorrect} />
      <div className={buttonBox}>
        <MainButton onClick={onSkip}>Skip</MainButton>
      </div>
    </div>
  );
};

interface DailyGameSlideProps {
  onSuccess: () => void;
  onFail: (message: string) => void;
  gameEnded: boolean;
  episodeData: EpisodeInfoResponse;
  dailyTimestampHashes: number[];
  round: number;
}

export const DailyGameSlide: FC<DailyGameSlideProps> = ({
  onSuccess,
  onFail,
  gameEnded = false,
  dailyTimestampHashes,
  episodeData,
  round,
}) => {
  const [screencapData, setScreencapData] = useState<ScreencapResponse>();

  useEffect(() => {
    const subtitleToUse = dailyTimestampHashes[round];
    const availableTimestamps = episodeData.Subtitles.map(
      (sub) => sub.RepresentativeTimestamp
    );

    const subtitleIndex = Math.floor(
      subtitleToUse * availableTimestamps.length
    );

    const closestTimestamp = availableTimestamps[subtitleIndex];

    getScreencap(episodeData.Episode.Key, closestTimestamp)
      .then((data) => {
        setScreencapData(data);
      })
      .catch(console.error);
  }, [dailyTimestampHashes, round, episodeData]);

  if (screencapData && !gameEnded) {
    return (
      <DailyGameSlideLogic
        onSuccess={onSuccess}
        onFail={onFail}
        data={screencapData}
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
