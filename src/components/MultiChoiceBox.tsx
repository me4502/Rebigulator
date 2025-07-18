import type { FC } from 'react';
import { MainButton } from './MainLink';
import {
  multiChoiceGrid,
  multiChoiceButton,
} from './MultiChoiceBox.module.css';
import { cleanupEpisodeTitle } from '../util/string';

interface MultiChoiceBoxProps {
  choices: string[];
  onClick: (value: string) => void;
}

const boxColors = [
  ['var(--theme-box-blue)', 'var(--theme-box-blue-hover)'],
  ['var(--theme-box-orange)', 'var(--theme-box-orange-hover)'],
  ['var(--theme-box-green)', 'var(--theme-box-green-hover)'],
  ['var(--theme-box-purple)', 'var(--theme-box-purple-hover)'],
];

export const MultiChoiceBox: FC<MultiChoiceBoxProps> = ({
  choices,
  onClick,
}) => {
  return (
    <div className={multiChoiceGrid}>
      {choices.map((choice, i) => (
        <MainButton
          key={`choice-${i}`}
          className={multiChoiceButton}
          onClick={() => onClick(choice)}
          style={
            {
              '--box-color': boxColors[i][0],
              '--box-color-hover': boxColors[i][1],
            } as unknown
          }
        >
          {cleanupEpisodeTitle(choice)}
        </MainButton>
      ))}
    </div>
  );
};
