import type { FC } from 'react';
import styled from 'styled-components';
import { MainButton } from './MainLink';

const MultiChoiceGrid = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  grid-gap: 4px;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

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
    <MultiChoiceGrid>
      {choices.map((choice, i) => (
        <MainButton
          key={`choice-${i}`}
          onClick={() => onClick(choice)}
          style={{ backgroundColor: boxColors[i] }}
        >
          {choice}
        </MainButton>
      ))}
    </MultiChoiceGrid>
  );
};
