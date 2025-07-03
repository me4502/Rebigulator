import type { FC } from 'react';
import { MainButton } from './MainLink';
import { multiChoiceGrid } from './MultiChoiceBox.module.css';

interface MultiChoiceBoxProps {
  choices: string[];
  onClick: (value: string) => void;
}

const boxColors = [
  'var(--theme-box-blue)',
  'var(--theme-box-orange)',
  'var(--theme-box-green)',
  'var(--theme-box-purple)',
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
          onClick={() => onClick(choice)}
          style={{ backgroundColor: boxColors[i] }}
        >
          {choice}
        </MainButton>
      ))}
    </div>
  );
};
