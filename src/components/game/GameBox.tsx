import { type FC, useRef } from 'react';
import type { RandomResponse } from '../../frinkiac/frinkiacAccess';
import { hintImg, gameBox, linesBox } from './GameBox.module.css';

interface GameBoxProps {
  data: RandomResponse;
}

export const GameBox: FC<GameBoxProps> = ({ data }) => {
  const linesBoxRef = useRef<HTMLDivElement>(null);

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
