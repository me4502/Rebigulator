import styled, { css } from 'styled-components';

const MainLinkStyle = css`
  color: var(--theme-primary);
  text-decoration: none;
  font-weight: bold;

  :hover {
    text-shadow: 0px 0px 1px var(--theme-primary);
  }
`;

export const MainLink = styled.a`
  ${MainLinkStyle}
`;

const MainButtonStyle = css`
  border-radius: 2px;
  background-color: var(--theme-primary);
  color: #fff;
  transition: box-shadow 0.15s ease-in-out;
  padding: 0.6rem;
  cursor: pointer;
  border: none;
  word-break: keep-all;
  box-shadow: none;
  text-decoration: none;
  font-weight: 600;

  :hover,
  :active,
  :focus,
  &.active {
    box-shadow: 0 0 5px 2px var(--theme-tertiary) inset;
  }
`;

export const MainButton = styled.div`
  cursor: pointer;
  ${MainButtonStyle}
`;

export const MainButtonLink = styled.button`
  ${MainButtonStyle}
`;
