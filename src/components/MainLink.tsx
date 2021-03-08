import styled, { css } from 'styled-components';

const MainLinkStyle = css`
  color: var(--theme-primary);
  text-decoration: none;

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
  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
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
    background-color: var(--theme-primary);
    color: #fff;
    box-shadow: 0 3px 5px 0px var(--theme-primary);
  }
`;

export const MainButton = styled.div`
  cursor: pointer;
  ${MainButtonStyle}
`;

export const MainButtonLink = styled.button`
  ${MainButtonStyle}
`;
