import styled from "styled-components";
import { LIGHT_THEME } from "../util/color";
import { MainButton } from "./MainLink";

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

const boxColors = [LIGHT_THEME.primary, '#cf5615', '#88cf15', '#5c15cf'];

export const MultiChoiceBox: React.FC<MultiChoiceBoxProps> = ({
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
