import { type FC, useCallback, useRef } from 'react';
import type { RandomResponse } from '../../frinkiac/frinkiacAccess';
import { hintImg, gameBox, linesBox } from './GameBox.module.css';

interface GameBoxProps {
  data: RandomResponse;
  onStart?: () => void;
}

export const GameBox: FC<GameBoxProps> = ({ data, onStart }) => {
  const linesBoxRef = useRef<HTMLDivElement>(null);

  const onLoad = useCallback(() => {
    if (linesBoxRef.current) {
      linesBoxRef.current.classList.add('loaded');
    }
    onStart?.();
  }, [onStart]);

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
        onLoad={onLoad}
        loading={'eager'}
        height={300}
      />
    </div>
  );
};
